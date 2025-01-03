'use client'
import React from 'react'
import { FaPlus } from "react-icons/fa6";

const AddDocument = () => {
  return (
    <div href={"/"} className='border border-slate-200 inline-block py-14 px-10 bg-white rounded-sm hover:border-purple-400'>
       <FaPlus className='text-purple-600' size={60} />
    </div>
  )
}

export default AddDocument