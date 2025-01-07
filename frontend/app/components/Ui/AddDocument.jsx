'use client'
import useAxiosSecureForDS from '@/app/hooks/useAxiosSecureForDS';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const AddDocument = () => {

    const {user} = useSelector(state => state.auth);
    const router = useRouter();
    const axiosSecure = useAxiosSecureForDS();

    const handleCreateDocument = async () => {
        try {
            const response = await axiosSecure.post(`/api/document`, { owner: user?.email });
            console.log(response);

            const documentId = response?.data?.document?._id;
            router.push(`/document/${documentId}`);
        } catch(error) {
            console.log("Failed to create document:", error);
        }
    }

  return (
    <div onClick={handleCreateDocument} href={"/"} className='border border-slate-200 inline-block py-14 px-10 bg-white rounded-sm hover:border-purple-400 cursor-pointer'>
       <FaPlus className='text-purple-600' size={60} />
    </div>
  )
}

export default AddDocument