import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const DocumentSearch = ({search, setSearch}) => {

      const [documents, setDocuments] = useState([]);

      // Handleding searched documents
      useEffect( () => {
    
        const controller = new AbortController(); 
        const signal = controller.signal;
    
        if (search === "") {
            setDocuments([]);
          return;
        };
    
        const fetchDocument = async () => {
        try {
            const result = await axios.get(
              `${process.env.NEXT_PUBLIC_document_service}/api/document/search?search=${search}`,
              { signal }
            )
            setUsers(result?.data?.documents);
        } catch (error) {
            toast.error("Something went wrong");
        }
      };
      fetchDocument()
        return () => controller.abort()
      }, [search])



  return (
    <>
    <section 
    className={`${documents?.length === 0 ? 'hidden': 'flex-col'} overflow-hidden bg-slate-100 absolute z-10 border md:w-[465px] w-[250px] animate_animated animate__bounceIn shadow-lg shadow-slate-400 rounded-lg hidden`}>
        {
            documents && documents.map(document => <Link 
            className='flex justify-between items-center'>
              <div>
                <SiGoogledocs size={20} className="text-purple-500" />
                <div>
                  <h1 className='font-semibold'>Name</h1>
                  <p className='text-slate-600'>Owner Name</p>
                </div>
              </div>
              <div>01/02/2024</div>
            </Link> )
        }
    </section>
    </>
  )
}

export default DocumentSearch