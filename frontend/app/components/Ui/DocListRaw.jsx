import React from 'react'
import { SiGoogledocs } from 'react-icons/si'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from 'next/link';

const DocListRaw = ({ documents, formatDate }) => {
  return (
    <>
      <section className='bg-white text-black z-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[40px] gap-9 md:gap-9 lg:gap-10 xl:px-[170px] md:px-[50px] pb-[100px]'>
        {
          documents.map((document) => (
            <div
            key={document._id} 
            className="flex flex-col rounded-sm shadow-md w-60 sm:w-56 h-72"
            >
              <Link
              href={`/document/${document._id}`}
              className="h-64 rounded-t dark:bg-gray-300 animate-pulse" 
              >
                {/* <img src='/'/> */}
              </Link>
              <div className="flex-1 py-8 space-y-2 px-4 dark:bg-gray-50">
                <h1 className=" font-semibold font-sans">{document.title}</h1>
                <div className="flex items-center justify-between">
                  <div className='flex space-x-3 items-center'>
                    <SiGoogledocs size={18} className="text-purple-500" />
                    <p className='text-sm font-sans text-slate-500'>{formatDate(document.updatedAt)}</p>
                  </div>
                  <Dropdown className='dropdown'>
                    <DropdownTrigger>
                      <button onClick={(e) => e.stopPropagation()} className='p-2 rounded-full hover:bg-slate-200 outline-none'><BsThreeDotsVertical /></button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      {/* <DropdownItem key="new"></DropdownItem> */}
                      <DropdownItem key="copy" className='font-sans'>Copy link</DropdownItem>
                      <DropdownItem key="edit" className='font-sans'>Open in new tab</DropdownItem>
                      <DropdownItem key="delete" className="text-danger font-sans" color="danger">
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