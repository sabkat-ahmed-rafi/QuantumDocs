import React from 'react'
import Image from "next/image";
import LoadingSVG from '../../../public/bouncingSquares.svg';

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen text-black bg-white">
        <Image src={LoadingSVG} alt="Loading..." width={350} height={350} />
  </div>
  )
}

export default loading