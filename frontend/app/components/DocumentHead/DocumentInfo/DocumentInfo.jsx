import { SiGoogledocs } from 'react-icons/si';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FaArrowsRotate } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';



const DocumentInfo = ({isTyping}) => {
  return (
    <>

        <section className='flex items-center space-x-3'>
            <SiGoogledocs size={40} className="text-purple-500" />
            <div className='flex-col space-y-3'>
                <div className='flex items-center space-x-3'>
                    <form>
                        <input className='border' type="text" />
                    </form>
                    <FaStar size={30} className='text-purple-700 p-1 rounded-full hover:bg-slate-200' />
                    <div className='md:flex items-center space-x-2 hidden'>
                        {
                           isTyping ? 
                           <>
                           <FaArrowsRotate className='animate-spin' /><p className='ml-1 text-sm font-semibold'>Saving...</p>
                           </> : 
                           <>
                           <IoCloudUploadOutline size={25} className='text-sm font-semibold' />
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
        
    </>
  )
}

export default DocumentInfo