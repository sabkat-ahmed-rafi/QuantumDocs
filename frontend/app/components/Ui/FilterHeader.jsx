'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdOutlineGridView } from "react-icons/md";
import { TfiViewListAlt } from "react-icons/tfi";



const FilterHeader = ({setOwnershipFilter, ownershipFilter, setIsGrid, isGrid}) => {
    const [isSticky, setIsSticky] = useState(false);
    const headerRef = useRef(null);

    const observerCallback = useCallback(([entry]) => {
      setIsSticky(!entry.isIntersecting);
    }, []);
  

    useEffect(() => {
      // setting observer to see if its time to show the shadow or not 
      const observer = new IntersectionObserver(observerCallback, { root: null, threshold: 1.0 });
      if(headerRef.current) observer.observe(headerRef.current);
      
      return () => {
        if(headerRef.current) {
          observer.unobserve(headerRef.current);
        }
      };
    }, [observerCallback])

  return (
    <>
      <div ref={headerRef}></div>
      <section className={`text-black bg-white flex items-center p-5 justify-between md:px-[170px] 
        z-10 sticky top-[62px] transition-shadow duration-300 
        ${isSticky ? 'shadow-lg' : 'shadow-none'}`}>
        <h1 className='font-semibold font-sans'>Recent documents</h1>
        <div className='flex items-center md:space-x-10'>
          <select 
          className='hover:bg-slate-100 transition-all p-2 rounded-md focus:outline-none cursor-pointer' 
          defaultValue={ownershipFilter}
          onChange={(e) => setOwnershipFilter(e.target.value)}
          >
           <option className='bg-white py-2' value="me">Owned by me</option>
           <option className='bg-white' value="anyone">Owned by anyone</option>
          </select>
          {
            isGrid ?
              <p onClick={() => setIsGrid(!isGrid)} className='hover:bg-slate-100 p-2 rounded-full cursor-pointer'>
                <TfiViewListAlt  size={23}  className='text-slate-600' /> 
              </p> : 
              <p onClick={() => setIsGrid(!isGrid)} className='hover:bg-slate-100 p-2 rounded-full cursor-pointer'>
                <MdOutlineGridView size={27} className='text-slate-600' /> 
              </p>       
          }
        </div>
      </section>
    </>
  )
}

export default FilterHeader