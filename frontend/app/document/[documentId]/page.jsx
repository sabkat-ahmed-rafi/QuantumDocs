'use client'

import { useParams } from 'next/navigation'
import { useGetSingleDataQuery } from '@/app/slices/docApiSlice';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useCallback, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import QuillCursors from 'quill-cursors';
import Quill from 'quill';
import katex from "katex";
import DocumentHead from '@/app/components/DocumentHead/DocumentHead';



import 'quill/dist/quill.snow.css'
import "katex/dist/katex.min.css"; 




const Document = () => {

  
  const {documentId} = useParams();
  const {user} = useSelector(state => state.auth);
  const {data: document, isLoading} = useGetSingleDataQuery(documentId);
  const [activeUsers, setActiveUsers] = useState([]);
  
  
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const shouldObserveRef = useRef(false);
  const providerRef = useRef(null)
  const customProviderRef = useRef(null);
  const ydocRef = useRef(null)
  
  
  
  
  
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


  const saveDocument = async (delta) => {

    const parseData = JSON.stringify(delta)
    const parseJson = JSON.parse(parseData);
    const updateMessage = { type: 'update', documentId, data: parseJson };
    if(customProviderRef.current.readyState == WebSocket.OPEN) {
      customProviderRef.current.send(JSON.stringify(updateMessage));
    };

  };

  const updateUsers = () => {
      const users = Array.from(providerRef.current?.awareness?.states?.values() || [])
        .map(state => state?.user)
        .filter(Boolean);

      setActiveUsers(prevUsers => 
        JSON.stringify(prevUsers) === JSON.stringify(users) ? prevUsers : users
      );
  };
  

  useEffect(() => {
    if (!document || isLoading || providerRef.current || !editorRef.current || quillRef.current) return;

    
    window.katex = katex; // katex is used to use the fucntion editing feature.
    Quill.register('modules/cursors', QuillCursors); // To show multiple users cursor.


    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;
    const ytext = ydoc.getText('quill');
    const provider = new WebsocketProvider(`${process.env.NEXT_PUBLIC_yjs_socket_server}`, documentId, ydoc);
    providerRef.current = provider;
    const customProvider = new WebSocket(`${process.env.NEXT_PUBLIC_custom_socket_server}`);
    customProviderRef.current = customProvider;

    // Checking the Y websocket connection 
    provider.on('status', (event) => {
      console.log(`Y WebSocket connection: ${event.status}`);
    });

    // Checking the Custom websocket connection 
    customProvider.onopen = () => {
      console.log('Custom WebSocket connected');
    };

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
        name: `${user?.displayName || "Anonymous"}`,
        color: getRandomColor(),
        photo: user?.photoURL || '/images/profilePicture.jpg',
        uid: user?.uid || Date.now()
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


    // Document updating logic for database 
    quillRef.current.on("text-change", async (delta, oldDelta, source) => {
      if(shouldObserveRef.current && source === 'user') {
        handleTyping();
        saveDocument(delta);
      };
    });
      

    if (providerRef.current?.awareness) {
      providerRef.current.awareness.on("change", updateUsers);
      updateUsers();
    }
      

  }, [documentId, document, isLoading]);



  // clean up on unmounting
  useEffect(() => {
    return () => {
      shouldObserveRef.current = false;
      if(ydocRef.current) {
        console.log('destroing ydoc man')
        ydocRef.current.destroy();
        ydocRef.current = null;
      }
      if (providerRef.current) {
        console.log('destroing Y provider man')
        providerRef.current.destroy();
        providerRef.current = null;
        providerRef.current.awareness.off("change", updateUsers);
      };
      if (customProviderRef.current) {
        console.log('destroying custom provider man')
        customProviderRef.current.close();
        customProviderRef.current = null;
      }
      editorRef.current = null;
    };
  }, []);




  return (
    <>

        <div className="custom-scrollbar">
          {/* Head of document  */}
          <DocumentHead 
          isTyping={isTyping}
          document={document}
          customProviderRef={customProviderRef}
          activeUsers={activeUsers}
          />
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