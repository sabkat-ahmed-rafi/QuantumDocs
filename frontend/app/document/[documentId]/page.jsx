'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import katex from "katex";
import Quill from 'quill'
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';

import 'quill/dist/quill.snow.css'
import "katex/dist/katex.min.css"; 
window.katex = katex; // katex is used to use the fucntion editing feature.

const Document = () => {

    const {documentId} = useParams();
    const editorRef = useRef(null);
    const quillRef = useRef(null);


    useEffect(() => {

      const ydoc = new Y.Doc();
      const ytext = ydoc.getText('quill');
      const provider = new WebsocketProvider(`${process.env.NEXT_PUBLIC_socket_server}`, documentId, ydoc); 

      provider.on('status', (event) => {
        console.log(`WebSocket connection: ${event.status}`);
      });


      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
              toolbar: [
                [{'font': []}, {header: [1, 2, 3, 4, 5, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'color': [] }, { 'background': [] }],   
                [{ 'script': 'sub'}, { 'script': 'super' }],  
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],   
                [{ 'list': 'ordered'}, 
                  { 'list': 'bullet' }, 
                  { 'list': 'check' },  
                  { 'align': [] }],
                ['link', 'image', 'video', 'formula'],
                ['clean']  
              ]
            }
        });
      }

      new QuillBinding(ytext, quillRef.current);

      return () => {
        provider.disconnect();
        ydoc.destroy();
        editorRef.current = null;
      }
    }, [documentId])



  return (
    <>
        <div>
        <section className='text-black bg-[#F9FBFD] py-16 min-h-[1000px]'> 
          <div className='lg:w-[1000px] mx-auto bg-[#F0F4F9] lg:h-[44px]'
          >
            <div 
            ref={editorRef}
            className='text-cursor caret-purple-600 lg:w-[700px] bg-white border border-gray-300 lg:p-10' 
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
        `}</style>
    </>
  )
}

export default Document