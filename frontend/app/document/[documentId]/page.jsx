'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import katex from "katex";
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import "katex/dist/katex.min.css";
window.katex = katex;

const Document = () => {

    const {documentId} = useParams();
    const editorRef = useRef(null);
    const quillRef = useRef(null);


    useEffect(() => {
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
        })
      }

      return () => {
        editorRef.current = null;
      }
    }, [documentId])



  return (
    <>
      <div className='text-black bg-white'>
          <div ref={editorRef}></div>
      </div>
    </>
  )
}

export default Document