'use client'
import React, { useRef, useState } from 'react'
import { SiGoogledocs } from 'react-icons/si'
import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import {EyeFilledIcon} from "../components/Others/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/Others/EyeSlashFilledIcon";
import { createUser, updateUser } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import axios from 'axios'



const Register = () => {
  
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.auth);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const router = useRouter();
    

    const handleCreateUser = async (e) => {
      e.preventDefault();
      
      // Inputs validations 
      const emailRegex = /.+\@.+\..+/;
      if(nameRef.current?.value == "" && emailRef.current?.value == "" && passwordRef.current?.value == "") {
        return toast.error("Please fill out the required fields")
      } else if(nameRef.current?.value == "") {
        return toast.error("Please enter your name");
      } else if(emailRef.current?.value == "") {
        return toast.error("Please enter your email");
      } else if(passwordRef.current?.value == "") {
        return toast.error("Please enter your password");
      } else if(emailRegex.test(emailRef.current?.value) == false) {
        return toast.error("Please enter a valid email")
      } else if(passwordRef.current?.value.length < 8) {
        return toast.error("Password must be 8 character")
      }
      
      const newUser = {
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || "",
      }
      const name = nameRef.current?.value || ""
      

      try{
        const user = await dispatch(createUser(newUser)).unwrap();
        if(user.email) {
          const updatedUser = await dispatch(updateUser({ name })).unwrap();
          nameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          const user = {
            uid: updatedUser?.uid,
            name: updatedUser?.displayName,
            email: updatedUser?.email,
            password: newUser?.password,
            profilePicture: '/images/profilePicture.jpg'
          }
          if(updatedUser.email) {
            await axios.post(`${process.env.NEXT_PUBLIC_user_service}/api/users`, user);
            router.push("/");
            console.log(updatedUser)
          }
        }
      } catch(error) {
         if(error.message = "Firebase: Error (auth/email-already-in-use)"){
          return toast.error("The Email is already in use")
         } else {
          return toast.error("Something went wrong")
         }
      }

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
         <Input ref={emailRef} name='email' variant='bordered' size="lg" placeholder="Email" />
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
         <Button type='submit' className='bg-purple-500 text-white font-bold justify-end'>{
          loading ?
          <CgSpinnerTwoAlt className='mx-auto animate-spin text-2xl' /> :
          "Sign up"
          }</Button>
         </div>
        </form>
    </div>
    </section>
  )
}

export default Register