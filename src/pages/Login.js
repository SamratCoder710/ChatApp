import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import styles from "./Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/apiRoutes";

const Login = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('chat-app-user');
  useEffect(()=>{
    if(loggedIn){
      navigate('/');
    }
  },[loggedIn,navigate])
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const { username, password } = values;
    if (handleValidation()) {
      const {data} = await axios.post(loginRoute,
        {username,password},{
          headers:{
            'Content-Type':'application/json'
          }
        })
        if(!(data.status)){
          toast.error(data.reason,toastOptions);
        }else{
          localStorage.setItem('chat-app-user',JSON.stringify(data.user))
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
    const { username, password } = values;
    if (username.length === 0) {
      toast.error("Username cannot be empty", toastOptions);
      return false;
    }else if(password.length === 0){
      toast.error("Password cannot be empty", toastOptions);
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
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Log In</button>
          <span>
            Doesn't have an account? <Link to="/Register">Register</Link>
          </span>
        </form>
      </div> }
      <ToastContainer />
    </>
  );
};

export default Login;
