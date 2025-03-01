import React from 'react'
import DocListRaw from './DocListRaw';
import DocListColumn from './DocListColumn';

const DocsList = ({ documents, isGrid, deleteDocument }) => {

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
  }

  const handleCopyDocumentLink = async (documentId) => {
    try {
      const documentLink = `${process.env.NEXT_PUBLIC_frontend}/document/${documentId}`;
      await navigator.clipboard.writeText(documentLink);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

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