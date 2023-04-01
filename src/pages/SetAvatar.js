import React, { useEffect, useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import "./SetAvatar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/apiRoutes";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('chat-app-user'));
    if(!user || user.isAvatarImageSet){
    navigate('/');
    }
  },[navigate])
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    draggable: true,
    theme: "dark",
  };
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const fileInputRef = useRef(null);
  const handlePictureSelect = ()=>{
    fileInputRef.current.click();
  }
  const handleImageUpload =()=>{
    const file = fileInputRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      setAvatars([...avatars,reader.result]);
    }
  }
  const setProfilePicture = async()=>{
    if(selectedAvatar === undefined){
        toast.error('Please select an Avatar',toastOptions);
    }else{
      const user = JSON.parse(localStorage.getItem('chat-app-user'));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
          image:avatars[selectedAvatar]
        })
        if(data.isSet){
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem('chat-app-user',JSON.stringify(user));
          navigate('/');
        }
    }

  }
  
  useEffect(() => {
    async function fetchdata() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const avatar = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(avatar.data);
        data.push('data:image/svg+xml;base64,'+buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchdata();
  }, []);
  return (
    <>
      <div className="Container">
        <div className="title-Container">
          <h1>Pick your Profile Picture</h1>
        </div>
        {isLoading ? (
          <img src={loader} alt="loader"></img>
        ) : (
            <>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={`${index}`}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img 
                    onClick={() => {
                      setSelectedAvatar(index);
                    }}
                    src={avatar} style={{width:'9rem',height:'9rem',borderRadius:'5rem'}}
                    alt="avatar"
                  ></img>
                </div>
              );
            })}
            </div>
            <div className="orText">OR</div>
            <button className="submit-btn" onClick={handlePictureSelect}>Choose a picture from your device</button>
            <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload}></input>
            
            <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
            

          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default SetAvatar;
