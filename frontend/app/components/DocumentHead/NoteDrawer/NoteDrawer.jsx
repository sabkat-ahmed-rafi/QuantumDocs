import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Input
  } from "@heroui/react";

const NoteDrawer = ({isOpenNote, onOpenNoteChange, document}) => {
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
              <DrawerHeader className="flex flex-col gap-1 text-black font-extrabold">Team Notes</DrawerHeader>
              <hr />
              <DrawerBody className='text-black'>
                <div className='text-center mb-1'>
                  <p className='bg-purple-500 text-white p-2 rounded-lg font-semibold'>
                     Click the close button or action button to close the drawer. Clicking outside or pressing the escape key won&apos;t close it.
                  </p>
                  <p className='text-sm text-slate-400'>12:30 - 30 september</p>
                </div>
              </DrawerBody>
              <hr />
              <DrawerFooter className='flex-col'>
                <div className='mb-2'>
                  <Input variant="bordered" size='sm' label="Note" type="text" />
                </div>
                <div className='flex justify-end space-x-3'>
                  <Button color="secondary" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="secondary" onPress={onClose}>
                  Add New Note
                  </Button>  
                  </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
    </Drawer>
    </>
  )
}

export default NoteDrawer