import { useState } from 'react'
import './App.css'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import RegForm from './components/RegForm/RegForm'
import AutForm from './components/AutForm/AutForm'
import Applications from './components/Applications/Applications'
import Admin from './components/Admin/Admin'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RegForm/>}/>
      <Route path="/reg" element={<RegForm/>}/>
      <Route path="/aut" element={<AutForm/>}/>
      <Route path="/applications" element={<Applications/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
