import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import MenuDetail from './Components/MenuDetail'
import CreateMenu from './Components/CreateMenu'
import CreateItem from './Components/CreateItem'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menus/:id" element={<MenuDetail />} />
        <Route path="/create-menu" element={<CreateMenu />} />
        <Route path="/create-item" element={<CreateItem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
