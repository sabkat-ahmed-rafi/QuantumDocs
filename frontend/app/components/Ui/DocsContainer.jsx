'use client'

import React, { useEffect, useRef, useState } from 'react'
import FilterHeader from './FilterHeader'
import DocsList from './DocsList'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useSelector } from 'react-redux'
import NoDocs from './NoDocs'
import { useDeleteDataMutation } from '@/app/slices/docApiSlice'
import { Spinner } from '@heroui/react'

const DocsContainer = () => {

  const [isGrid, setIsGrid] = useState(true);
  const [ownershipFilter, setOwnershipFilter] = useState("anyone")
  const [documents, setDocuments] = useState([]);
  const {user} = useSelector(state => state.auth);
  const [ deleteData ] = useDeleteDataMutation()
  const [lastId, setLastId] = useState(null);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  const getAllDocuments = async () => {

    if (!hasMore || loading) return;

    setLoading(true);

    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_document_service}/api/document`,
        { params: { userEmail: user?.email, ownershipFilter, lastId } }
      )
      console.log(result)
      if(result.data.documents.success) {
        setDocuments((prev) => lastId ? [...prev, ...result.data.documents.documents] : result.data.documents.documents);
        setLastId(result.data.documents.lastId);
        setLoading(false);
        setHasMore(result.data.documents.hasMore);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false)
    }
  }

  const deleteDocument = async (documentId) => {
    try {
      const result = await deleteData(documentId).unwrap();
      if(result.deleteResult.success) {
        setDocuments((prev) => prev.filter(doc => doc._id !== documentId));
        getAllDocuments();
      };
      console.log
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    setDocuments([]);
    setLastId(null);
    getAllDocuments()
  }, [user?.email, ownershipFilter])

  useEffect(() => {
    if(!observerRef.current || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if(entries[0].isIntersecting) {
          getAllDocuments();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();

  }, [loading])


  return (
    <>
      <FilterHeader setOwnershipFilter={setOwnershipFilter} ownershipFilter={ownershipFilter} setIsGrid={setIsGrid} isGrid={isGrid} />
      {
        documents.length == 0 ? !loading && <NoDocs /> : <DocsList documents={documents} isGrid={isGrid} deleteDocument={deleteDocument} />
      }

      { loading && <Spinner color='secondary' className='flex justify-center items-center text-xl font-semibold'>Loading</Spinner> }

      <div ref={observerRef} style={{ height: "20px" }} />
    </>
  )
}

export default DocsContainer