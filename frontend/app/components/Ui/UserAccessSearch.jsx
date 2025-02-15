import { User } from '@heroui/react'
import React from 'react'

const UserAccessSearch = ({users, handleGiveAccess}) => {



  return (
    <section 
    className={`${users?.length === 0 ? 'hidden': 'flex-col'} overflow-hidden bg-slate-100 absolute z-10 border md:w-[465px] w-[250px] animate_animated animate__bounceIn shadow-lg shadow-slate-400 rounded-lg`}>
        {
            users && users.map(user => <User
                key={user._id}
                onClick={() => handleGiveAccess(user._id)}
                avatarProps={{
                  src: `${user.profilePhoto}`,
                }}
                description={`${user.email}`}
                name={`${user.name}`}
                className='cursor-pointer p-2 border w-full hover:bg-slate-200 justify-start'
               />)
        }
    </section>
  )
}

export default UserAccessSearch