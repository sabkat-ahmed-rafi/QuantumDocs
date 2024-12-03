import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux'
import { lineSpinner } from 'ldrs'



const PrivateRoute = ({children}) => {
    
    const {user, loading} = useSelector();
    const router = useRouter();
    lineSpinner.register()

    if(loading) {
        return (
            <div className="flex items-center justify-center h-screen">
              <l-line-spinner
                size="40"
                stroke="3"
                speed="1" 
                color="black" 
              ></l-line-spinner>
            </div>
        )
    }

    if(!user) {
        router.push("/signin")
        return null;
    }

    return <>{children}</>
}

export default PrivateRoute