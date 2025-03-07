'use client'
import React from 'react'
import DocumentInfo from './DocumentInfo/DocumentInfo'
import DocumentFunc from './DocumentFunc/DocumentFunc'

const DocumentHead = ({ isTyping, document, customProviderRef, activeUsers, documentRefetch, quillRef }) => {
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