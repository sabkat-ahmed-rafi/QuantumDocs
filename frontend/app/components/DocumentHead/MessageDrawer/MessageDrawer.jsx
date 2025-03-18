import React, { useEffect, useState } from 'react'
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


const MessageDrawer = ({isOpenMessage, onOpenMessageChange, document, user}) => {

  const [text, setText] = useState('')
  const [message, setMessage] = useState({});
  const [allMessages, setAllMessages] = useState([])

  useEffect(() => {
    socket.on("receive-group-message", (message) => {
      console.log(message);
    });
  }, [])

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

    socket.emit('send-group-message', { sender, groupId, text })

    setText('');
    
  }

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
                {/* remote user message */}
                <div className='mb-1'>
                  <div className='flex items-end space-x-2'>
                    <Tooltip content="Sabkat Ahmed Rafi" color='secondary'>
                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    </Tooltip>
                    <p className='bg-slate-500 text-white px-4 py-2 rounded-[15px] text-left rounded-bl-[0px] inline-block w-[200px]'>
                       Click the close button dfghssss rtqewrgv 34r tgfqwrfv q4r tqrt qwe twer qwerqw console.error( rwe qwer qwtasdf);
                    </p>
                  </div>
                  <p className='text-sm text-slate-400 text-left ml-11'>12:30 am - 30 september</p>
                </div>
                {/* local user message */}
                <div className='mb-1'>
                  <div className='flex justify-end items-end space-x-2'>
                    <p className='bg-purple-500 text-white px-4 py-2 rounded-[15px] text-left rounded-br-[0px] inline-block w-[200px]'>
                       Click
                    </p>
                    <Tooltip content="Sabkat Ahmed Rafi" color='secondary'>
                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    </Tooltip>
                  </div>
                  <p className='text-sm text-slate-400 text-right mr-11'>12:30 pm - 30 september</p>
                </div>
              </DrawerBody>
              <hr />
              <form onSubmit={handleSubmitMessage}>
              <DrawerFooter className='flex justify-center items-center'>
                <div className='w-full'>
                  <Input value={text} onChange={e => setText(e.target.value)} name='text' className='text-black' variant="faded" size='sm' label="message" type="text" />
                </div>
                <div className='flex justify-end space-x-3'>
                  <Button type='submit' color="secondary" className='rounded'>
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