'use client'

import { SiGoogledocs } from 'react-icons/si';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FaArrowsRotate } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
    import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



const DocumentInfo = ({isTyping, document, customProviderRef}) => {


    const [title, setTitle] = useState("");
 

    useEffect(() => {
        if (document?.document?.title) {
            setTitle(document.document.title);
        }
    }, [document?.document?.title]);


    const updateDocTitle = async () => {
        if(title === document?.document?.title) return;
        try {

            if(customProviderRef.current.readyState == WebSocket.OPEN) {
                customProviderRef.current.send(JSON.stringify({type: 'titleUpdate' , documentId:document?.document?.id , newTitle: title}));
            };
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    const handleKeyDownUpdate = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            updateDocTitle();
            e.target.blur();
        }
    }

  return (
    <>

        <section className='flex items-center space-x-3'>
            <SiGoogledocs size={40} className="text-purple-500" />
            <div className='flex-col space-y-3'>
                <div className='flex items-center space-x-3'>
                        <input 
                        name="title"
                        value={title || ""}  
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={updateDocTitle}
                        onKeyDown={handleKeyDownUpdate}
                        className="text-xl px-1 bg-[#F9FBFD] w-[220px] border-2 border-[#F9FBFD] hover:border-black transition-all rounded-md"
                        type="text"
                        />
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
                    <button className='px-2 py-1 hover:bg-slate-200 rounded-md '>Download PDF</button>
                    <button className='px-2 py-1 hover:bg-slate-200 rounded-md '>Download DOCS</button>
                </div>
            </div>
        </section>
        
    </>
  )
}

export default DocumentInfo