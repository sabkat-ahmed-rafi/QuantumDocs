'use client'
import React, { useEffect } from 'react'
import DocumentInfo from './DocumentInfo/DocumentInfo'
import DocumentFunc from './DocumentFunc/DocumentFunc'
import socket from '@/app/utils/socket'

const DocumentHead = ({ isTyping, document, customProviderRef, activeUsers, documentRefetch, quillRef }) => {

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log(`Connected: ${socket.id}`);
    });

    return () => {
      socket.disconnect();
    };

  }, [])

  return (
    <>
        <section className='text-black bg-[#F9FBFD] flex md:flex-row flex-col items-center justify-between py-3 px-5 sticky top-0 z-10 border-b border-slate-300'>
            <div>
                <DocumentInfo 
                isTyping={isTyping} 
                document={document} 
                customProviderRef={customProviderRef}
                quillRef={quillRef}
                 />
            </div>
            <div>
                <DocumentFunc
                document={document}
                activeUsers={activeUsers}
                documentRefetch={documentRefetch}
                />
            </div>
        </section>
    </>
  )
}

export default DocumentHead