import React, { useRef, useState } from "react";
import "../pages/Chat.css";
import Logout from "./Logout";
import Welcome from "./Welcome";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import { useEffect } from "react";
import { getAllMsg } from "../utils/apiRoutes";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
let changeList = [];
const ChatContainer = ({ selectedChat, currentUser, onSend ,socket }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMsg,setArrivalMsg] = useState(null);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    setMsg("");
    setShowEmojiPicker(false);
  }, [selectedChat]);

  useEffect(() => {
    async function fetchMsg() {
      if (currentUser?._id && selectedChat?._id) {
        const response = await axios.post(getAllMsg, {
          from: currentUser._id,
          to: selectedChat._id,
        });
        console.log(messages)
        setMessages(response.data);
      }
    }
    fetchMsg();
  }, [currentUser?._id, selectedChat?._id]);

  const addEmoji = (obj) => {
    let message = msg;
    message += obj.emoji;
    setMsg(message);
  };
  const handleSendInput = (ev) => {
    ev.preventDefault();
    if (msg.length > 0) {
      socket.current.emit("send-msg",{
        from:currentUser._id,
        to:selectedChat._id,
        message:msg,
      });
      onSend(msg);
      setMsg('');
      setShowEmojiPicker(false);
      const msgs = [...messages];
      msgs.push({fromSelf:true,message:msg});
      setMessages(msgs);
      setMsg('');
    }
  };

  useEffect(()=>{
    if(socket.current){
      socket.current.on('msg-receive',(msg)=>{
        setArrivalMsg({fromSelf:false,message:msg})
      })
    }
  },[]);

  useEffect(()=>{
    arrivalMsg && setMessages((prev)=>[...prev,arrivalMsg]);
    let changed = null;
    let newChanged = null;
    changeList = [];
    console.log(messages)
    messages.map((e,index)=> {
      newChanged = e.fromSelf;
      if(changed !== newChanged){
          changeList.push(index)
        }
      changed = newChanged;
    })
  },[arrivalMsg])


  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:'smooth'})
  },[messages])

  const addMsg = (ev) => {
    setMsg(ev.target.value);
  };
  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  return (
    <form onSubmit={handleSendInput}>
      <div className="msg-container">
        <div className="conversion-header">
          {selectedChat && (
            <div className="conversion-header-contact">
              <div className="conversation">
                <img src={selectedChat.avatarImage} alt="Snappy pic"></img>
                <span>{selectedChat.username} </span>
                </div>
              <div className="logoutContainer" title="Logout">
                <Logout />
              </div>
            </div>
          )}
        </div>
        <div className="msg-main-section">
          {!selectedChat ? (
            <Welcome userName={currentUser.username} />
          ) : (
            <div></div>
          )}
          {messages &&
            messages.map((msg, index) => {
              return (
                <div
                  ref={scrollRef} key={uuidv4()}
                  className={`msg ${msg.fromSelf ? "sended" : "received"} ${changeList.indexOf(index) !== -1 ? 'bulgedOut' : ''}`}
                >
                  <div className="content">
                    <p>{msg.message}</p>
                  </div>
                </div>
              );
            })}
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={addEmoji}
              width="69%"
              height="20rem"
              theme="dark"
            />
          )}
        </div>

        {selectedChat && (
          <div className="msg-send-section">
            <BsEmojiSmile className="smile-Emoji" onClick={handleEmojiClick} />
            <input
              type="text"
              placeholder="Type a message"
              className="msgContainer"
              onChange={addMsg}
              value={msg}
            ></input>
            <button type="submit" className="sendButton">
              <BiSend />
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ChatContainer;
