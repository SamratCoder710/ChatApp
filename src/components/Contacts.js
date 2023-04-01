import React from "react";
import "../pages/Chat.css";
const Contacts = ({ currentUser,users,onData }) => {
  const handleChatSelection = (user,ev)=>{
    if(ev.target.tagName === 'IMG'){
      console.log('ev.sanam')
    }else{
      onData(user);
    } 
  } 
  
  return (
    
    <div className="contacts-container">
       
      <div className="contacts-header">
        {currentUser && <>
        <img src={currentUser.avatarImage} alt="Snappy pic"></img>
        <div>{currentUser.username}</div>
        </>
       }
      </div>
      <div className="contacts-main-section">
        {users.map((user,index)=>{
          return(
            <div className='contact' key={index} id={user._id}  onClick={handleChatSelection.bind(this,user)} >
            <img src={user.avatarImage}  alt="Snappy pic"></img>
          <div >{user.username} </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contacts;
