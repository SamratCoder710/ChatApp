import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FaPowerOff} from 'react-icons/fa'
const Logout = () => {
    const navigate = useNavigate();
    const handleLogout =()=>{
        localStorage.clear();
        navigate('/Login');
    }
  return (
    <FaPowerOff onClick={handleLogout}/>
  )
}

export default Logout