import React from 'react'
import { MdOutlineGridView } from "react-icons/md";
import { TfiViewListAlt } from "react-icons/tfi";



const FilterHeader = () => {
    const isGrid = true;
  return (
    <>
      <section className='text-black bg-white flex items-center p-5 border justify-between px-[170px]'>
        <h1 className='font-semibold font-sans'>Recent documents</h1>
        <div className='flex items-center space-x-10'>
          <select 
          className='hover:bg-slate-100 transition-all p-2 rounded-md focus:outline-none cursor-pointer' 
          value="Owned by me"
          >
           <option className='bg-white py-2' value="Owned by me">Owned by me</option>
           <option className='bg-white' value="Owned by anyone">Owned by anyone</option>
          </select>
          {
            isGrid ?
              <p className='hover:bg-slate-100 p-2 rounded-full cursor-pointer'>
                <MdOutlineGridView size={27} className='text-slate-600' /> 
              </p> : 
              <p className='hover:bg-slate-100 p-2 rounded-full cursor-pointer'>
                <TfiViewListAlt  size={27} className='text-slate-600' /> 
              </p>       
          }
        </div>
      </section>
    </>
  )
}

export default FilterHeader