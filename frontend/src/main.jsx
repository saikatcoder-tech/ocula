import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './components/userContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserProvider>
    <Toaster position="bottom-right" reverseOrder={false}/>
    <App />
  </UserProvider> 
  </BrowserRouter>
)
