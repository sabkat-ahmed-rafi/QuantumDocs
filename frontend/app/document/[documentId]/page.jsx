'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import { useGetSingleDataQuery } from '@/app/slices/docApiSlice';
import { useSelector } from 'react-redux';

import 'quill/dist/quill.snow.css'
import "katex/dist/katex.min.css"; 
import useQuillEditor from '@/app/hooks/useQuillEditor';




const Document = () => {


  
  const {documentId} = useParams();
  const {user} = useSelector(state => state.auth);
  const {data: document, isLoading} = useGetSingleDataQuery(documentId);
  
  console.log(document?.document?.state);
  
  const { editorRef } = useQuillEditor({documentId, user, document, isLoading});


  

  return (
    <>

        <div className="custom-scrollbar">
        <section className='text-black bg-[#F9FBFD] py-16 min-h-[1000px]'> 
          <div className='lg:w-[1000px] mx-auto bg-[#F0F4F9] lg:h-[44px]'>
            <div 
            ref={editorRef}
            className='text-cursor caret-purple-600 lg:w-[700px] bg-white border border-gray-300 lg:p-10 p-7' 
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