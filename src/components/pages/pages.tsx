import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import './pages.css'

interface I_pages {
  setCurrentPage: (page: number) => void
  moviesDataLength: number
  uploadStateLoading: boolean
}

export function Pages({ setCurrentPage, moviesDataLength, uploadStateLoading }: I_pages) {
  const [showPagination, setShowPagination] = useState<string>('')

  useEffect(() => {
    moviesDataLength === 0 || uploadStateLoading === true ? setShowPagination('hidden') : setShowPagination('')
  }, [moviesDataLength, uploadStateLoading])

  function changePage(page: number) {
    setCurrentPage(page)
  }
  return (
    <div className="pagination-wrapper">
      <Pagination defaultCurrent={1} total={50} onChange={(page) => changePage(page)} className={showPagination} />
    </div>
  )
}
