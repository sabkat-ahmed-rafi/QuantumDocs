import React, { useState } from 'react'
import { SiGoogledocs } from 'react-icons/si'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from 'next/link';
import { quantum } from 'ldrs'


quantum.register()

const DocListRaw = ({ documents, formatDate, deleteDocument, handleCopyDocumentLink }) => {

  const [loading, setLoading] = useState(null);

  return (
    <>
      <section className='bg-white text-black z-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[40px] gap-9 md:gap-9 lg:gap-10 xl:px-[170px] md:px-[50px] pb-[60px]'>
        {
          documents.map((document) => (
            <div
            key={document._id} 
            className="flex flex-col rounded-sm shadow-sm w-60 sm:w-56 h-72 border hover:border-purple-600 "
            >
              <Link
              onClick={() => setLoading(document._id)}
              href={`/document/${document._id}`}
              className="h-[70%] dark:bg-gray-300" 
              >
              {loading == document._id ? <div className='h-full flex justify-center items-center bg-white'>
                        <l-quantum
                          size="90"
                          speed="1.75" 
                          color="#a500ff" 
                        ></l-quantum>
              </div> : <img className={`h-full w-full object-cover object-top`} src={document.preview}/>}
              </Link>
              <div className="flex-1 py-4 px-4 dark:bg-gray-50 h-[30%] border">
                <h1 className=" font-semibold font-sans">{document.title}</h1>
                <div className="flex items-center justify-between">
                  <div className='flex space-x-3 items-center'>
                    <SiGoogledocs size={18} className="text-purple-500" />
                    <p className='text-sm font-sans text-slate-500'>{formatDate(document.updatedAt)}</p>
                  </div>
                  <Dropdown className='dropdown'>
                    <DropdownTrigger>
                      <button className='p-2 rounded-full hover:bg-slate-200 outline-none'><BsThreeDotsVertical /></button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      {/* <DropdownItem key="new"></DropdownItem> */}
                      <DropdownItem onPress={() => handleCopyDocumentLink(document._id)} key="copy" className='font-sans'>Copy link</DropdownItem>
                      <DropdownItem key="edit" className='font-sans block p-0'>
                        <a target='_blank' href={`${process.env.NEXT_PUBLIC_frontend}/document/${document._id}`} className='w-full block px-2 py-[5px]' >
                        Open in new tab
                        </a>
                      </DropdownItem>
                      <DropdownItem onPress={() => deleteDocument(document._id)} key="delete" className="text-danger font-sans" color="danger">
                        Remove
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </>
  )
}

export default DocListRaw