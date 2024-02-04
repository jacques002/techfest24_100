import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/RegisterPage/RegisterPage.js'
import Login from './pages/LoginPage/LoginPage.js'
import Home from './pages/HomePage/HomePage.js'
import Analogy from './pages/AnalogyPage/AnalogyPage.js'
import Story from './pages/StoryPage/StoryPage.js'
import Chat from './pages/ChatPage/ChatPage.js'

const router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Analogy />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/story" element={<Story />} />
            <Route path="/chat" element={<Chat />} />


        </Routes>
    </div>
  )
}

export default router