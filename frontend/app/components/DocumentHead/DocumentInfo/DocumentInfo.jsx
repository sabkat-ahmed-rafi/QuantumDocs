'use client'

import { SiGoogledocs } from 'react-icons/si';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FaArrowsRotate } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import * as quillToWord from 'quill-to-word';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaRegStar } from "react-icons/fa6";



const DocumentInfo = ({isTyping, document, customProviderRef, quillRef, isOwner, isSharedUser}) => {


    const [title, setTitle] = useState("");
    const { user } = useSelector(state => state.auth);
    const [isFavourite, setIsFavourite] = useState();
    const [loading, setLoading] = useState(false);
 

    useEffect(() => {
        if (document?.document?.title) {
            setTitle(document.document.title);
        }
    }, [document?.document?.title]);


    useEffect(() => {
        if (document?.document?.id && user?.uid) {
            getFavourite();
        }
    }, [document?.document?.id, user?.uid])


    const updateDocTitle = async () => {
        if(title === document?.document?.title) return;
        try {

            if(customProviderRef.current.readyState == WebSocket.OPEN) {
                customProviderRef.current.send(JSON.stringify({type: 'titleUpdate' , documentId:document?.document?.id , newTitle: title}));
            };
        } catch(error) {
            toast.error("Something went wrong")
        }
    }

    const handleKeyDownUpdate = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            updateDocTitle();
            e.target.blur();
        }
    }

    const handleDownloadDOCX = async () => {
        if(!quillRef.current) return;

        const paragraphStyles = {
            block_quote: {
                paragraph: { spacing: { line: 300 }, indent: { left: 400 } },
                run: { italics: true, highlight: "lightGray", color: "666666" } 
            },
            code_block: {
                paragraph: { spacing: { line: 280 }, indent: { left: 400 } },
                run: { font: "Courier New", size: 22, highlight: "black", color: "white"}
            },
        }
        
        const delta = quillRef.current.getContents();
        const wordBlob = await quillToWord.generateWord(delta, { exportAs: "blob", paragraphStyles });
       
        saveAs(wordBlob, "document.docx");
    }

    const handleDownloadPDF = async () => {
        if(!quillRef.current) return;

        const quillEditor = quillRef.current.container;
        const canvas = await html2canvas(quillEditor, {scale: 3});
        const imgData = canvas.toDataURL("image/png", 1.0);

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
        pdf.save("document.pdf");

    }

    const handleAddToFavourite = async () => {
        const documentId = document?.document?.id;
        const userEmail = user?.email;
        setLoading(true)
        try {
            const result = await axios.patch(
                `${process.env.NEXT_PUBLIC_user_service}/api/users/addToFavourite`, 
                { documentId, userEmail }
            )
            if(result.data.add.success) {
                getFavourite();
                setLoading(false)
            }
        } catch (error) {
            toast.error("Something went wrong");
            setLoading(false)
        }
    }

    const handleRemoveFavourite = async () => {
        const documentId = document?.document?.id;
        const userEmail = user?.email;
        setLoading(true)
        try {
            const result = await axios.delete(
                `${process.env.NEXT_PUBLIC_user_service}/api/users/removeFavourite`, 
                { data: { documentId, userEmail } }
            )
            if(result.data.remove.success) {
                getFavourite();
                setLoading(false)
            }
        } catch (error) {
            toast.error("Something went wrong");
            setLoading(false)
        }
    }

    const getFavourite = async () => {
        const documentId = document?.document?.id;
        const userEmail = user?.email;
        try {
            const result = await axios.get(`${process.env.NEXT_PUBLIC_user_service}/api/users/getFavourite`, { params: { documentId, userEmail } } );
            if(result.data.get.success) {
                setIsFavourite(true);
            } else {
                setIsFavourite(false);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }


  return (
    <>

        <section className='flex items-center space-x-3'>
            <SiGoogledocs size={40} className="text-purple-500" />
            <div className='flex-col space-y-3'>
                <div className='flex items-center space-x-3'>
                    <input 
                        disabled={!isOwner && !isSharedUser}
                        name="title"
                        value={title || ""}  
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={updateDocTitle}
                        onKeyDown={handleKeyDownUpdate}
                        className="text-xl px-1 bg-[#F9FBFD] w-[220px] border-2 border-[#F9FBFD] hover:border-black transition-all rounded-md"
                        type="text"
                    />
                    {
                        isFavourite ? <FaStar onClick={handleRemoveFavourite} size={30} className={`text-purple-700 p-1 rounded-full hover:bg-slate-200 cursor-pointer ${loading ? "invisible":"flex"} transition-all`} />  :
                        <FaRegStar onClick={handleAddToFavourite} size={30} className={`text-purple-700 p-1 rounded-full hover:bg-slate-200 cursor-pointer ${loading ? "invisible":"flex"} transition-all`} />
                    }
                    <div className='md:flex items-center space-x-2 hidden'>
                        {
                           isTyping ? 
                           <>
                             <FaArrowsRotate className='animate-spin' />
                             <p className='ml-1 text-sm font-semibold'>Saving...</p>
                           </> : 
                           <>
                             <IoCloudUploadOutline size={25} className='text-sm font-semibold' />
                             <p className='ml-1 text-sm font-semibold'>Saved</p>
                           </> 
                        }
                    </div>
                </div>
                <div className='flex font-sans text-sm font-[500]'>
                    <button

                     disabled={!isOwner && !isSharedUser}
                     onClick={handleDownloadDOCX}
                     className={`px-2 py-1 rounded-md 
                        ${!isOwner && !isSharedUser 
                          ? 'cursor-not-allowed opacity-50' 
                          : 'hover:bg-slate-200'}`}>Download DOCS</button>
                    <button 
                     disabled={!isOwner && !isSharedUser}
                     onClick={handleDownloadPDF}
                     className={`px-2 py-1 rounded-md 
                        ${!isOwner && !isSharedUser 
                          ? 'cursor-not-allowed opacity-50' 
                          : 'hover:bg-slate-200'}`}>Download PDF</button>
                </div>
            </div>
        </section>
        
    </>
  )
}

export default DocumentInfo