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

  return (
    <>
      {
        isGrid ? 
        <DocListRaw deleteDocument={deleteDocument} documents={documents} formatDate={formatDate} /> : 
        <DocListColumn deleteDocument={deleteDocument} documents={documents} formatDate={formatDate} />
      }
    </>
  )
}

export default DocsList