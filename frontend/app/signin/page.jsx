'use client'
import React, { useState } from 'react'
import { SiGoogledocs } from 'react-icons/si'
import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import {EyeFilledIcon} from "../components/Others/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/Others/EyeSlashFilledIcon";


const SignIn = () => {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <section className='text-black bg-white'>
    <div className='md:border p-10 lg:mx-60 md:mx-20 lg:my-24 md:my-10 md:flex justify-between md:rounded-[15px] md:shadow-lg md:shadow-purple-600'>
        <div className='w-full flex flex-col justify-between'>
         <div className='space-y-4'>
         <SiGoogledocs size={45} className="text-purple-500 " />
         <h1 className='text-4xl font-sans'>Sign in</h1>
         <p className='font-semibold font-sans'>Use your Quantum Account</p>
         </div>
         <p className='italic'>
            Don't have any account? <Link className='text-purple-500' href="/register">Create</Link>
         </p>
        </div>
        <div className='w-full space-y-6 mt-14'>
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
         <Button className='bg-purple-500 text-white font-bold justify-end'>Log in</Button>
         </div>
        </div>
    </div>
    </section>
  )
}

export default SignIn