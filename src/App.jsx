import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import HomePage from './Page/HomePage'
import LoginPage from './Page/LoginPage'
import Assessment from './Page/Assessment'
import {AuthProvider} from './Auth/AuthProvider'

function App() {

  return (
    <div className="flex flex-col color">
      <BrowserRouter>
      <AuthProvider>
      <Header />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/assessment" element={<Assessment />} />
      </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>

  )
}

export default App;
