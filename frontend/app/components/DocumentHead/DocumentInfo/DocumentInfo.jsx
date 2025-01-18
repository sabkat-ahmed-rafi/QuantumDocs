import React, {lazy, Suspense} from 'react'

// Dynamically imported using the react's lazy and Suspense 
const icons = {
    SiGoogledocs: lazy(() => import('react-icons/si').then((mod) => ({ default: mod.SiGoogledocs }))),
    FaStar: lazy(() => import('react-icons/fa').then((mod) => ({ default: mod.FaStar }))),
    IoCloudUploadOutline: lazy(() => import('react-icons/io5').then((mod) => ({ default: mod.IoCloudUploadOutline }))),
    FaArrowsRotate: lazy(() => import('react-icons/fa6').then((mod) => ({ default: mod.FaArrowsRotate }))),
  };




const DocumentInfo = () => {
    const saved = true;
  return (
    <>
    <Suspense 
    fallback={
                <div className="flex items-center justify-center h-screen text-black bg-white">
                  <l-line-spinner
                    size="40"
                    stroke="3"
                    speed="1" 
                    color="black" 
                  ></l-line-spinner>
                </div>
            }>

        <section className='flex items-center space-x-3'>
            <icons.SiGoogledocs size={40} className="text-purple-500" />
            <div className='flex-col space-y-3'>
                <div className='flex items-center space-x-3'>
                    <form>
                        <input className='border' type="text" />
                    </form>
                    <icons.FaStar size={30} className='text-purple-700 p-1 rounded-full hover:bg-slate-200' />
                    <div className='flex items-center space-x-2'>
                        {
                           saved ? 
                           <>
                           <icons.FaArrowsRotate className='animate-spin' /><p className='ml-1 text-sm font-semibold'>Saving...</p>
                           </> : 
                           <>
                           <icons.IoCloudUploadOutline size={25} className='text-sm font-semibold' />
                           <p className='ml-1 text-sm font-semibold'>Saved</p>
                           </> 
                        }
                    </div>
                </div>
                <div className='flex font-sans text-sm font-[500]'>
                    <p className='px-2 py-1 hover:bg-slate-200 rounded-md'>Download PDF</p>
                    <p className='px-2 py-1 hover:bg-slate-200 rounded-md'>Download DOCS</p>
                </div>
            </div>
        </section>
        
    </Suspense>
    </>
  )
}

export default DocumentInfo