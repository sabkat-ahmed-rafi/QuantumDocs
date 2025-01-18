'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { useGetSingleDataQuery, useUpdateDataMutation } from '@/app/slices/docApiSlice';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import QuillCursors from 'quill-cursors';
import Quill from 'quill';
import katex from "katex";


import 'quill/dist/quill.snow.css'
import "katex/dist/katex.min.css"; 




const Document = () => {

  
  const {documentId} = useParams();
  const {user} = useSelector(state => state.auth);
  const {data: document, isLoading} = useGetSingleDataQuery(documentId, {refetchOnMountOrArgChange: true});
  const [updateData] = useUpdateDataMutation();
  
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const shouldObserveRef = useRef(false);
  
  const colors = useMemo(() => [
    '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#32CD32',
    '#00FA9A', '#00CED1', '#1E90FF', '#4169E1', '#8A2BE2',
    '#FF1493', '#C71585', '#FF4500', '#FF6347', '#FFDAB9',
    '#40E0D0', '#7B68EE', '#DA70D6', '#FF69B4', '#FFB6C1'
  ], []);
  
  
  

  //Function to show different color of cursor for different users
  const getRandomColor = useCallback(() => colors[Math.floor(Math.random() * colors.length)], [colors]);
  
  


  useEffect(() => {
    if (!document || isLoading) return;

    window.katex = katex; // katex is used to use the fucntion editing feature.
    Quill.register('modules/cursors', QuillCursors) // To show multiple users cursor.

    if (!editorRef.current || quillRef.current) return;

    const ydoc = new Y.Doc();
    const ytext = ydoc.getText('quill');
    const provider = new WebsocketProvider(`${process.env.NEXT_PUBLIC_socket_server}`, documentId, ydoc);

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

      if (delta && delta.ops && quillRef.current) { 
        provider.on('synced', () => {    
            shouldObserveRef.current = false;
            ytext.delete(0, ytext.length); // Clear existing content
            ytext.applyDelta(delta.ops); // Apply the server state
            shouldObserveRef.current = true; 
        });
      };
    };


    // Document updating logic 
    quillRef.current.on("text-change", async (delta, oldDelta, source) => {
        if(shouldObserveRef.current && source === 'user') {
          console.log(delta, oldDelta)
          try{
            const result = await updateData({ documentId, updatedData: delta.ops }).unwrap();
            console.log(result);
          } catch(error) {
            console.log("Updating doc error: ", error);
          }
        }
    });


  
    return async () => {
      shouldObserveRef.current = false;
      provider.destroy();
      provider.disconnect();
      ydoc.destroy();
      quillRef.current = null;
      editorRef.current = null;
    };
  }, [documentId, document, isLoading, getRandomColor]);




  return (
    <>

        <div className="custom-scrollbar">
          {/* Main section of Editor */}
        <section className='text-black bg-[#F9FBFD] py-16 min-h-[1000px]'> 
          <div className='lg:w-[1000px] mx-auto bg-[#F0F4F9] lg:h-[44px]'>
            <div 
            ref={editorRef}
            className='text-cursor caret-purple-600 lg:w-[700px] bg-white border border-gray-300 lg:p-10 md:p-7 p-4' 
            style={{marginLeft: "auto", marginRight: "auto", height: "850px"}}
            >
            </div>
          </div>
        </section>
        </div>

        {/* Giving custom styles to Cursor and ScrollBar */}
        <style jsx global>{`
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