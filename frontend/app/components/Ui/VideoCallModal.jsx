import React, { useState } from 'react'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { MdCallEnd } from "react-icons/md";


const VideoCallModal = ({ isOpenVideoCall, onOpenChangeVideoCall }) => {

  const [users, setUsers] = useState(["User 1", "User 4", "User 3", "User 2", "User 5"]);


  return (
    <>
      <Modal size='full' isOpen={isOpenVideoCall} onOpenChange={onOpenChangeVideoCall} >
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
                      controls
                      className={`
                        ${users.length >= 5 && "w-40 sm:w-52 xl:w-[320px] h-32 xl:h-[220px] sm:h-48"}
                        ${users.length == 2 && "w-60 h-48 md:w-80 md:h-96 xl:w-[550px] xl:h-[600px]"}
                        ${users.length == 3 && "w-60 h-32 md:w-52 md:h-80 xl:w-[450px] xl:h-[600px]"}
                        ${users.length == 4 && "w-40 h-48 md:w-80 xl:w-[550px] xl:h-[300px]"}
                        ${users.length == 1 && "h-96 w-60 xl:w-[500px] xl:h-[600px]"}
                        md:rounded-lg border object-fit border-purple-600`}
                    ></video>
                  ))}
                  </div>
                
              </ModalBody>
              <ModalFooter className='flex justify-center bg-slate-50 fixed bottom-0 w-full'>
                <div className='bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-500'><MdCallEnd className='text-white' size={40} /></div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default VideoCallModal