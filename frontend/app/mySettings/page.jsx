'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import ProfileUpdateDrawer from "../components/UI/ProfileUpdateDrawer";
import { FaRegEdit } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";


const page = () => {

    const [image, setImage] = useState(null);
    const {user: userFromState} = useSelector(state => state.auth);
    const [user, setUser] = useState({})
    const {isOpen: isOpenProfile, onOpen: onOpenProfile, onOpenChange: onOpenChangeProfile} = useDisclosure();
    const axiosSecure = useAxiosSecure();
    
    

    useEffect(() => {
      fetchUser();
    }, [userFromState?.uid])

    const fetchUser = async () => {
      try{
        const result = await axiosSecure.get(`/api/users/${userFromState?.uid}`);
        setUser(result?.data?.user);
      }catch(error) {
        if(error.status != 401) {
          toast.error("Something went wrong");
        }
      }
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
      }
      
    };
    console.log(user);

  return (
    <>
      <section className='h-screen font-sans py-5 px-5'>
        <div className="flex flex-col items-center justify-center">
          <div>
            <div className="p-4">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
                      <img
                        src={image || user?.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full border-4 border-gray-300"
                      />
                  </div>
            </div>
          </div>
        </div>
        <Tooltip placement="left" className="bg-slate-700 text-slate-200" content={"Profile Settings"}>
          <Button className="rounded-full absolute top-5 right-5 bg-white shadow-lg" onPress={onOpenProfile}>
            <FaRegEdit size={20} />
          </Button>
        </Tooltip>
      </section> 
      <ProfileUpdateDrawer isOpenProfile={isOpenProfile} onOpenChangeProfile={onOpenChangeProfile} image={image} handleImageUpload={handleImageUpload} user={user} />
    </>
  )
}

export default page