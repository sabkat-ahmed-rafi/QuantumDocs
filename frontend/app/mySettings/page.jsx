'use client'
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import ProfileUpdateDrawer from "../components/UI/ProfileUpdateDrawer";


const page = () => {

    const [image, setImage] = useState(null);
    const {user} = useSelector(state => state.auth);
    const {isOpen: isOpenProfile, onOpen: onOpenProfile, onOpenChange: onOpenChangeProfile} = useDisclosure();
    console.log(user);

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
      }
      
    };
  

  return (
    <>
      <section className='h-screen font-sans py-5 px-5'>
         <div className="flex flex-col items-center justify-center">
         <Button onPress={onOpenProfile}>Open Drawer</Button>
           <ProfileUpdateDrawer isOpenProfile={isOpenProfile} onOpenChangeProfile={onOpenChangeProfile} image={image} handleImageUpload={handleImageUpload} user={user} />
         </div>
      </section> 
    </>
  )
}

export default page