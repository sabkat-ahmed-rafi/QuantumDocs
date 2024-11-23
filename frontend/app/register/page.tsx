'use client'
import React, { useState } from 'react'
import { SiGoogledocs } from 'react-icons/si'
import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import {EyeFilledIcon} from "../components/Others/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/Others/EyeSlashFilledIcon";


const Register = () => {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <section>
    <div className='border p-10 mx-44 my-24 flex justify-between rounded-[15px] shadow-lg shadow-purple-600'>
        <div className='w-full flex flex-col justify-between'>
         <div className='space-y-4'>
         <SiGoogledocs size={45} className="text-purple-500 " />
         <h1 className='text-4xl font-sans'>Create a Quantum Account</h1>
         <p className='font-semibold font-sans'>Enter your credentials</p>
         </div>
         <p className='italic'>
            Already have an account? <Link className='text-purple-500' href="/signin">Login</Link>
         </p>
        </div>
        <div className='w-full space-y-6 mt-14'>
         <Input variant='bordered' size="lg" type="name" placeholder="Name" />
         <Input variant='bordered' size="lg" type="email" placeholder="Email" />
         <Input 
         variant='bordered' 
         size="lg" 
         type={isVisible ? "text" : "password"} 
         placeholder="Password"
         endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
           />
         <div className='flex justify-end'>
         <Button className='bg-purple-500 text-white font-bold justify-end'>Sign up</Button>
         </div>
        </div>
    </div>
    </section>
  )
}

export default Register