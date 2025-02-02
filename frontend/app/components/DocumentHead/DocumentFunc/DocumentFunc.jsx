import {Button, useDisclosure} from "@heroui/react";
import ShareModal from '../ShareModal/ShareModal';
import { BiWorld } from 'react-icons/bi';
import { AiFillMessage } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import MessageDrawer from "../MessageDrawer/MessageDrawer";
import NoteDrawer from "../NoteDrawer/NoteDrawer";


const DocumentFunc = () => {

   //  For Share Modal 
    const {isOpen: isOpenShareModal, onOpen: onOpenShareModal, onOpenChange: onOpenChangeShareModal} = useDisclosure();

   //  For Message Drawer 
    const {isOpen: isOpenMessage, onOpen: onOpenMessage, onOpenChange: onOpenMessageChange} = useDisclosure();

   //  For Note Drawer 
    const {isOpen: isOpenNote, onOpen: onOpenNote, onOpenChange: onOpenNoteChange} = useDisclosure();

  return (
    <>
        {/* Buttons of Modal and Drawer  */}
        <section className='md:space-x-3 space-x-2 flex md:mt-0 mt-2'>
           <Button  className='bg-[#C9A9E9] md:p-2 px-3' onPress={onOpenNote}>
              <GiNotebook size={20} /> Notes
           </Button>
           <Button  className='bg-[#C9A9E9] md:p-2 px-3' onPress={onOpenMessage}> 
           <AiFillMessage size={20}/>  Messages
            </Button>
           <Button  className='bg-[#C9A9E9] md:p-2 px-3' onPress={onOpenShareModal}>
              <BiWorld size={20} /> Share
           </Button>
        </section>
        
        {/* Body of Modal and Drawer  */}
        <ShareModal isOpenShareModal={isOpenShareModal} onOpenChangeShareModal={onOpenChangeShareModal}/>
        <MessageDrawer isOpenMessage={isOpenMessage} onOpenMessageChange={onOpenMessageChange} />
        <NoteDrawer isOpenNote={isOpenNote} onOpenNoteChange={onOpenNoteChange} />
    </>
  )
}

export default DocumentFunc