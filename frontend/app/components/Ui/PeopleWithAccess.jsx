import { User } from '@heroui/react'
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";



const PeopleWithAccess = ({document, peopleWhoHaveAccessRole, handlePeopleWhoHaveAccessRole, handleDeleteAccess}) => {
    
    const [isHovered, setIsHovered] = useState(false);

    const toggleHover = () => setIsHovered(!isHovered);

  return (
    <>
            <section className=' overflow-y-auto'>
                  {/* Owner */}
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
                  {/* Other User */}
                {
                 document && document?.document?.sharedPersons?.map(user => <div
                    key={user._id}
                    onClick={toggleHover} 
                    onTouchStart={toggleHover}                
                    className='flex justify-between items-center py-2 rounded-md transition-all'>
                    <section className='flex justify-center items-center space-x-2 relative overflow-hidden'>
                    {
                        isHovered && <button
                        
                        onClick={(e) =>{
                            e.stopPropagation();
                            handleDeleteAccess(e, user._id)}
                            }
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
                     defaultValue={peopleWhoHaveAccessRole} 
                     onChange={(e) => handlePeopleWhoHaveAccessRole(e, user)}
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