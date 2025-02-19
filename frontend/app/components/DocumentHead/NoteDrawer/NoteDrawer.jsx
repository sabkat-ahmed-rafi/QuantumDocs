import React, { useRef, useState } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Textarea
  } from "@heroui/react";
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';

const NoteDrawer = ({isOpenNote, onOpenNoteChange, document, user}) => {

  const [clicked, setClicked] = useState(false);
  const noteRef = useRef(null);
 
  const toggleClick = () => {
    setClicked(!clicked);
  }

  const handleAddNewNote = async () => {
    const documentId = document?.document?.id;
    const value = noteRef.current?.value
    const name = user?.displayName
    const noteData = {documentId, value, name};
    try {
      const result = await axios.post(`${process.env.NEXT_PUBLIC_document_service}/api/note`, { noteData });
      if(result.data.addNote.success) {
        console.log('I need to fetch data here.')
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error)
    }
  }

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
                  <p onClick={() => toggleClick()} className='bg-purple-500 text-white p-2 rounded-lg font-semibold'>
                    Click the close button or action button to close the drawer. Clicking outside or pressing the escape key won&apos;t close it.
                  </p>
                  <p className='text-sm text-slate-500'>Noted by sabkat ahmed rafi</p>
                  <p className='text-sm text-slate-400'>12:30 - 30 september</p>
                  {
                    clicked && <button                
                    className='animate__animated animate__fadeInDown hover:bg-slate-200 p-2 rounded-full cursor-pointer transition-all'
                    >
                      <MdDelete className='text-lg' />
                    </button>
                  }
                </div>
              </DrawerBody>
              <hr />
              <DrawerFooter className='flex-col'>
                <div className='mb-2'>
                  <Textarea ref={noteRef} className='text-black' variant="bordered" size='sm' label="Note" type="text" />
                </div>
                <div className='flex justify-end space-x-3'>
                  <Button color="secondary" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="secondary" onPress={() => handleAddNewNote()}>
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