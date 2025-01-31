import {Button, useDisclosure} from "@heroui/react";
import ShareModal from '../ShareModal/ShareModal';
import { BiWorld } from 'react-icons/bi';
import { AiFillMessage } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import MessageDrawer from "../MessageDrawer/MessageDrawer";


const DocumentFunc = () => {

   //  For Share Modal 
    const {isOpen: isOpenShareModal, onOpen: onOpenShareModal, onOpenChange: onOpenChangeShareModal} = useDisclosure();

   //  For Message Drawer 
    const {isOpen: isOpenMessage, onOpen: onOpenMessage, onOpenChange: onOpenMessageChange} = useDisclosure();

  return (
    <>
 
        <section className='space-x-3'>
           <Button className='bg-[#C9A9E9]' onPress={onOpenShareModal}>
              <GiNotebook size={20} /> Notes
           </Button>
           <Button className='bg-[#C9A9E9]' onPress={onOpenMessage}> 
           <AiFillMessage size={20}/>  Messages
            </Button>
           <Button className='bg-[#C9A9E9]' onPress={onOpenShareModal}>
              <BiWorld size={20} /> Share
           </Button>
        </section>
        
        <ShareModal isOpenShareModal={isOpenShareModal} onOpenChangeShareModal={onOpenChangeShareModal}/>
        <MessageDrawer isOpenMessage={isOpenMessage} onOpenMessageChange={onOpenMessageChange} />
    </>
  )
}

export default DocumentFunc