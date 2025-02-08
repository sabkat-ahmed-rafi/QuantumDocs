'use client'

import { useParams } from 'next/navigation'
import { useGetSingleDataQuery, useUpdateDataMutation } from '@/app/slices/docApiSlice';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useCallback, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import QuillCursors from 'quill-cursors';
import Quill from 'quill';
import katex from "katex";
import DocumentHead from '@/app/components/DocumentHead/DocumentHead';
import debounce from 'lodash.debounce';
import { Delta } from 'quill';


import 'quill/dist/quill.snow.css'
import "katex/dist/katex.min.css"; 




const Document = () => {

  
  const {documentId} = useParams();
  const {user} = useSelector(state => state.auth);
  const {data: document, isLoading} = useGetSingleDataQuery(documentId);
  const [updateData] = useUpdateDataMutation();
  
  
  const [hasFlushed, setHasFlushed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const shouldObserveRef = useRef(false);
  const providerRef = useRef(null)
  const ydocRef = useRef(null)
  const deltaQueue = useRef([]);
  
  
  
  
  
  //Function to show different color of cursor for different users
  const getRandomColor = useCallback(() => {
    const colors = [
      '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#32CD32',
      '#00FA9A', '#00CED1', '#1E90FF', '#4169E1', '#8A2BE2',
      '#FF1493', '#C71585', '#FF4500', '#FF6347', '#FFDAB9',
      '#40E0D0', '#7B68EE', '#DA70D6', '#FF69B4', '#FFB6C1'
    ];
    return colors[Math.floor(Math.random() * colors.length)]

  }, []);

  // Handle loading UI when user typing
  const handleTyping = useCallback(() => {
    if (!isTyping) {
      setIsTyping(true);
    }
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  }, [isTyping]);

  // Document save logic
  const saveDocument = async () => {
    if(deltaQueue.current.length == 0) return;
    // Properly merge deltas
    console.log(deltaQueue.current);
    let normalizedDelta = new Delta();
    deltaQueue.current.forEach(delta => {
      normalizedDelta = normalizedDelta.compose(delta);
    });
    deltaQueue.current = [];

    try {
      await updateData({ documentId, updatedData: normalizedDelta.ops }).unwrap();
    } catch (error) {
      console.error("Updating doc error: ", error);
    }

  }
  
  // Using Debounce to save after 5 seconds of inactivity
  const debouncedFlush = useCallback(debounce(saveDocument, 5000), []);

  const yObserver = (event, transaction) => {
    // if(!shouldObserveRef.current) return
      // console.log(event.delta)
     if (!transaction.local) {
       // Track changes from other users too
       deltaQueue.current.push(event.delta);
       deltaQueue.current.pop(event.delta);
       deltaQueue.current.push(event.delta);
       debouncedFlush();
       console.log(event.delta)
      } else if(transaction.local) {
        deltaQueue.current.push(event.delta)
        debouncedFlush();
        console.log(event.delta)
     }
   };
  

  useEffect(() => {
    if (!document || isLoading || providerRef.current || !editorRef.current || quillRef.current) return;

    
    window.katex = katex; // katex is used to use the fucntion editing feature.
    Quill.register('modules/cursors', QuillCursors); // To show multiple users cursor.


    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;
    const ytext = ydoc.getText('quill');
    const provider = new WebsocketProvider(`${process.env.NEXT_PUBLIC_socket_server}`, documentId, ydoc);
    providerRef.current = provider;

    // Checking the websocket connection 
    provider.on('status', (event) => {
      console.log(`WebSocket connection: ${event.status}`);
    });

    // Editor settings and Quillbinding with Y.js
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          history: { userOnly: true },
          cursors: true,
          toolbar: [
            [{ font: [] }, { header: [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }, { align: [] }],
            ['link', 'image', 'video', 'formula'],
            ['clean'],
          ],
        },
      });

      new QuillBinding(ytext, quillRef.current, provider.awareness);

      provider.awareness.setLocalStateField('user', {
        name: `${user?.displayName}` || "Anonymous",
        color: getRandomColor(),
      });

    }
     
    // Showing the data of the document from database 
    if (document?.document?.state) {
      const serverState = new Uint8Array(document.document.state.data);
      const decoded = new TextDecoder().decode(serverState);
      const delta = JSON.parse(decoded);

      if (delta && delta.ops && quillRef.current && provider) { 
        provider.on('synced', () => {    
            shouldObserveRef.current = false;
            ytext.delete(0, ytext.length); // Clear existing content
            ytext.applyDelta(delta.ops); // Apply the server state
            shouldObserveRef.current = true; 
        });
      };
    };


    // Document updating logic 
    // quillRef.current.on("text-change", async (delta, oldDelta, source) => {
    //     if(shouldObserveRef.current && source === 'user') {
    //       handleTyping();
    //     }
    //   });
      
      
    ytext.observe(yObserver)   


    
    return () => {
      ytext.unobserve(yObserver);
    };

  }, [documentId, document, isLoading]);



  // Flush updates before unmounting
  useEffect(() => {
    return async () => {
      if (deltaQueue.current.length > 0 && !hasFlushed) {
        // Properly merge deltas
        let normalizedDelta = new Delta();
        deltaQueue.current.forEach(delta => {
          normalizedDelta = normalizedDelta.compose(delta);
        });
        deltaQueue.current = [];
        console.log("hello Brother?")
        await updateData({ documentId, updatedData: normalizedDelta.ops }).unwrap().catch(error => {
          console.error("Failed to save on unmount:", error);
        });
        setHasFlushed(true); // Mark as flushed
      }
      shouldObserveRef.current = false;
      if(ydocRef.current) {
        console.log('destroing ydoc man')
        ydocRef.current.destroy();
        ydocRef.current = null;
      }
      if (providerRef.current) {
        console.log('destroing provider man')
        providerRef.current.destroy();
        providerRef.current = null;
      };
      editorRef.current = null;
    };
  }, [hasFlushed, updateData]);



  // Flush updates when user leaves or refreshes
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (deltaQueue.current.length > 0 && !hasFlushed) {
        // Properly merge deltas
        let normalizedDelta = new Delta();
        deltaQueue.current.forEach(delta => {
          normalizedDelta = normalizedDelta.compose(delta);
        });
        deltaQueue.current = [];

        updateData({ documentId, updatedData: normalizedDelta.ops }).unwrap().catch(error => {
          console.error("Failed to save on unmount:", error);
        });

        event.preventDefault();
        event.returnValue = '';
        setHasFlushed(true); // Mark as flushed
      }
    };

    window.addEventListener("beforeunload",handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [hasFlushed, updateData])




  return (
    <>

        <div className="custom-scrollbar">
          {/* Head of document  */}
          <DocumentHead isTyping={isTyping} document={document} />
          {/* Main section of Editor */}
            <section className='text-black bg-[#F9FBFD]  min-h-[1000px]'> 
              <div className='lg:w-[1000px] mx-auto bg-[#F0F4F9] lg:h-[44px] editorinput'>
                <div 
                ref={editorRef}
                className='text-cursor caret-purple-600 after:caret-black lg:w-[700px] bg-white border border-gray-300 lg:p-10 md:p-7 p-4 ' 
                style={{marginLeft: "auto", marginRight: "auto", height: "850px"}}
                >
                </div>
              </div>
            </section>
        </div>

        {/* Giving custom styles to Cursor and ScrollBar */}
        <style jsx global>{`
        // Designing the cursor
          body {
            cursor: url('/arrow.svg') 5 5, auto; 
          }
          a, button, span {
            cursor: url('/pointer.svg') 5 5, auto !important;
          }
          .text-cursor, p, input {
            cursor: url('/textCursor.svg') 15 20, auto !important;
          }

          
        // Designing the scrollbar
        body {
          overflow-y: auto;
          max-height: 100vh;
          margin: 0;
        }

        body::-webkit-scrollbar {
          width: 12px;
        }

        body::-webkit-scrollbar-thumb {
          background-color: #a855f7;
          border-radius: 10px;
          border: 3px solid #f9fafb;
          transition: background-color 0.3s;
        }

        body::-webkit-scrollbar-thumb:hover {
          background-color: #840cfc;
        }

        body::-webkit-scrollbar-track {
          background-color: #ececec;
          border-radius: 10px;
        }
        `}</style>
    </>
  )
}

export default Document