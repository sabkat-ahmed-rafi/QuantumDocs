import React from 'react'

const DocsList = ({ documents }) => {
  return (
    <>
      <section className='bg-white text-black z-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[40px] gap-9 md:gap-9 lg:gap-10 xl:px-[170px] md:px-[50px] pb-[100px]'>
      {Array(8).fill(0).map((_, index) => ( 
        <div key={index} className="flex flex-col rounded-sm shadow-md w-60 sm:w-56 animate-pulse h-72">
          <div className="h-64 rounded-t dark:bg-gray-300"></div>
          <div className="flex-1 px-4 py-8 space-y-2 sm:p-8 dark:bg-gray-50">
            <div className="w-full h-2 rounded dark:bg-gray-300"></div>
            <div className="w-full h-2 rounded dark:bg-gray-300"></div>
            <div className="w-3/4 h-2 rounded dark:bg-gray-300"></div>
          </div>
        </div>
      ))}
      </section>
    </>
  )
}

export default DocsList