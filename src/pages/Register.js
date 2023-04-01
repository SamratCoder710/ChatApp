import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import styles from "./Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/apiRoutes";

const Register = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('chat-app-user');
  useEffect(()=>{
    
    if(loggedIn){
      navigate('/');
    }
  },[loggedIn,navigate])
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { username, email, password } = values;
    if (handleValidation()) {
      const {data} = await axios.post(registerRoute,
        {username,email,password},{
          headers:{
            'Content-Type':'application/json'
          }
        })
      if(!(data.status)){
        toast.error(data.reason,toastOptions);
      }else{
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        navigate('/');
      }
    }
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if(password !== confirmPassword){
      toast.error("Password and Confirm Password should be same", toastOptions);
      return false;
    }
    if (username.length === 0) {
      toast.error("Username cannot be empty", toastOptions);
      return false;
    }else if(email.length === 0){
      toast.error("Email is required", toastOptions);
      return false;
    }else if(password.length < 8){
      toast.error("Password should be atleast 8 characters long", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
     {!loggedIn &&
      <div className={styles.FormContainer}>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={logo} alt="Logo"></img>
            <h1>Snappy</h1>
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Create</button>
          <span>
            Already have an account? <Link to="/Login">Login</Link>
          </span>
        </form>
      </div>}
      <ToastContainer />
    </>
  );
};

export default Register;
