import React from 'react'
import DocumentInfo from './DocumentInfo/DocumentInfo'
import DocumentFunc from './DocumentFunc/DocumentFunc'

const DocumentHead = () => {
  return (
    <>
        <section className='text-black bg-[#F9FBFD] flex items-center justify-between py-3 px-5 sticky top-0 z-10 border-b border-slate-300'>
            <div>
                <DocumentInfo />
            </div>
            <div>
                <DocumentFunc />
            </div>
        </section>
    </>
  )
}

export default DocumentHead