import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Input,
    Avatar,
    Tooltip,
    Spinner
} from "@heroui/react";
import socket from '@/app/utils/socket';
import { toast } from 'react-toastify';
import axios from 'axios';
import scrollBottom from '@/app/utils/scrollBottom';
import messageTimeFormat from '@/app/utils/messageTimeFormat';
import { useDisclosure } from "@heroui/react";
import VideoCallModal from '../../Ui/VideoCallModal';
import { IoVideocam } from "react-icons/io5";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";




const MessageDrawer = ({isOpenMessage, onOpenMessageChange, document, user, setUnreadCount}) => {

  const [text, setText] = useState('');
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const isUserAtBottomRef = useRef(true);
  const [allMessages, setAllMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {isOpen: isOpenVideoCall, onOpen: onOpenVideoCall, onOpenChange: onOpenChangeVideoCall} = useDisclosure();

  const [callOngoing, setCallOngoing] = useState(false);
  const [calling, setCalling] = useState(false);
  const client = useMemo(() => AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }), []);


  

  useEffect(() => {
    socket.on("receive-group-message", handleReceiveMessage); // receiving message
    return () => socket.off("receive-group-message", handleReceiveMessage); // cleaning event listener
  }, []);

  useEffect(() => {
    const groupId = document?.document?.id;
    if(groupId && allMessages.length === 0) {
      fetchAllMessages(groupId, 1, true); // fetching messages from database
    }
  }, [document?.document?.id])

  useEffect(() => {
    if(isUserAtBottomRef.current) {
      scrollBottom(messageEndRef); // focus on the last message on every incoming message
    } 
  }, [allMessages, isOpenMessage])

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

  const fetchAllMessages = useCallback(async (groupId, pageNum = 1, reset = false) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      // Showing the last message first after scrolling the top to see previous message 
      const messagesContainer = messagesContainerRef.current;
      const previousScrollHeight = messagesContainer ? messagesContainer.scrollHeight : 0;

      const result = await axios.get(`${process.env.NEXT_PUBLIC_communication_service}/api/messages/getMessages/${groupId}?page=${pageNum}&limit=10`);
      if (result.data.allMessagesResult.success) {
        const newMessages = result.data.allMessagesResult.messages;
        setAllMessages(prev => reset ? newMessages : [...prev, ...newMessages]);
        setHasMore(newMessages.length === 10); 
        setPage(pageNum + 1);
        // Restore scroll position after messages load
        requestAnimationFrame(() => {
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight - previousScrollHeight - 100;
          }
        });
      };
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore]);
  
  
  const handleReceiveMessage = (message) => {
    setAllMessages(prevMessages => {
      if (!prevMessages.some(m => m._id === message._id)) {
        return [message, ...prevMessages];
      }
      return prevMessages;
    });
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;

    if (scrollTop === 0 && !isLoading && hasMore) {
      fetchAllMessages(document?.document?.id, page); // fetching old message on scroll above
    };

    isUserAtBottomRef.current = scrollHeight - scrollTop <= clientHeight + 10;
  };  

  const initilizedCall = async () => {
    const groupId = document?.document?.id;
    const userUid = user?.uid;
    if(!callOngoing) {
      socket.emit("start-call", groupId, userUid); // To show the call ongoing UI
    }
    setCalling(true);
    onOpenVideoCall();
  };

  useEffect(() => {
    const groupId = document?.document?.id;
    socket.emit("check-call-status", groupId, (status) => {
      setCallOngoing(status); // To show the Call button checking call status
    });
  }, [document?.document?.id]);

    // Listen for call start/end events in real-time
    useEffect(() => {

      const groupId = document?.document?.id;
      socket.on("call-started", (id) => {
        if (id === groupId) setCallOngoing(true);
      });
  
      socket.on("call-ended", (id) => {
        if (id === groupId) setCallOngoing(false);
      });

  }, [document?.document?.id]);

  return (
    <>
      <Drawer
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpenMessage}
        onOpenChange={onOpenMessageChange}
        onClose={() => setUnreadCount(0)}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex items-center gap-5 text-black font-extrabold">
                Team Messages {callOngoing ? <button onClick={initilizedCall} className='text-small text-purple-700 font-sans font-semibold flex items-center gap-2 cursor-pointer animate__animated animate__tada animate__infinite	infinite'><IoVideocam /> Join Ongoing Call</button> : <IoVideocam onClick={() => initilizedCall()} className='text-purple-700 cursor-pointer' size={30} /> }
              </DrawerHeader>
              <hr />
              <DrawerBody ref={messagesContainerRef} onScroll={handleScroll} className='text-black scrollbar-hide'>
              {isLoading && <Spinner color='secondary' className='flex justify-center items-center text-xl font-semibold mt-2'>Loading</Spinner>}
                {/* showing message on UI  */}
                {
                  [...allMessages].reverse().map((message, index) => <div key={index} className='mb-1'>
                    <div className={`flex ${message.sender.email == user.email ? 'justify-end space-x-2' : 'flex-row-reverse justify-end gap-2'} items-end`}>
                      <p className={`${message.sender.email !== user.email ? 'bg-slate-500' : 'bg-purple-500'} text-white px-4 py-2 rounded-[15px] text-left ${message.sender.email == user.email ? 'rounded-br-[0px]' : 'rounded-bl-[0px]'} inline-block w-[200px]`}>
                        {message.text}
                      </p>
                      <Tooltip content={`${message.sender.name}`} color='secondary'>
                        <Avatar size="sm" src={`${message.sender.photo}`} />
                      </Tooltip>
                    </div>
                    <p className={`text-sm text-slate-400 ${message.sender.email == user.email ? 'text-right mr-11' : 'text-left ml-11'}`}>{messageTimeFormat(message.createdAt)}</p>
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
      {isOpenVideoCall && (
      <AgoraRTCProvider client={client}>
        <VideoCallModal 
          isOpenVideoCall={isOpenVideoCall}
          onOpenChangeVideoCall={onOpenChangeVideoCall}
          document={document}
          setCallOngoing={setCallOngoing}
          calling={calling}
          setCalling={setCalling}
        />
      </AgoraRTCProvider>
      )}

    </>
  )
}

export default MessageDrawer