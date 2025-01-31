import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
  } from "@heroui/react";

const NoteDrawer = ({isOpenNote, onOpenNoteChange}) => {
  return (
    <>
    <Drawer
        size='xs'
        placement='left'
        isKeyboardDismissDisabled={true}
        isOpen={isOpenNote}
        onOpenChange={onOpenNoteChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Non Dismissable Drawer</DrawerHeader>
              <DrawerBody className='text-black'>
                <p>
                  Click the close button or action button to close the drawer. Clicking outside or
                  pressing the escape key won&apos;t close it.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
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

export default NoteDrawer