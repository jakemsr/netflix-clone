import React, { useEffect, useRef } from 'react'
import "./index.css"
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const navigate = useNavigate();

  // the Login page needs to know if user is already logged in
  const loggedIn = useRef(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        loggedIn.current = true;
        navigate("/");
      } else {
        loggedIn.current = false;
        navigate("/login");
      }
    })
  },[])

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login loggedIn={loggedIn.current} />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  )
}

export default App
