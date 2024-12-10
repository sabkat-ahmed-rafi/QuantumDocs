import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";


export const axiosSecure = axios.create({
    baseURL: process.env.NEXT_PUBLIC_user_service,
    withCredentials: true,
});


const useAxiosSecure = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const interceptorRef = useRef(null);
    const toastShownRef = useRef(false); 

    useEffect(() => {
        if(!interceptorRef.current) {
            interceptorRef.current = axiosSecure.interceptors.response.use(
                (response) => response,
                async (error) => {
                    const status = error.response?.status;
                    const message = error.response?.data?.error || "Unknown Error";
    
                    if(status == 401 && message == "sessionExpired") {
                        if (!toastShownRef.current) {
                            toastShownRef.current = true;
                            toast.error("Your session has expired. Please log back in to continue.");
                            await dispatch(logout()).unwrap();
                            router.push("/signin");
                            setTimeout(() => {
                                toastShownRef.current = false;
                            }, 3000); 
                        }
                    } else if (status == 403) {
                        console.log("Access denied");
                    }
                    return Promise.reject(error);
                }
            );
        }

        return () => {
            if(interceptorRef.current !== null) {
                axiosSecure.interceptors.response.eject(interceptorRef.current);
                interceptorRef.current = null;
            }
        }

    }, [router]);

    return axiosSecure;
}

export default useAxiosSecure