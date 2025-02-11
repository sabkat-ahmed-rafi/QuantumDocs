'use client'
import { useAddDataMutation } from '@/app/slices/docApiSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { quantum } from 'ldrs'




const AddDocument = () => {

    const {user} = useSelector(state => state.auth);
    const router = useRouter();
    const [addData] = useAddDataMutation()
    const [isLoading, setIsLoading] = useState(false);
    quantum.register()

    const handleCreateDocument = async () => {
      if(isLoading) return;
      setIsLoading(true); 
        try {
            const response = await addData( { owner: { email: user?.email } } ).unwrap();
            const documentId = response?.document?._id;
            setTimeout(() => {
              router.push(`/document/${documentId}`);
              setIsLoading(false); // Reset loading after navigation
            }, 2000);
        } catch(error) {
            setIsLoading(false); 
            console.log("Failed to create document:", error);
        }
    }

  return (
    <div onClick={handleCreateDocument} className='border border-slate-200 inline-block py-14 px-10 bg-white rounded-sm hover:border-purple-400 cursor-pointer'>
      {isLoading ? <l-quantum
          size="60"
          speed="1.75" 
          color="purple" 
        ></l-quantum> : <FaPlus className='text-purple-600' size={60} />}
    </div>
  )
}

export default AddDocument