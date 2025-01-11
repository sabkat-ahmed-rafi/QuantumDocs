'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import katex from "katex";
import Quill from 'quill'
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import QuillCursors from 'quill-cursors'
import { useGetSingleDataQuery } from '@/app/slices/docApiSlice';

import 'quill/dist/quill.snow.css'
import "katex/dist/katex.min.css"; 
import { useSelector } from 'react-redux';
window.katex = katex; // katex is used to use the fucntion editing feature.


Quill.register('modules/cursors', QuillCursors)


const Document = () => {

    const {documentId} = useParams();
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const {user} = useSelector(state => state.auth);
    const {data: document, isLoading} = useGetSingleDataQuery(documentId);

    console.log(document?.document?.state);


    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF3383', '#33FFF1'];
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    useEffect(() => {

      if (!document || isLoading) return;
      
      const ydoc = new Y.Doc();
      const ytext = ydoc.getText('quill');
      const provider = new WebsocketProvider(`${process.env.NEXT_PUBLIC_socket_server}`, documentId, ydoc); 
      
      provider.on('status', (event) => {
        console.log(`WebSocket connection: ${event.status}`);
      });
      
      
      // editor settings
      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            history: {
              userOnly: true,
            },
            cursors: true,
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

          new QuillBinding(ytext, quillRef.current, provider.awareness);

          provider.awareness.setLocalStateField('user', {
            name: `${user?.displayName}`,
            color: getRandomColor(),
          });

        }
        


        // if (document?.document?.state) {
        //   const serverState = new Uint8Array(document.document.state.data);
        //   const decoded = new TextDecoder().decode(serverState);
        //   const delta = JSON.parse(decoded);
        //   console.log(delta)
        //   if(delta) {
        //         ytext.applyDelta(delta.ops);
        //       }
        //       var currentText = ytext.toDelta()
        //         if(quillRef.current?.getContents().ops.map(op => op.insert) !== delta.ops.map(op => op.insert)) {
        //             quillRef.current.setContents(delta); 
        //             console.log(quillRef.current?.getContents().ops);
        //             console.log(delta.ops)
        //         }
        // }
        
    

      return () => {
        provider.disconnect();
        ydoc.destroy();
        editorRef.current = null;
      }
    }, [documentId, document, isLoading])



  return (
    <>
        <div>
        <section className='text-black bg-[#F9FBFD] py-16 min-h-[1000px]'> 
          <div className='lg:w-[1000px] mx-auto bg-[#F0F4F9] lg:h-[44px]'>
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