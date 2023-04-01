import React,{useEffect, useState,useRef} from 'react'
import './Chat.css';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';
import { getAllUsers, sendMsg ,host} from '../utils/apiRoutes';
import {io} from 'socket.io-client';
import axios from 'axios';

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate(); 
  const [users,setUsers] = useState([]);
  const [selectedChat,setSelectedChat] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('chat-app-user'));
  const handleSelection = (user)=>{
    setSelectedChat(user);
  }
  const handleSend = async (msg)=>{
    await axios.post(sendMsg,{
      from:currentUser._id,
      to:selectedChat._id,
      message:msg
    })
  }

  useEffect(()=>{
    if(!currentUser){
      navigate('/Login');
    }else if(!currentUser.isAvatarImageSet){
      navigate('/SetAvatar');
    }
  },[]);

  useEffect(()=>{
    if(currentUser ){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser ? currentUser._id : null])

  useEffect(()=>{
    async function getUsers(){
      if(currentUser && currentUser._id){
      const {data} = await axios.get(`${getAllUsers}/${currentUser._id}`);
      setUsers(data.users);
      }
    }
    getUsers();
    },[currentUser ? currentUser._id : null])

  return (
    <>
    {currentUser && <div className='chat-container'>
      <Contacts users={users} currentUser={currentUser}  onData={handleSelection}/>
       <ChatContainer currentUser={currentUser}  selectedChat={selectedChat} onSend={handleSend} socket={socket} />
      </div>}
    
      </>
  )
}

export default Chat