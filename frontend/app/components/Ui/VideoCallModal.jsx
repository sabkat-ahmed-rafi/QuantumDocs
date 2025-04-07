import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { MdCallEnd } from "react-icons/md";
import socket from '@/app/utils/socket';





const VideoCallModal = ({ isOpenVideoCall, onOpenChangeVideoCall, localVideo, client, localStream, setJoined, joined, document, setCallOngoing }) => {

  const [users, setUsers] = useState([]);

  const initAgora = async () => {
    
    client.current.on('user-published', (user, mediaType) => {
      if(mediaType === 'video') {
        client.current.subscribe(user, mediaType).then(() => {
          setUsers(prev => [...prev, user]);
          setTimeout(() => {
            user.videoTrack.play(`remote-video-${user.uid}`);
          }, 100);
        });
      }
      if (mediaType === 'audio') {
        client.current.subscribe(user, mediaType).then(() => {
          setTimeout(() => {
            user.audioTrack?.play();
          }, 100);
        });

      }



    });

    // Event handler for remote user unpublishing their stream
    client.current.on('user-unpublished', (user) => {
      setUsers((prevUsers) => prevUsers.filter((el) => el.uid !== user.uid));
    });
    
    // Error handling
    client.current.on('error', (error) => {
      console.log('Agora error', error);
    });
    
  };

  const endCall = async () => {
    if (joined) {
      await client.current.leave();
      if (localStream && localStream[0]) localStream[0].close();
      if (localStream && localStream[1]) localStream[1].close();
      localStream = null;
      setUsers([]);
      setJoined(false);
    }
  };

  useEffect(() => {
    if (isOpenVideoCall && client.current) {
      initAgora();
    }
    return () => {
      if (client.current) {
        client.current.removeAllListeners();
      }
    };
  }, [isOpenVideoCall, client.current])


  // Listen for call start/end events in real-time
  useEffect(() => {
      const groupId = document?.document?.id;
      socket.on("call-started", (id) => {
        if (id === groupId) setCallOngoing(true);
      });
  
      socket.on("call-ended", (id) => {
        if (id === groupId) setCallOngoing(false);
      });
  
      return () => {
        socket.off("call-started");
        socket.off("call-ended");
      };
  }, [document?.document?.id]);

  const onCloseVideoCall = () => {
    if(users.length === 0) {
      endCall();
      const groupId = document?.document?.id;
      socket.emit("end-call", groupId);
      console.log(users.length);
    } else {
      endCall();
    }

  };

  return (
    <>
      <Modal onClose={onCloseVideoCall} size='full' isOpen={isOpenVideoCall} onOpenChange={onOpenChangeVideoCall} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-extrabold bg-slate-50 font-sans text-2xl flex justify-center">Video Call</ModalHeader>
              <ModalBody className='bg-slate-50 overflow-y'>
                <div  
                className="flex justify-center items-center flex-wrap sm:gap-1"
                >
                {users.map((user, index) => (
                    <video
                      key={index}
                      id={`remote-video-${user.uid}`}
                      className={`
                        ${users.length >= 5 && "w-40 sm:w-52 xl:w-[320px] h-32 xl:h-[220px] sm:h-48"}
                        ${users.length == 2 && "w-60 h-32 md:w-52 md:h-80 xl:w-[400px] xl:h-[450px]"}
                        ${users.length == 3 && "w-40 h-48 md:w-80 xl:w-[300px] xl:h-[400px]"}
                        ${users.length == 4 && "w-40 sm:w-52 xl:w-[320px] h-32 xl:h-[220px] sm:h-48"}
                        ${users.length == 1 && "w-60 h-48 md:w-80 md:h-96 xl:w-[550px] xl:h-[450px]"}
                        md:rounded-lg border object-fit border-purple-600`}
                    ></video>
                  ))}
                    <video
                      ref={localVideo}
                      autoPlay
                      playsInline
                      className={`
                        ${users.length >= 5 && "w-40 sm:w-52 xl:w-[320px] h-32 xl:h-[220px] sm:h-48"}
                        ${users.length == 2 && "w-60 h-32 md:w-52 md:h-80 xl:w-[400px] xl:h-[450px]"}
                        ${users.length == 3 && "w-40 h-48 md:w-80 xl:w-[300px] xl:h-[400px]"}
                        ${users.length == 4 && "w-40 sm:w-52 xl:w-[320px] h-32 xl:h-[220px] sm:h-48"}
                        ${users.length == 1 && "w-60 h-48 md:w-80 md:h-96 xl:w-[550px] xl:h-[450px]"}
                        md:rounded-lg border object-fit border-red-600`}
                    ></video>
                  </div>
                
              </ModalBody>
              <ModalFooter className='flex justify-center bg-slate-50 fixed bottom-0 w-full'>
                <div onClick={() => { onCloseVideoCall(); onClose(); }} className='bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-500'><MdCallEnd className='text-white' size={40} /></div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default VideoCallModal