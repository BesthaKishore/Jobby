import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import LoginForm from "./Components/LoginForm"

import Home from "./Components/Home"

import JobItems from './Components/JobItems'

import EachJobDetails from "./Components/EachJobDetails"

import ProductedRoute from './Components/ProductedRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element = {<LoginForm/>}/>
        <Route element = {<ProductedRoute/>}>
          <Route path='/' element = {<Home/>}/>
          <Route path='/jobs' element = {<JobItems/>}/>
          <Route path='/jobs/:id' element = {<EachJobDetails/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
