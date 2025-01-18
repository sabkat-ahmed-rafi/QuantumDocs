import React from 'react'
import DocumentInfo from './DocumentInfo/DocumentInfo'
import DocumentFunc from './DocumentFunc/DocumentFunc'

const DocumentHead = () => {
  return (
    <>
        <section>
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