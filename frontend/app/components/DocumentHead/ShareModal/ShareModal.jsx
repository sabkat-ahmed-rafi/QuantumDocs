import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  User,
} from "@heroui/react";

const ShareModal = ({isOpenShareModal, onOpenChangeShareModal, document}) => {

  const [role, setRole] = useState("Viewer");

  return (
    <Modal radius='sm' size='xl' isOpen={isOpenShareModal} onOpenChange={onOpenChangeShareModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black text-2xl font-medium">Share "{document.document.title}"</ModalHeader>
              <ModalBody className='text-black'>
                <div>
                  <Input 
                  variant="bordered"
                  radius='sm'
                  label="Add people"
                  className='border-black'
                   />
                </div>
                <p className='font-semibold'>People with access</p>
                <div className='flex justify-between items-center hover:bg-slate-100 py-2 hover:px-2 transition-all rounded-md'>
                <User
                  avatarProps={{
                    src: `${document?.document?.owner?.photo}`,
                  }}
                  description={`${document?.document?.owner?.email}`}
                  name={`${document?.document?.owner?.name} (you)`}
                  />      
                  <p className='text-slate-400 text-sm'>Owner</p>       
                </div>
                <div className='flex justify-between items-center py-2 rounded-md'>
                <User
                  avatarProps={{
                    src: `${document?.document?.owner?.photo}`,
                  }}
                  description={`${document?.document?.owner?.email}`}
                  name={`${document?.document?.owner?.name}`}
                  />      
                <select className='hover:bg-slate-100 transition-all p-2 rounded-md focus:outline-none cursor-pointer relative focus:translate-y-[-50%]' defaultValue={role} onChange={(e) => setRole(e.target.value)}>
                  <option className='bg-white py-2' value="Viewer">Viewer</option>
                  <option className='bg-white' value="Editor">Editor</option>
                </select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}

export default ShareModal