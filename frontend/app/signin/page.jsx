'use client'
import React, { useRef, useState } from 'react'
import { SiGoogledocs } from 'react-icons/si'
import { Button, Input } from "@heroui/react"
import Link from 'next/link'
import {EyeFilledIcon} from "../components/Others/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/Others/EyeSlashFilledIcon";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { googleLogin, loginUser } from '../slices/authSlice'
import { useRouter } from 'next/navigation'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import { FaGoogle } from 'react-icons/fa'
import axios from 'axios'


const SignIn = () => {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const {loading, googleLoading} = useSelector(state => state.auth)



    const handleLogin = async (e) => {
      e.preventDefault();

      // Input Validation 
      const emailRegex = /.+\@.+\..+/;
      if(emailRef.current?.value == "" && passwordRef.current?.value == "") {
        return toast.error("Please fill out the required fields")
      } else if(emailRegex.test(emailRef.current?.value) == false) {
        return toast.error("Please enter a valid email")
      } else if(passwordRef.current?.value.length < 8) {
        return toast.error("Password must be 8 character")
      } else if(emailRef.current?.value == "") {
        return toast.error("Please enter your email")
      } else if(passwordRef.current?.value == "") {
        return toast.error("Please enter your password")
      }

      const user = {
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || ""
      }
      
      try{
        const registeredUser = await dispatch(loginUser(user)).unwrap();
        if(registeredUser.email) {
          router.push("/")
          emailRef.current.value = "";
          passwordRef.current.value = "";
        }
      } catch(error) {
        return toast.error("Something went wrong")
      }

    }


    const handleGoogleLogin = async () => {
      try{
        const user = await dispatch(googleLogin()).unwrap();
        console.log(user)
        const saveUser = {
            uid: user?.uid,
            name: user?.displayName,
            email: user?.email,
            profilePicture: user?.photoURL
        }
        if(user.email) {
          console.log("inside clicking!")
          router.push("/");
          await axios.post(`${process.env.NEXT_PUBLIC_user_service}/api/users`, saveUser);
        }
      } catch(error) {
        toast.error("Something went wrong");
        console.log(error)
      }
    }


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
            Don&apos;t have any account? <Link className='text-purple-500' href="/register">Create</Link>
         </p>
        </div>
        <div className='w-full space-y-6 mt-14'>
         <Input ref={emailRef} variant='bordered' size="lg" type="email" placeholder="Email" />
         <Input 
         ref={passwordRef}
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
         <div className='flex space-x-4 justify-end'>
         <Button onClick={handleGoogleLogin} className='bg-purple-500 text-white font-bold' isDisabled={googleLoading || loading} >
         {
         googleLoading ?
         <CgSpinnerTwoAlt className='mx-auto animate-spin text-2xl' /> :
         <FaGoogle size={17} />
          }
          </Button>
         <Button isDisabled={googleLoading || loading} onClick={handleLogin} className='bg-purple-500 text-white font-bold justify-end'>
          {
          loading ?
          <CgSpinnerTwoAlt className='mx-auto animate-spin text-2xl' /> :
          "Log in"
          }
          </Button>
         </div>
        </div>
    </div>
    </section>
  )
}

export default SignIn