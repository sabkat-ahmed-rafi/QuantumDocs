import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { MdCallEnd } from "react-icons/md";
import socket from '@/app/utils/socket';
import AgoraRTC, {
  LocalUser, // Plays the microphone audio track and the camera video track
  RemoteUser, // Plays the remote user audio and video tracks
  useIsConnected, // Returns whether the SDK is connected to Agora's server
  useJoin, // Automatically join and leave a channel on mount and unmount
  useLocalMicrophoneTrack, // Create a local microphone audio track
  useLocalCameraTrack, // Create a local camera video track
  usePublish, // Publish the local tracks
  useRemoteUsers, // Retrieve the list of remote users
} from "agora-rtc-react";





const VideoCallModal = ({ isOpenVideoCall, onOpenChangeVideoCall, document, setCallOngoing, calling, setCalling }) => {


  const [appId, setAppId] = useState(process.env.NEXT_PUBLIC_agora_appId);
  const [channel, setChannel] = useState(document?.document?.id);
  const isConnected = useIsConnected();
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  
  useJoin({ appid: appId, channel: channel, token: null }, calling);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  useEffect(() => {
    if(!micOn && !cameraOn) {
      setMic(true);
      setCamera(true);
    }
  }, [micOn, cameraOn])
  
  const remoteUsers = useRemoteUsers();



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
  
  const onCloseVideoCall = async (onClose) => {
    try {
      
      setCalling(false);
      
      if (remoteUsers.length === 0) {
        const groupId = document?.document?.id;
        socket.emit("end-call", groupId);
      }

      onClose();

    } catch (err) {
      console.error("Error during call cleanup:", err);
    }

  };

  return (
    <>
      <Modal size='full' isOpen={isOpenVideoCall} onOpenChange={onOpenChangeVideoCall} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-extrabold bg-slate-50 font-sans text-2xl flex justify-center">Video Call</ModalHeader>
              <ModalBody className='bg-slate-50 overflow-y'>
                {
                  isConnected && <div  
                  className="flex justify-center items-center flex-wrap sm:gap-1"
                  >
                  {remoteUsers.map((user, index) => (
                      <div
                      className={`
                        ${remoteUsers.length >= 5 && "w-40 sm:w-52 xl:w-[320px] h-32 xl:h-[220px] sm:h-48"}
                        ${remoteUsers.length == 2 && "w-60 h-32 md:w-52 md:h-80 xl:w-[350px] xl:h-[450px]"}
                        ${remoteUsers.length == 3 && "w-40 h-48 md:w-72 md:h-40 xl:w-[300px] xl:h-[400px]"}
                        ${remoteUsers.length == 4 && "w-40 sm:w-52 xl:w-[320px] h-32 xl:h-[220px] sm:h-48"}
                        ${remoteUsers.length == 1 && "w-60 h-48 md:w-80 md:h-[320px] xl:w-[550px] xl:h-[450px]"}
                        ${remoteUsers.length == 0 && "w-60 h-48 md:w-80 md:h-96 xl:w-[550px]"} md:rounded-lg border object-fit border-purple-600`}
                      >
                        <RemoteUser
                        user={user}
                        key={index}
                        style={{borderRadius: "8px"}}

                      ></RemoteUser>
                      </div>
                    ))}
                      <div
                      className={`
                        ${remoteUsers.length >= 5 && "w-40 sm:w-52 xl:w-[320px] h-32 xl:h-[220px] sm:h-48"}
                        ${remoteUsers.length == 2 && "w-60 h-32 md:w-52 md:h-80 xl:w-[350px] xl:h-[450px]"}
                        ${remoteUsers.length == 3 && "w-40 h-48 md:w-72 md:h-40 xl:w-[300px] xl:h-[400px]"}
                        ${remoteUsers.length == 4 && "w-40 sm:w-52 xl:w-[320px] h-32 xl:h-[220px] sm:h-48"}
                        ${remoteUsers.length == 1 && "w-60 h-48 md:w-80 md:h-[320px] xl:w-[550px] xl:h-[450px]"}
                        ${remoteUsers.length == 0 && "w-60 h-48 md:w-80 md:h-96 xl:w-[550px]"} md:rounded-lg border object-fit border-red-600`}
                      >
                      <LocalUser
                        audioTrack={localMicrophoneTrack}
                        videoTrack={localCameraTrack}
                        cameraOn={cameraOn}
                        micOn={micOn}
                        playAudio={false}
                        style={{borderRadius: "8px"}}
                        >
                        <samp>You</samp>
                      </LocalUser>
                      </div>
                  </div>
                }                
              </ModalBody>
              <ModalFooter className='flex justify-center bg-slate-50 fixed bottom-0 w-full'>
                <div onClick={ () => { onCloseVideoCall(onClose); }} className='bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-500'><MdCallEnd className='text-white' size={40} /></div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default VideoCallModal