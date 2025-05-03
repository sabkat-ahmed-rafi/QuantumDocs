import React from 'react'
import AddDocument from '../Ui/AddDocument';
export const Create = () => {
  return (
    <>
        <section className="bg-[#F1F3F4] h-[300px] light text-black">
            <div className='text-[16px] font-sans py-4 text-center font-extrabold'>
                Start a new document   
            </div>
            <section className='md:ml-44 md:text-left text-center'>
               <AddDocument />
               <p className='font-sans font-semibold'>Blank document</p>
            </section>
        </section>
    </>
  )
}
