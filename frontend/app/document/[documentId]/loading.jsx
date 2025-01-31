import React from 'react'
import Image from "next/image";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen text-black bg-white">
        <Image src={'/bouncingSquares.svg'} alt="Document Loading..." width={350} height={350} priority />
  </div>
  )
}

export default loading