import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
  } from "@heroui/react";
import ProfileUpload from './ProfileUpload';

const ProfileUpdateDrawer = ({ isOpenProfile, onOpenChangeProfile, image, handleImageUpload, user }) => {
  return (
    <>
      <Drawer placement={'left'} isOpen={isOpenProfile} onOpenChange={onOpenChangeProfile}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex justify-center">Manage Profile</DrawerHeader>
              <DrawerBody>
                 <div className='flex justify-center '>
                  <ProfileUpload image={image} handleImageUpload={handleImageUpload} user={user} />
                 </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ProfileUpdateDrawer