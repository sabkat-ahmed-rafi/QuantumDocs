'use client'

import React from 'react'
import FilterHeader from './FilterHeader'
import DocsList from './DocsList'

const DocsContainer = () => {

  const handleOwnedDocs = (e) => {
    console.log(e.target.value)
  }

  return (
    <>
      <FilterHeader handleOwnedDocs={handleOwnedDocs} />
      <DocsList />
    </>
  )
}

export default DocsContainer