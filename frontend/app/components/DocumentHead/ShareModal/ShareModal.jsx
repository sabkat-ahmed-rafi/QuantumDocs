import React, { useEffect, useState } from 'react'
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
import UserAccessSearch from '../../UI/UserAccessSearch';
import { MdOutlineContentCopy } from "react-icons/md";
import 'animate.css';
import axios from 'axios'; 
import { toast } from 'react-toastify';



const ShareModal = ({isOpenShareModal, onOpenChangeShareModal, document, documentRefetch}) => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [universalAccessRole, setUniversalAccessRole] = useState("Viewer");
  const [isRestricted, setIsRestricted] = useState(false);
  
  const handlePeopleWhoHaveAccessRole = async (e, userEmail) => {
    const newRole = e.target.value;
    const documentId = document?.document?.id;
    console.log(newRole, userEmail, documentId);
    try {
      const result = await axios.patch(`${process.env.NEXT_PUBLIC_document_service}/api/document/giveAccess/giveAccessRole`, {newRole, userEmail, documentId})
      if(result.data.giveRole.message === "User role updated successfully") {
        toast.success(`User role updated to ${newRole}`);
        documentRefetch();
      } else if(result.data.giveRole.message == "Something went wrong") {
        toast.error(result.data.giveRole.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
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

  const handleDeleteAccess = async (userEmail) => {
    const documentId = document?.document?.id;
    console.log(documentId, userEmail)
    try {
      const result = await axios.delete(`${process.env.NEXT_PUBLIC_document_service}/api/document/giveAccess/removeAccess`, {documentId, userEmail})
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleGiveAccess = async (user) => {
    const documentId = document?.document?.id;
    const ownerEmail = document?.document?.owner?.email;

    if(ownerEmail === user?.email) {
      return toast.error(`This user is the document owner`);
    }

    try {
      const result = await axios.patch(`${process.env.NEXT_PUBLIC_document_service}/api/document/giveAccess`, {user, documentId})
      if(result.data.sharedAccess.message == 'User already has access') {
        toast.error(result.data.sharedAccess.message);
      } else if(result.data.sharedAccess.message == 'Access Denied') {
        toast.error(result.data.sharedAccess.message);
      } else if(result.data.sharedAccess.message == 'User granted access') {
        toast.success(result.data.sharedAccess.message);
        setUsers([]);
        setSearch("");
        documentRefetch();
      }
    } catch(error) { 
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  
  // Handleding searched users 
  useEffect( () => {

    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;

    if (search === "") {
      setUsers([]);
      return;
    };

    const fetchUser = async () => {
    try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_user_service}/api/users/search?search=${search}`,
          { signal }
        )
        setUsers(result?.data?.users);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.log(error);
      }
    }
  };
    fetchUser()
    return () => controller.abort()
  }, [search])

 
  
  return (
    <Modal radius='sm' size='lg' isOpen={isOpenShareModal} onOpenChange={onOpenChangeShareModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black text-2xl font-medium">Share "{document.document.title}"</ModalHeader>
              <ModalBody className='text-black max-h-[405px]'>
                <div>
                  <Input 
                  name='search'
                  type='search'
                  variant="bordered"
                  radius='sm'
                  label="Add people"
                  className='border-black'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                   />
                   <UserAccessSearch users={users} handleGiveAccess={handleGiveAccess} />
                </div>
                <p className='font-semibold'>People with access</p>
                    <PeopleWithAccess 
                    document={document} 
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