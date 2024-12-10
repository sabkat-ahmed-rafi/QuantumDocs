import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                const message = error.response?.data?.error || "Unknown Error";

                if(status == 401 && message == "sessionExpired") {
                   await dispatch(logout()).unwrap();
                   router.push("/signin");
                   toast.error("Your session has expired. Please log back in to continue.")
                } else if (status == 403) {
                    toast.error("Access denied")
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.response.eject(interceptor)
        }

    }, [router, dispatch]);

    return axiosSecure;
}

export default useAxiosSecure