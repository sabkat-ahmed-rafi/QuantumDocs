'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { lineSpinner } from 'ldrs'



const PrivateRoute = ({children}) => {
    
    const {user, loading} = useSelector(state => state.auth);
    const router = useRouter();
    lineSpinner.register()
    
    useEffect(() => {
        if (!loading && !user) {
            router.push('/signin');
          }
    }, [loading, user, router]);


        if(loading) {  
            return (
                <div className="flex items-center justify-center h-screen text-black bg-white">
                  <l-line-spinner
                    size="40"
                    stroke="3"
                    speed="1" 
                    color="black" 
                  ></l-line-spinner>
                </div>
            )
        }

    
    
    if(user) return <>{children}</>

}

export default PrivateRoute