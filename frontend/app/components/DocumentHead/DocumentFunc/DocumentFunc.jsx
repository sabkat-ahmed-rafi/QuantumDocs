'use client'

import {Button, useDisclosure, Avatar, AvatarGroup, Tooltip, Badge} from "@heroui/react";
import ShareModal from '../ShareModal/ShareModal';
import { BiWorld } from 'react-icons/bi';
import { AiFillMessage } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import MessageDrawer from "../MessageDrawer/MessageDrawer";
import NoteDrawer from "../NoteDrawer/NoteDrawer";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import socket from "@/app/utils/socket";


const DocumentFunc = ({activeUsers, document, documentRefetch}) => {

   const {user} = useSelector(state => state.auth);
   const [unreadCount, setUnreadCount] = useState(0);

   const isOwner = user?.email === document?.document?.owner?.email;
   const isSharedUser = document?.document?.sharedPersons.some(person => person.email == user?.email);


   const uniqueActiveUsers = useMemo(() => {
      const seenUids = new Set();
      return activeUsers.filter((active) => {
         if (active.uid === user?.uid) return false; // removing current user
         if (seenUids.has(active.uid)) return false; // skip duplicate
         seenUids.add(active.uid);
         return true;
      });
   }, [activeUsers, user?.uid])

   useEffect(() => {
      fetchUnreadCount(user?.uid, document?.document?.id);
   }, [user?.uid, document?.document?.id]);

   useEffect(() => {
      socket.on('receive-unread-group-message', receiveUnreadMessageCount);
      return () => socket.off('receive-unread-group-message', receiveUnreadMessageCount);
   }, []);

   const receiveUnreadMessageCount = ({count, senderUid}) => {
      if(senderUid !== user?.uid) {
         setUnreadCount(prevCount => prevCount + count);
      }
   };

   const fetchUnreadCount = async (userId, groupId) => {
      try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_communication_service}/api/messages/unread/${userId}/${groupId}`);
        if(result?.data?.countResult?.success) {
         setUnreadCount(result.data.countResult.unreadMessageCount);
        }  
      } catch (error) {
        toast.error("Something went wrong")
      }
   };

   const handleMarkAsRead = () => {
      const userId = user?.uid;
      const groupId = document?.document?.id;
      if(userId && groupId) {
         socket.emit('group-message-mark-as-read', {userId, groupId});
         setUnreadCount(0);
      };
   };

   //  For Share Modal 
    const {isOpen: isOpenShareModal, onOpen: onOpenShareModal, onOpenChange: onOpenChangeShareModal} = useDisclosure();

   //  For Message Drawer 
    const {isOpen: isOpenMessage, onOpen: onOpenMessage, onOpenChange: onOpenMessageChange} = useDisclosure();

   //  For Note Drawer 
    const {isOpen: isOpenNote, onOpen: onOpenNote, onOpenChange: onOpenNoteChange} = useDisclosure();

  return (
    <>
        <section className='md:space-x-3 space-x-1 flex md:mt-0 mt-2'>

         {/* Showing user who are seeing the document */}
           <AvatarGroup isBordered className="hidden lg:flex">
               {
                 uniqueActiveUsers.map(activeUser => <Tooltip 
                  key={activeUser.uid} 
                  color="secondary"
                  content={`${activeUser.name}`}
                  >
                  <Avatar
                     referrerPolicy="no-referrer"
                     isBordered
                     color="secondary"
                     src={`${activeUser.photo}`} 
                      />
                  </Tooltip>
                     )
               }
           </AvatarGroup>

           {/* Buttons of Modal and Drawer */}
           <Button isDisabled={!isOwner && !isSharedUser} className='bg-[#C9A9E9] md:p-2 px-3' onPress={onOpenNote}>
              <GiNotebook size={20} /> Notes
           </Button>
            {
               unreadCount > 0 ? <Badge color="danger" content={unreadCount >= 10 ? "9+" : unreadCount } shape="rectangle" showOutline={false} >
               <Button isDisabled={!isOwner && !isSharedUser} className='bg-[#C9A9E9] md:p-2 px-3' onPress={() => {onOpenMessage(); handleMarkAsRead()}}> 
                <AiFillMessage size={20}/>  Messages
               </Button>
             </Badge> 
             :
             <Button isDisabled={!isOwner && !isSharedUser} className='bg-[#C9A9E9] md:p-2 px-3' onPress={onOpenMessage}> 
               <AiFillMessage size={20}/>  Messages
            </Button>
            }
           <Button  className='bg-[#C9A9E9] md:p-2 px-3' onPress={onOpenShareModal}>
              <BiWorld size={20} /> Share
           </Button>
        </section>
        
        {/* Body of Modal and Drawer */}
        <NoteDrawer isOpenNote={isOpenNote} onOpenNoteChange={onOpenNoteChange} document={document} user={user} />
        <MessageDrawer isOpenMessage={isOpenMessage} onOpenMessageChange={onOpenMessageChange} document={document} user={user} />
        <ShareModal isOpenShareModal={isOpenShareModal} onOpenChangeShareModal={onOpenChangeShareModal} document={document} documentRefetch={documentRefetch} user={user} />
    </>
  )
}

export default DocumentFunc