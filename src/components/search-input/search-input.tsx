import React, { useState } from 'react'
import { Input } from 'antd'
import './search-input.css'

export function SearchInput() {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setInputValue(e.target.value)
  }

  return (
    <Input
      placeholder="Type to search..."
      className="search-input"
      onChange={(e) => handleChange(e)}
      value={inputValue}
    />
  )
}
