import React, { useCallback } from 'react'
import DocListRaw from './DocListRaw';
import DocListColumn from './DocListColumn';
import { toast } from 'react-toastify';

// Keeping formatDate function outside of the component so it won't recreated on every render 
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
  });
}

const DocsList = ({ documents, isGrid, deleteDocument }) => {

  const handleCopyDocumentLink = useCallback(async (documentId) => {
    try {
      const documentLink = `${process.env.NEXT_PUBLIC_FRONTEND}/document/${documentId}`;
      await navigator.clipboard.writeText(documentLink);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, []);


  return (
    <>
      {
        isGrid ? 
        <DocListRaw handleCopyDocumentLink={handleCopyDocumentLink} deleteDocument={deleteDocument} documents={documents} formatDate={formatDate} /> : 
        <DocListColumn handleCopyDocumentLink={handleCopyDocumentLink} deleteDocument={deleteDocument} documents={documents} formatDate={formatDate} />
      }
    </>
  )
}

export default DocsList