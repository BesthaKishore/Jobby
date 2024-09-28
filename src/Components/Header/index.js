import React from 'react'

import { TiHome } from "react-icons/ti";

import { PiBagSimpleFill } from "react-icons/pi";

import Cookies from 'js-cookie';

import { FiLogOut } from "react-icons/fi";

import { Link , useNavigate} from 'react-router-dom';

import "./index.css"

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {

    Cookies.remove("jwt_token")
    navigate("/login");
  }

  return (
    <header className='Header_container'>
      <div className='Nav_container'>
        <Link to = "/" className='Link'>
          <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' className='website_logo' alt='website logo' />
        </Link>
          <nav className='navBar_link_container'>
          <Link to = "/" className='Link'> 
            <p className='Nav_link'>Home</p>
            </Link>
            
          <Link to = "/jobs" className='Link'>
            <p className='Nav_link'>Jobs</p>
            </Link>
          </nav>
          <button type="button" className='Destop_views_btn' onClick={onClickLogout}>Logout</button>
          <ul className='Mobile_views_Container'>
          <Link to = "/" className='Link'>
            <li className='Mobile_views_btn'>
              <TiHome />
            </li>
            </Link>
          <Link to = "/jobs" className='Link'>
            <li className='Mobile_views_btn'>
              <PiBagSimpleFill /> 
            </li>
          </Link>
            <li className='Mobile_views_btn' onClick={onClickLogout}><FiLogOut /></li>
          </ul>
        </div>
    </header>
  )
}

export default Header
