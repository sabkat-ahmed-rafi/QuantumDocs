'use client'

import React, { useEffect, useState } from 'react'
import FilterHeader from './FilterHeader'
import DocsList from './DocsList'
import { toast } from 'react-toastify'
import axios from 'axios'

const DocsContainer = () => {

  const [isGrid, setIsGrid] = useState(false);
  const [ownershipFilter, setOwnershipFilter] = useState("")
  const [documents, setDocuments] = useState([]);

  const getAllDocuments = async () => {
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_document_service}/api/document/`)
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <FilterHeader setOwnershipFilter={setOwnershipFilter} isGrid={isGrid} />
      <DocsList documents={documents} />
    </>
  )
}

export default DocsContainer