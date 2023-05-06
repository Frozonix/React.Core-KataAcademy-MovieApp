import React from 'react'
import ReactDOM from 'react-dom/client'

import 'antd/dist/reset.css'
import { App } from './components/app/app'

// console.log('hello')
const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(<App />)
