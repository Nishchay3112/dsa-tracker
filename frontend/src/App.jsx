import React from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/HomePage';
import Problems from './pages/Problems';
import ProfileImport from './pages/profileImport';
import UserNotFound from './pages/UserNotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path="/" element={<Homepage />} />
        <Route path='/problems' element={<Problems />}></Route>
        <Route path='/profileImport' element = {<ProfileImport/>}></Route>
        <Route path='/user-notfound' element={<UserNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
