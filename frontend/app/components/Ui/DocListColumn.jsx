import React from 'react'
import { SiGoogledocs } from 'react-icons/si'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from 'next/link';

const DocListColumn = ({ documents, formatDate, deleteDocument, handleCopyDocumentLink }) => {

  return (
    <>
       <section className='bg-white text-black z-50 flex flex-col px-[40px]  xl:px-[170px] md:px-[50px] pb-[60px]'>
        {
          documents.map((document) => (
            <div
            key={document._id} 
            className="border-b py-4"
            >
              <div className="flex-1  space-y-2 px-4 ">
                <div className="flex items-center justify-between">
                <Link href={`/document/${document._id}`} className='flex items-center space-x-5'>
                  <SiGoogledocs size={20} className="text-purple-500" />
                  <h1 className="font-semibold font-sans">{document.title}</h1>
                </Link>
                <p className='text-sm font-sans text-slate-500'>{formatDate(document.updatedAt)}</p>
                <Dropdown className='dropdown'>
                    <DropdownTrigger>
                      <button onClick={(e) => e.stopPropagation()} className='p-2 rounded-full hover:bg-slate-200 outline-none'><BsThreeDotsVertical /></button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      {/* <DropdownItem key="new"></DropdownItem> */}
                      <DropdownItem onPress={() => handleCopyDocumentLink(document._id)} key="copy" className='font-sans'>Copy link</DropdownItem>
                      <DropdownItem key="edit" className='font-sans'>Open in new tab</DropdownItem>
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

export default DocListColumn