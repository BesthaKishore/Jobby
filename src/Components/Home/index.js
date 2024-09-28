import React from 'react'

import Header from '../Header'

import { Link } from "react-router-dom"

import "./index.css"


const Home = () => {
  return (
    <main className='Main_bg_container'>
      < Header />
      <section className='Section_container'>
        <h1 className='Section_heading'>find the job that fits <br></br>your life</h1>
        <p className='Section_para'>Millions of people are searching for jobs, salary
          information,company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
        <button type='button' className='Find_job'>Find Job</button>
        </Link>
      </section>
    </main>
  )
}

export default Home
