'use client'
import React, { useRef, useState } from 'react'
import { SiGoogledocs } from 'react-icons/si'
import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import {EyeFilledIcon} from "../components/Others/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/Others/EyeSlashFilledIcon";
import { createUser, updateUser } from '../slices/authSlice'
import { useDispatch } from 'react-redux'


const Register = () => {
  
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const dispatch = useDispatch();
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    

    const handleCreateUser = async (e) => {
   
    }

  return (
    <section className='text-black bg-white'>
    <div className='md:border p-10 lg:mx-44 md:mx-20 lg:my-24 md:my-10 md:flex justify-between md:rounded-[15px] md:shadow-lg md:shadow-purple-600'>
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
        <form onSubmit={handleCreateUser} className='w-full space-y-6 mt-14'>
         <Input ref={nameRef} name='name' variant='bordered' size="lg" type="name" placeholder="Name" />
         <Input ref={emailRef} name='email' variant='bordered' size="lg" type="email" placeholder="Email" />
         <Input 
         ref={passwordRef}
         name='password'
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
         <Button type='submit' className='bg-purple-500 text-white font-bold justify-end'>Sign up</Button>
         </div>
        </form>
    </div>
    </section>
  )
}

export default Register