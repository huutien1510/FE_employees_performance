import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import HomePage from './Page/HomePage'
import LoginPage from './Page/LoginPage'
import AssessmentCreate from './Page/Assessment/AssessmentCreate.jsx'
import {AuthProvider} from './Auth/AuthProvider'
import Assessments from './Page/Assessment/Assessment.jsx'

function App() {

  return (
    <div className="flex flex-col color">
      <BrowserRouter>
      <AuthProvider>
      <Header />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/assessment" element={<Assessments />} />
      <Route path="/assessment_create" element={<AssessmentCreate />} />
      </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>

  )
}

export default App;
