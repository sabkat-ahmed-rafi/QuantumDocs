import React, {lazy, Suspense} from 'react'
import {
    Button,
    useDisclosure,
  } from "@heroui/react";
import ShareModal from '../ShareModal/ShareModal';
const icon = {
    BiWorld: lazy(() => import('react-icons/bi').then((mod) => ({default: mod.BiWorld})))
}


const DocumentFunc = () => {

    const {isOpen: isOpenShareModal, onOpen: onOpenShareModal, onOpenChange: onOpenChangeShareModal} = useDisclosure();

  return (
    <>
    <Suspense fallback={
        <div className="flex items-center justify-center h-screen text-black bg-white">
        <l-line-spinner
          size="40"
          stroke="3"
          speed="1" 
          color="black" 
        ></l-line-spinner>
      </div>
    }>
        <section className='space-x-3'>
           <Button className='bg-[#C9A9E9]' onPress={onOpenShareModal}>
              <icon.BiWorld size={20} /> Share
           </Button>
           <Button className='bg-[#C9A9E9]' onPress={onOpenShareModal}>
              <icon.BiWorld size={20} /> Share
           </Button>
           <Button className='bg-[#C9A9E9]' onPress={onOpenShareModal}>
              <icon.BiWorld size={20} /> Share
           </Button>
        </section>
    </Suspense>
        <ShareModal isOpenShareModal={isOpenShareModal} onOpenChangeShareModal={onOpenChangeShareModal}/>
    </>
  )
}

export default DocumentFunc