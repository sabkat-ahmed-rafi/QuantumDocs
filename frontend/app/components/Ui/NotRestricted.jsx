import React from 'react'
import { FaGlobeAmericas } from "react-icons/fa";


const NotRestricted = ({universalAccessRole, isRestricted, handleIsRestricted, handleUniversalRole}) => {
  return (
    <>
        <div className='flex justify-between items-center py-2 rounded-md'>
          <section className='flex justify-between items-center space-x-2'>
            <p className='bg-[#C4EED0] p-2 rounded-full animate-pulse'>
              <FaGlobeAmericas className='text-green-800 text-lg ' />
            </p>
            <div className='flex-col'>
             <select 
             className='hover:bg-slate-100 transition-all p-2 rounded-md focus:outline-none cursor-pointer' 
             defaultValue={isRestricted == true ? 'Restricted': 'Anyone with the link'} 
             onChange={handleIsRestricted}
             >
              <option className='bg-white py-2' value="Restricted">Restricted</option>
              <option className='bg-white' value="Anyone with the link">Anyone with the link</option>
             </select>
             <p className='text-[12px] ml-3 text-slate-500 font-sans'>Anyone on the internet with the link can view</p>  
            </div>
          </section>    
          <select 
          className='hover:bg-slate-100 transition-all p-2 rounded-md focus:outline-none cursor-pointer relative focus:translate-y-[-50%]' 
          defaultValue={universalAccessRole} 
          onChange={handleUniversalRole}
          >
            <option className='bg-white py-2' value="Viewer">Viewer</option>
            <option className='bg-white' value="Editor">Editor</option>
          </select>     
        </div>
    </>
  )
}

export default NotRestricted