'use client'
import React from 'react'
import { lineSpinner } from 'ldrs'

lineSpinner.register()

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen text-black bg-white">
        <l-line-spinner
        size="40"
        stroke="3"
        speed="1" 
        color="black" 
         ></l-line-spinner>
    </div>
  )
}

export default loading