'use client'

import React, { useEffect, useState } from 'react'
import FilterHeader from './FilterHeader'
import DocsList from './DocsList'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useSelector } from 'react-redux'
import NoDocs from './NoDocs'

const DocsContainer = () => {

  const [isGrid, setIsGrid] = useState(false);
  const [ownershipFilter, setOwnershipFilter] = useState("anyone")
  const [documents, setDocuments] = useState([]);
  const {user} = useSelector(state => state.auth);

  const getAllDocuments = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_document_service}/api/document/getAllDocuments`,
        { params: { userEmail: user?.email, ownershipFilter } }
      )
      setDocuments(result.data.documents.documents)
      console.log(result);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllDocuments()
  }, [user?.email, ownershipFilter])

  return (
    <>
      <FilterHeader setOwnershipFilter={setOwnershipFilter} ownershipFilter={ownershipFilter} isGrid={isGrid} />
      {
        documents.length == 0 ? <NoDocs /> : <DocsList documents={documents} />
      }
    </>
  )
}

export default DocsContainer