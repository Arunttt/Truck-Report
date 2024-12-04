import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserLogin.css';

function Userlogin() {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(true);
  const [registerLogin, setRegisterLogin] = useState({
    username: '',
    password: ''
  });
  const [login, setLogin] = useState({
    loginUser: '',
    loginPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterLogin({
      ...registerLogin,
      [name]: value
    });
  };

  const InputDataChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value
    });
  };
  
  const handleClick = () => {
    setShowLogin(!showLogin);
  };

  const createdUserData = () => {
    let data = {
        username: registerLogin.username,
        password: registerLogin.password
    };
    axios.post('/userRouter/userRegister', data)
    .then(response => {
      console.log("UserRegister", response.data);
      setRegisterLogin({
        username: '',
        password: ''
      });
      setShowLogin(true);
    })
    .catch(error => {
        console.log("failed", error);
    });
  };

  const loginProcess = () => {
    let data = {
        username: login.loginUser,
        password: login.loginPassword
    };
    axios.post('/userRouter/userLogin', data)
    .then(response => {
      console.log("UserLogin", response.data);
      toast.success("login Process Successful !", {
        position: "top-right",
    });
      navigate('/Aruna_Agency'); 
    })
    .catch(error => {
        console.log("failed", error);
        toast.error("login Process failed!", {
            position: "top-right",
        });
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {showLogin ? (
          <>
            <h2>Login</h2>
            <hr />
            <div className="form-group">
              <input 
                type="text" 
                name="loginUser" 
                value={login.loginUser} 
                onChange={InputDataChange}
                placeholder="Enter your username" 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="password"
                name="loginPassword"
                value={login.loginPassword} 
                onChange={InputDataChange}
                placeholder="Enter your password" 
                className="form-input"
              />
            </div>
            <div>
            <ToastContainer />
            <button type="button" className="login-button " onClick={loginProcess}>Login</button>
            </div>
            <br></br>
            <div style={{textAlign : 'center'}}>
            <button 
              type="button" 
              onClick={handleClick} 
              className="btn danger"
              style={{      borderColor: 'rgb(221 217 217)',
                color: 'red',
                fontWeight: '500'}}
            >
              Register
            </button>
            </div>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <hr />
            <div className="form-group">
              <input 
                type="text" 
                name="username" 
                placeholder="Enter your username"
                value={registerLogin.username}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                name="password" 
                value={registerLogin.password}
                onChange={handleChange}
                placeholder="Enter your password" 
                className="form-input"
              />
            </div>
            <div>
            <button type="button" className="login-button" onClick={createdUserData}>Create</button>
            </div>
            <br></br>
            <div style={{textAlign : 'center'}}>
            <button 
              type="button" 
              onClick={handleClick} 
              className="btn danger"
              style={{      borderColor: 'rgb(221 217 217)',
                color: 'red',
                fontWeight: '500'}}
            >
              Back to Login
            </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Userlogin;
