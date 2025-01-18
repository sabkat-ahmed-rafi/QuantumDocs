import React from 'react'
import {
    Button,
    useDisclosure,
  } from "@heroui/react";
import ShareModal from '../ShareModal/ShareModal';
import { BiWorld } from "react-icons/bi";



const DocumentFunc = () => {

    const {isOpen: isOpenShareModal, onOpen: onOpenShareModal, onOpenChange: onOpenChangeShareModal} = useDisclosure();

  return (
    <>
        <section className='space-x-3'>
           <Button className='bg-[#C9A9E9]' onPress={onOpenShareModal}>
              <BiWorld size={20} /> Share
           </Button>
           <Button className='bg-[#C9A9E9]' onPress={onOpenShareModal}>
              <BiWorld size={20} /> Share
           </Button>
           <Button className='bg-[#C9A9E9]' onPress={onOpenShareModal}>
              <BiWorld size={20} /> Share
           </Button>
        </section>
        <ShareModal isOpenShareModal={isOpenShareModal} onOpenChangeShareModal={onOpenChangeShareModal}/>
    </>
  )
}

export default DocumentFunc