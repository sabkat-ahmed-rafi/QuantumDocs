import { User } from '@heroui/react'
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";



const PeopleWithAccess = ({document, handlePeopleWhoHaveAccessRole, handleDeleteAccess}) => {
    
    const [clickedUserId, setClickedUserId] = useState(null);

    const toggleClick = (userId) => {
      setClickedUserId(prevId => (prevId === userId ? null : userId));
    };


  return (
    <>
            <section className='overflow-y-auto scrollbar-hide'>
                  {/* Owner */}
                <div className='flex justify-between items-center hover:bg-slate-100 py-2 hover:px-2 transition-all rounded-md'>
                <User
                  avatarProps={{
                    src: `${document?.document?.owner?.photo}`,
                  }}
                  description={`${document?.document?.owner?.email}`}
                  name={`${document?.document?.owner?.name}`}
                  />      
                  <p className='text-slate-400 text-sm'>Owner</p>       
                </div>
                  {/* Other User */}
                {
                 document && [...document?.document?.sharedPersons]?.reverse()?.map(user => <div
                    key={user._id}    
                    className='flex justify-between items-center py-2 rounded-md transition-all'>
                    <section 
                      className='flex justify-center items-center space-x-2 relative'
                      onClick={() => toggleClick(user._id)} 
                      onTouchStart={() => toggleClick(user._id)}
                    >
                    {
                        clickedUserId === user._id && <button                
                        onClick={() => handleDeleteAccess(user.email)}
                        className='animate__animated animate__fadeInRight hover:bg-slate-200 p-2 rounded-full cursor-pointer transition-all'
                        >
                         <MdDelete className='text-lg' />
                        </button>
                    }
                    <User
                    className='transition-all ease-soft-spring'
                      avatarProps={{
                        src: `${user.photo}`,
                      }}
                      description={`${user.email}`}
                      name={`${user.name}`}
                      />
                    </section>      
                    <select 
                     className='hover:bg-slate-100 transition-all p-2 rounded-md focus:outline-none cursor-pointer relative focus:translate-y-[-50%]' 
                     value={user.role} 
                     onChange={(e) => handlePeopleWhoHaveAccessRole(e, user.email)}
                    >
                      <option className='bg-white py-2' value="Viewer">Viewer</option>
                      <option className='bg-white' value="Editor">Editor</option>
                    </select>
                    </div>)
                }
            </section>
    </>
  )
}

export default PeopleWithAccess