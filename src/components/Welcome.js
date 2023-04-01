import React from 'react'
import '../pages/Chat.css';
import Robot from '../assets/hello.gif';
const Welcome = ({userName}) => {
  return (
    <div className="welcome-Container">
    <img src={Robot} alt="Welcome user"/>
    <h1>
        Welcome, <span>{userName}!</span> 
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  )
}

export default Welcome