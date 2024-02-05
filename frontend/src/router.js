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
    <>
        <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />}/>

        <Route path="/home" element={<Home />}>
          <Route path="/home/dictionary" element={<Analogy />} />
          <Route path="/home/stories" element={<Story />} />
          <Route path="/home/scenarios" element={<Chat />} />
          
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default router