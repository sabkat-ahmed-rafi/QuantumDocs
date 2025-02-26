import React from 'react'

const DocumentSearch = ({documents}) => {
  return (
    <>
    <section 
    className={`${documents?.length === 0 ? 'hidden': 'flex-col'} overflow-hidden bg-slate-100 absolute z-10 border md:w-[465px] w-[250px] animate_animated animate__bounceIn shadow-lg shadow-slate-400 rounded-lg hidden`}>
        {
            documents && documents.map(document => <section>
              <div>
                <SiGoogledocs size={20} className="text-purple-500 " />
                <div>
                  <h1 className='font-semibold'>Name</h1>
                  <p className='text-slate-600'>Owner Name</p>
                </div>
              </div>
              <div>01/02/2024</div>
            </section> )
        }
    </section>
    </>
  )
}

export default DocumentSearch