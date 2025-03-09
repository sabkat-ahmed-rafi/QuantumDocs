'use client'
import { useState } from "react";
import ProfileUpload from "../components/UI/ProfileUpload";
import { useSelector } from "react-redux";


const page = () => {

    const [image, setImage] = useState(null);
    const {user} = useSelector(state => state.auth);
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
           <ProfileUpload image={image} handleImageUpload={handleImageUpload} user={user} />
         </div>
      </section> 
    </>
  )
}

export default page