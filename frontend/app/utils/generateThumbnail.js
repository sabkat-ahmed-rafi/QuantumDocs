import html2canvas from "html2canvas";
import uploadCloudinary from "./uploadCloudinary";

const generateThumbnail = async (quillRef) => {
    if(!quillRef.current) return;

    const quilEditor = quillRef.current.container;

    if (!window.document.body.contains(quilEditor)) return;

    const canvas = await html2canvas(quilEditor, { scale: 0.5, useCORS: true  });

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        async (blob) => {
          if(!blob) {
            reject("Rejected creating preview image");
            return 
          }
          const file = new File([blob], "thumbnail.jpg", { type: "image/jpeg" });
          try {
            const uploadedData = await uploadCloudinary(file);
            resolve(uploadedData);  
          } catch (error) {
            reject(error);
          }
        }, "image/jpeg");
    });
    
  };

export default generateThumbnail;