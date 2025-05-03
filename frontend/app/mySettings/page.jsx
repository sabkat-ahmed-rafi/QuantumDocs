'use client'
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import ProfileUpdateDrawer from "../components/Ui/ProfileUpdateDrawer";
import { FaRegEdit } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import uploadCloudinary from "../utils/uploadCloudinary";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../slices/authSlice";
import isValidSocialLink from "../utils/isValidSocialLinks";


const Page = () => {

    const [image, setImage] = useState(null);
    const uploadImageRef = useRef(null);
    const {user: userFromState} = useSelector(state => state.auth);
    const [user, setUser] = useState({})
    const {isOpen: isOpenProfile, onOpen: onOpenProfile, onOpenChange: onOpenChangeProfile} = useDisclosure();
    const axiosSecure = useAxiosSecure();
    const [updateLoading, setUpdateLoading] = useState(false);
    const dispatch = useDispatch();
    
    

    useEffect(() => {
      if (userFromState?.uid) {
        fetchUser();
      }
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

    const handleSubmit = async (e, onClose) => {
      try {
        e.preventDefault();
        setUpdateLoading(true)
    
        const { name, bio, linkedin, instagram, twitter } = e.target.elements;
    
        let updatedData = {};
        let firebaseUpdate = {};
    
        if (name.value && name.value !== user?.name) {
          updatedData.name = name.value;
          firebaseUpdate.name = name.value;
        }
        if (bio.value && bio.value !== user?.bio) updatedData.bio = bio.value;
        if (linkedin.value && linkedin.value !== user?.socialLinks?.linkedin) updatedData.linkedin = linkedin.value;
        if (instagram.value && instagram.value !== user?.socialLinks?.instagram) updatedData.instagram = instagram.value;
        if (twitter.value && twitter.value !== user?.socialLinks?.twitter) updatedData.twitter = twitter.value;
        
        if (
          (updatedData.linkedin && !isValidSocialLink("linkedin", updatedData.linkedin)) || 
          (updatedData.instagram && !isValidSocialLink("instagram", updatedData.instagram)) || 
          (updatedData.twitter && !isValidSocialLink("twitter", updatedData.twitter))
        ) {
          toast.error("Invalid URL");
          setUpdateLoading(false);
          return;
        }
        
    
        // Handle Image Upload
        let imageUrl;
        if (uploadImageRef.current) {
          imageUrl = await uploadCloudinary(uploadImageRef.current);
        }
        if (imageUrl) {
          updatedData.profilePicture = imageUrl;
          firebaseUpdate.photo = imageUrl;
        }
    
        if (Object.keys(updatedData).length === 0) {
          setUpdateLoading(false);
          return;
        };
    
        const result = await axiosSecure.patch(
          `/api/users/updateUser`, updatedData
        );
        if(result.data.updatedProfile) {
          fetchUser();
          if (Object.keys(firebaseUpdate).length > 0) {
            await dispatch(updateUser(firebaseUpdate)).unwrap();
          }
          toast.success("Profile updated successfully");
          setUpdateLoading(false);
        }
        console.log("API Response:", result);
      } catch (error) {
        console.log("API Error:", error);
        setUpdateLoading(false);
        toast.error("Something went wrong");
      }
      
      onClose();
    };
    


    
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
              <p className="md:w-96 text-center text-slate-600">
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
      <ProfileUpdateDrawer isOpenProfile={isOpenProfile} onOpenChangeProfile={onOpenChangeProfile} image={image} handleImageUpload={handleImageUpload} user={user} handleSubmit={handleSubmit} updateLoading={updateLoading} />
    </>
  )
}

export default Page