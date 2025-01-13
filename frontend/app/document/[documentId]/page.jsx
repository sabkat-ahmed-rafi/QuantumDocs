'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { useGetSingleDataQuery } from '@/app/slices/docApiSlice';
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
  const {data: document, isLoading} = useGetSingleDataQuery(documentId);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  
  const colors = useMemo(() => ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF3383', '#33FFF1'], []);
  const getRandomColor = useCallback(() => colors[Math.floor(Math.random() * colors.length)], [colors]);
  
  
  console.log(document?.document?.state);


  useEffect(() => {
    if (!document || isLoading) return;

    window.katex = katex; // katex is used to use the fucntion editing feature.
    Quill.register('modules/cursors', QuillCursors)

    const ydoc = new Y.Doc();
    const ytext = ydoc.getText('quill');
    const provider = new WebsocketProvider(`${process.env.NEXT_PUBLIC_socket_server}`, documentId, ydoc);

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

     // Showing the data from database 
     if (document?.document?.state) {
      const serverState = new Uint8Array(document.document.state.data);
      const decoded = new TextDecoder().decode(serverState);
      const delta = JSON.parse(decoded);

      if (delta && delta.ops) { 
        provider.on('synced', () => {
          const currentContent = ytext.toDelta();
    
            // Check if current content matches the server state
            console.log("first print")
            ytext.delete(0, ytext.length); // Clear existing content
            ytext.applyDelta(delta.ops); // Apply the server state
            quillRef.current.setContents(delta.ops) // Again setting content because data not showing after route back
          console.log("Current Content after Sync:", currentContent);
        });
      };
     };

 
    return () => {
      provider.disconnect();
      ydoc.destroy();
      editorRef.current = null;
    };
  }, [documentId, document, isLoading, getRandomColor]);




  return (
    <>

        <div className="custom-scrollbar">
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