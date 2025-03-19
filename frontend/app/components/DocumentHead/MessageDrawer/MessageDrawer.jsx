import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Input,
    Avatar,
    Tooltip
} from "@heroui/react";
import socket from '@/app/utils/socket';
import { toast } from 'react-toastify';
import axios from 'axios';
import scrollBottom from '@/app/utils/scrollBottom';


const MessageDrawer = ({isOpenMessage, onOpenMessageChange, document, user}) => {

  const [text, setText] = useState('');
  const messageEndRef = useRef(null);
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socket.on("receive-group-message", handleReceiveMessage); // receiving message
    return () => socket.off("receive-group-message", handleReceiveMessage); // cleaning event listener
  }, []);

  useEffect(() => {
    const groupId = document?.document?.id;
    if(groupId && allMessages.length === 0) {
      fetchAllMessages(groupId); // fetching messages from database
    }
    scrollBottom(messageEndRef); // focus on the last message on every incoming message
  }, [allMessages])

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    const groupId = document?.document?.id;
    if(!text.trim() || !groupId) return; 
    const sender = {
      uid: user?.uid,
      photo: user?.photoURL,
      email: user?.email,
      name: user?.displayName
    };

    socket.emit('send-group-message', { sender, groupId, text });

    setText('');
    
  };

  const fetchAllMessages = useCallback(async (groupId) => {
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_communication_service}/api/messages/getMessages/${groupId}`);
      if (result.data.allMessagesResult.success) {
        setAllMessages(result.data.allMessagesResult?.messages);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, []);
  
  const handleReceiveMessage = (message) => {
    setAllMessages(prevMessages => {
      if (!prevMessages.some(m => m._id === message._id)) {
        return [...prevMessages, message];
      }
      return prevMessages;
    });
  };

  

  return (
    <>
        <Drawer
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpenMessage}
        onOpenChange={onOpenMessageChange}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1 text-black font-extrabold">Team Messages</DrawerHeader>
              <hr />
              <DrawerBody className='text-black'>
                {/* showing message on UI  */}
                {
                  allMessages.map((message, index) => <div key={index} className='mb-1'>
                    <div className={`flex ${message.sender.email == user.email ? 'justify-end space-x-2' : 'flex-row-reverse justify-end gap-2'} items-end`}>
                      <p className={`${message.sender.email !== user.email ? 'bg-slate-500' : 'bg-purple-500'} text-white px-4 py-2 rounded-[15px] text-left ${message.sender.email == user.email ? 'rounded-br-[0px]' : 'rounded-bl-[0px]'} inline-block w-[200px]`}>
                        {message.text}
                      </p>
                      <Tooltip content={`${message.sender.name}`} color='secondary'>
                        <Avatar size="sm" src={`${message.sender.photo}`} />
                      </Tooltip>
                    </div>
                    <p className={`text-sm text-slate-400 ${message.sender.email == user.email ? 'text-right mr-11' : 'text-left ml-11'}`}>12:30 pm - 30 september</p>
                  </div>)
                }
                {/* Showing "No messages" if there is no message */}
                {
                  allMessages.length == 0 && <h1 className='h-full flex justify-center items-center font-bold text-lg font-sans text-slate-300'>No messages</h1>
                }
                {/* taking reference to show the last message on every message came */}
                <div ref={messageEndRef} />
              </DrawerBody>
              <hr />
              <form onSubmit={handleSubmitMessage}>
              <DrawerFooter className='flex justify-center items-center'>
                <div className='w-full'>
                  <Input value={text} onChange={e => setText(e.target.value)} name='text' className='text-black' variant="faded" size='sm' label="message" type="text" />
                </div>
                <div className='flex justify-end space-x-3'>
                  <Button type='submit' color="secondary" className='rounded font-sans font-semibold'>
                    Send 
                  </Button>  
                </div>
              </DrawerFooter>
              </form>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MessageDrawer