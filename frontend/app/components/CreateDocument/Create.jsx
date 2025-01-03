import Link from 'next/link';
import React from 'react'
import { FaPlus } from "react-icons/fa6";
export const Create = () => {
  return (
    <>
        <section className="bg-[#F1F3F4] h-[300px] light text-black">
            <div className='text-[16px] font-sans py-4 text-center font-extrabold'>
                Start a new document   
            </div>
            <section className='md:ml-44 md:text-left text-center'>
               <Link href={"/"} className='border border-slate-200 inline-block py-14 px-10 bg-white rounded-sm hover:border-purple-400'>
                 <FaPlus className='text-purple-600' size={60} />
               </Link>
               <p className='font-sans font-semibold'>Blank document</p>
            </section>
        </section>
    </>
  )
}
