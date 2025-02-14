import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import IsRestricted from '../../UI/IsRestricted';
import NotRestricted from '../../UI/NotRestricted';
import PeopleWithAccess from '../../UI/PeopleWithAccess';
import { MdOutlineContentCopy } from "react-icons/md";
import 'animate.css';



const ShareModal = ({isOpenShareModal, onOpenChangeShareModal, document}) => {

  const [peopleWhoHaveAccessRole, peopleWhoHaveAccessRoleSet] = useState("Viewer");
  const [universalAccessRole, setUniversalAccessRole] = useState("Viewer");
  const [isRestricted, setIsRestricted] = useState(false);
  
  const handlePeopleWhoHaveAccessRole = (e, userUid) => {
    // peopleWhoHaveAccessRoleSet(e.target.value);
    console.log(e.target.value, userUid)
  };

  const handleUniversalRole = (e) => {
    setUniversalAccessRole(e.target.value);
  };

  const handleIsRestricted = (e) => {
    if(e.target.value == "Restricted") {
      setIsRestricted(true);
    } else if(e.target.value == "Anyone with the link") {
      setIsRestricted(false);
    }
  };

  const handleDeleteAccess = (e, userUid) => {
    console.log("Deleting this users Access")
  };
  
console.log(isRestricted)
  
  return (
    <Modal radius='sm' size='lg' isOpen={isOpenShareModal} onOpenChange={onOpenChangeShareModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black text-2xl font-medium">Share "{document.document.title}"</ModalHeader>
              <ModalBody className='text-black max-h-[405px]'>
                <div>
                  <Input 
                  variant="bordered"
                  radius='sm'
                  label="Add people"
                  className='border-black'
                   />
                </div>
                <p className='font-semibold'>People with access</p>
                    <PeopleWithAccess 
                    document={document} 
                    peopleWhoHaveAccessRole={peopleWhoHaveAccessRole}
                    handlePeopleWhoHaveAccessRole={handlePeopleWhoHaveAccessRole}
                    handleDeleteAccess={handleDeleteAccess}
                    />
                <p className='font-semibold'>General access</p>
                {
                  isRestricted ? 
                  <IsRestricted 
                   isRestricted={isRestricted}
                   handleIsRestricted={handleIsRestricted}
                   /> : 
                  <NotRestricted 
                  isRestricted={isRestricted}
                  universalAccessRole={universalAccessRole}
                  handleIsRestricted={handleIsRestricted}
                  handleUniversalRole={handleUniversalRole}
                  /> 
                }
              </ModalBody>
              <ModalFooter className='flex justify-between'>
                <Button radius='full' variant="bordered" className='text-black animate__animated animate__bounceIn'>
                  <MdOutlineContentCopy /> Copy link
                </Button>
                <Button radius='full' color="secondary" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}

export default ShareModal