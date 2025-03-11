import React from 'react'
import { FaCamera } from 'react-icons/fa6';

const ProfileUpload = ({ image, handleImageUpload, user }) => {
  return (
    <>
      <div className="p-4">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
        <label className="relative group cursor-pointer block w-full h-full">
          <img
            src={image || user?.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-gray-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <FaCamera size={24} className="text-white" />
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </label>
      </div>
    </div>
    </>
  )
}

export default ProfileUpload