import axios from "axios";
import { toast } from "react-toastify";

const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_cloudinary_upload_preset);

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_cloudinary_cloud_name}/image/upload`, formData,    {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.url;
    } catch (error) {
      toast.error("Somthing went wrong while uploading image");
    }
  }

export default uploadCloudinary;