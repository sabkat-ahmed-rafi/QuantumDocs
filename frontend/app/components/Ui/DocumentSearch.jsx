import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { SiGoogledocs } from 'react-icons/si';
import { toast } from 'react-toastify';

const DocumentSearch = ({search, userFromdb}) => {

      const [documents, setDocuments] = useState([]);

      // Handleding searched documents
      useEffect( () => {
    
        const controller = new AbortController(); 
        const signal = controller.signal;
        const userEmail = userFromdb?.email;
    
        if (search === "") {
            setDocuments([]);
          return;
        };
    
        const fetchDocument = async () => {
        try {
            const result = await axios.get(
              `${process.env.NEXT_PUBLIC_document_service}/api/document/search?search=${search}&userEmail=${userEmail}`,
              { signal }
            )
            setDocuments(result?.data?.documents?.documents);
        } catch (error) {
            toast.error("Something went wrong");
        }
      };
      fetchDocument()
        return () => controller.abort()
      }, [search])


      const formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleDateString("en-GB");
      };

  return (
    <>
    <section 
    className={`${documents?.length === 0 ? 'hidden': 'flex-col'} overflow-hidden bg-slate-100 absolute top-[60px] p-5 z-50 space-y-4 border md:w-[465px] animate_animated animate__bounceIn shadow-lg shadow-slate-400 rounded-lg`}>
        {
            documents && documents.map(document => <Link key={document._id} href={`/document/${document._id}`}
            className='flex justify-between space-x-6 items-center hover:bg-slate-300 p-3 rounded-lg'>
              <div className='flex items-center space-x-5'>
                <SiGoogledocs size={22} className="text-purple-500" />
                <div>
                  <h1 className='font-semibold font-sans'>{document.title}</h1>
                  <p className='text-slate-600 font-sans'>{document.owner.name}</p>
                </div>
              </div>
              <div className='font-sans'>{formatDate(document.createdAt)}</div>
            </Link> )
        }
    </section>
    </>
  )
}

export default DocumentSearch