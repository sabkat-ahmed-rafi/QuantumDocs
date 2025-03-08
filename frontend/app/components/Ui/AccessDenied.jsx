import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react'
import { RiUserForbidFill } from "react-icons/ri";

const AccessDenied = () => {
  return (
    <>
      <section className='h-screen flex flex-col justify-center items-center'>
        <RiUserForbidFill size={250} className='text-purple-600 animate-appearance-in' />
        <h1 className='text-3xl font-extrabold pb-5'>Access Denied</h1>
        <p className='pb-5 font-serif text-slate-600 font-semibold'>You do not have permission to view this document</p>
        <Link href={"/"}><Button className='font-sans font-semibold' color='secondary' variant='shadow'>← Go Back</Button></Link>
      </section>
    </>
  )
}

export default AccessDenied