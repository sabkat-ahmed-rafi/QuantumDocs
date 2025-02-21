import React, { useCallback, useEffect, useRef, useState } from 'react'
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

  const [clickedUserId, setClickedUserId] = useState(null);
  const [notes, setNotes] = useState([])
  const [noteValue, setNoteValue] = useState('');
  const notesContainerRef = useRef(null);
 
  const toggleClick = (userId) => {
    setClickedUserId(prevId => (prevId === userId ? null : userId));
  }

  const handleAddNewNote = async () => {
    
    if (!noteValue.trim()) return;

    const documentId = document?.document?.id;
    const value = noteValue.trim();
    const name = user?.displayName
    const noteData = {documentId, value, name};

    try {
      const result = await axios.post(`${process.env.NEXT_PUBLIC_document_service}/api/note`, { noteData });
      if(result.data.addNote.success) {
        fetchNotes();
        setNoteValue('');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error)
    }
  }

  const fetchNotes = useCallback(async () => {
    const documentId = document?.document?.id;
    if (!documentId) return;
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_document_service}/api/note/${documentId}`);
      setNotes(result?.data?.getNote?.notes?.notes || []);
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [document?.document?.id])

  const handleDelete = async (noteId) => {
    try {
      const result = await axios.delete(`${process.env.NEXT_PUBLIC_document_service}/api/note/${noteId}`, {data: { documentId: document?.document?.id}});
      if(result.data.deleteNote.success) {
        fetchNotes();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    
    const time = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });

    return `${time} - ${day} ${month}`;
  };

  useEffect(() => {
    if (document?.document?.id) {
      fetchNotes();
    }
  }, [document?.document?.id])

  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight;
    }
  }, [notes]);

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
              <DrawerBody ref={notesContainerRef} className='text-black'>
                {notes.length == 0 &&  <h1 className='h-screen flex items-center justify-center text-xl font-mono font-bold text-slate-400'>No Notes</h1>}
                {
                  notes.map(note => <div 
                    key={note._id}
                    className='text-center mb-1'>
                    <p onClick={() => toggleClick(note._id)} className='bg-purple-500 text-white p-2 rounded-lg font-semibold'>
                      {note.value}
                    </p>
                    <p className='text-sm text-slate-500'>Noted by {note.name}</p>
                    <p className='text-sm text-slate-400'>{formatDate(note.createdAt)}</p>
                    {
                      clickedUserId === note._id && <button 
                      onClick={() => handleDelete(note._id)}               
                      className='animate__animated animate__fadeInDown hover:bg-slate-200 p-2 rounded-full cursor-pointer transition-all'
                      >
                        <MdDelete className='text-lg' />
                      </button>
                    }
                  </div>)
                }
              </DrawerBody>
              <hr />
              <DrawerFooter className='flex-col'>
                <div className='mb-2'>
                  <Textarea   
                   value={noteValue} 
                   onChange={(e) => setNoteValue(e.target.value)} 
                   className='text-black' variant="bordered" size='sm' label="Note" type="text" />
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