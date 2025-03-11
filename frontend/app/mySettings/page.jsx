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
      const fetchUser = async () => {
        try{
          const result = await axiosSecure.get(`/api/users/${userFromState?.uid}`);
          setUser(result?.data?.user);
        }catch(error) {
          if(error.status != 401) {
            toast.error("Something went wrong");
          }
        }
      } 
      fetchUser();
    }, [userFromState?.uid])

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
        </div>
        <Tooltip placement="left" className="bg-slate-700 text-slate-200" content={"Profile Settings"}>
          <Button className="rounded-full absolute right-5 bg-white shadow-lg" onPress={onOpenProfile}>
            <FaRegEdit size={20} />
          </Button>
        </Tooltip>
      </section> 
      <ProfileUpdateDrawer isOpenProfile={isOpenProfile} onOpenChangeProfile={onOpenChangeProfile} image={image} handleImageUpload={handleImageUpload} user={user} />
    </>
  )
}

export default page