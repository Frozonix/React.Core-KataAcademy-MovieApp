import React, { useState } from 'react'
import { Input } from 'antd'
import './search-input.css'
import { debounce } from 'lodash'

interface I_search {
  inputValue: string
  setInputValue: any
}

export function SearchInput({ inputValue, setInputValue }: I_search) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    //  const d = debounce(() => console.log(e.target), 2000)
    //  d()
    //  console.log(e.target.value)
  }

  return (
    <div className="search-input-wrapper">
      <Input
        placeholder="Type to search..."
        className="search-input"
        onChange={(e) => handleChange(e)}
        value={inputValue}
      />
    </div>
  )
}
