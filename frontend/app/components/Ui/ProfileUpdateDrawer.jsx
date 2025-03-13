import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Input,
    Textarea,
  } from "@heroui/react";
import ProfileUpload from './ProfileUpload';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

const ProfileUpdateDrawer = ({ isOpenProfile, onOpenChangeProfile, image, handleImageUpload, user,handleSubmit, updateLoading }) => {
  return (
    <>
      <Drawer placement={'left'} isOpen={isOpenProfile} onOpenChange={onOpenChangeProfile}>
        <DrawerContent>
          {(onClose) => (
            <>
            <form onSubmit={(e) => {handleSubmit(e, onClose)}} >
              <DrawerHeader className="flex justify-center">Manage Profile</DrawerHeader>
              <DrawerBody>
                 <div className='flex justify-center '>
                  <ProfileUpload image={image} handleImageUpload={handleImageUpload} user={user} />
                 </div>
                 <Input variant='faded' name="name" label="Name" type="text" />
                 <Textarea maxLength={500} variant='faded' name="bio" label="Bio" type="text" />
                 <h5 className='font-sans font-semibold'>Social links</h5>
                 <Input variant='faded' name="linkedin" label="Linkedin" type="text" />
                 <Input variant='faded' name="instagram" label="Instagram" type="text" />
                 <Input variant='faded' name="twitter" label="Twitter" type="text" />
              </DrawerBody>
              <DrawerFooter>
                <Button className='hover:text-red-600 text-purple-600' color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button type='submit' color="secondary">
                  {
                  updateLoading ?
                   <CgSpinnerTwoAlt className='mx-auto animate-spin text-2xl' /> 
                   : 
                   "Apply Changes"
                  }
                </Button>
              </DrawerFooter>
            </form>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ProfileUpdateDrawer