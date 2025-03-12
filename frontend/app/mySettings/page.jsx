'use client'
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import ProfileUpdateDrawer from "../components/UI/ProfileUpdateDrawer";
import { FaRegEdit } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import uploadCloudinary from "../utils/uploadCloudinary";
import { toast } from "react-toastify";


const page = () => {

    const [image, setImage] = useState(null);
    const uploadImageRef = useRef(null);
    const {user: userFromState} = useSelector(state => state.auth);
    const [user, setUser] = useState({})
    const {isOpen: isOpenProfile, onOpen: onOpenProfile, onOpenChange: onOpenChangeProfile} = useDisclosure();
    const axiosSecure = useAxiosSecure();
    const formRef = useRef(null);
    
    

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
        uploadImageRef.current = file;
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
      }
      
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      let imageUrl;
      
      
      if(uploadImageRef.current) {
        imageUrl = await uploadCloudinary(uploadImageRef.current);
      };
      
      if(imageUrl) {
        data.profilePicture = imageUrl;
      };
      
      try {
        const result = await axiosSecure.patch(`/updateProfile`, data);
        console.log(result)
      } catch (error) {
        toast.error("Something went wrong")
      }
      
    }

    console.log(user);

  return (
    <>
      <section className='h-screen font-sans py-5 px-5'>
        <div className="flex flex-col items-center justify-center">
            <div className="p-4">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
                      <img
                        src={user?.profilePicture || "/images/profilePicture.jpg"}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full border-4 border-gray-300"
                      />
                  </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <h1 className="text-2xl font-semibold">{user?.name}</h1>
              <p className="w-96 text-center text-slate-600">
                { user?.bio == "" ? "Go profile settings write something about yourself" : user?.bio }
              </p>
              <div className="flex space-x-10">
              {
                user?.socialLinks?.linkedin && <Link href={user?.socialLinks?.linkedin || "#"} target="_blank"><FaLinkedin className="text-[#0077B5]" size={50} /></Link>
              }
              {
                user?.socialLinks?.instagram && <Link href={user?.socialLinks?.instagram || "#"} target="_blank"><FaSquareInstagram className="text-[#E4405F]" size={50} /></Link>
              }
              {
                user?.socialLinks?.twitter && <Link href={user?.socialLinks?.twitter || "#"} target="_blank"><FaSquareXTwitter size={50} /></Link>
              }
              </div>
            </div>
        </div>
        <Tooltip placement="left" className="bg-slate-700 text-slate-200" content={"Profile Settings"}>
          <Button className="rounded-full absolute top-5 right-5 bg-white shadow-lg" onPress={onOpenProfile}>
            <FaRegEdit size={20} />
          </Button>
        </Tooltip>
      </section> 
      <ProfileUpdateDrawer isOpenProfile={isOpenProfile} onOpenChangeProfile={onOpenChangeProfile} image={image} handleImageUpload={handleImageUpload} user={user} formRef={formRef} handleSubmit={handleSubmit} />
    </>
  )
}

export default page