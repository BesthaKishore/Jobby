import React from 'react'

import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

import Cookies from "js-cookie";

import "./index.css"

const LoginForm = () => {

    const [username, setUserName] = useState('');

    const [password, setPassword] = useState('');

    const [erroMsg, setErrorMsg] = useState([]);

    const navigate = useNavigate();

    const [ShowErrorMsg, setShowErrorMsg] = useState(false);

    useEffect(() => {
        const jwtToken = Cookies.get("jwt_token");
        if (jwtToken !== undefined){
            navigate("/");
        }
    },[navigate])

    const userInputValue = event => {
        setUserName(event.target.value);
    }

    const userPasswordInput = event => {
        setPassword(event.target.value);
    }

    const onSuccess = (jwtToken) => {
        Cookies.set("jwt_token", jwtToken, {expires : 30})
        navigate("/");
    }

    const onSubmitForm = async event => {
        event.preventDefault()

        const userDetails = {
            username,password
        }

        const LoginApi = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(LoginApi, options)
        const fetchData = await response.json();
        if (response.ok === true){
            onSuccess(fetchData.jwt_token)
        }else{
            setShowErrorMsg(true)
            setErrorMsg(fetchData.error_msg)
        }
    }

  return (
    <div className='LoginForm_container'>
      <div className='LoginForm_bg_container'>
        <img className='logo' src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='website logo' />
        <form className='form_container' onSubmit={onSubmitForm}>
            <div className='userInput_contianer'>
                <label className='userInput' htmlFor='UserInput'>UserInput</label>
                <input type='text' className='Search_Input' placeholder='Username' id='UserInput' value={username} onChange={userInputValue}/>
            </div>
            <div className='userInput_contianer'>
                <label className='userInput' htmlFor='Password'>Password</label>
                <input type='password' className='Search_Input' placeholder='Password' id='Password' value={password} onChange={userPasswordInput}/>
            </div>
            <button type='submite' className='loginBtn'>LogIn</button>
            {ShowErrorMsg ? <p className='erro_msg'>*{ erroMsg }</p> : null }
        </form>
      </div>
    </div>
  )
}

export default LoginForm
