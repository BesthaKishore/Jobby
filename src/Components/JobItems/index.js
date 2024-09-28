import React, { useEffect, useState } from 'react'

import Header from '../Header'

import SideBar from '../SideBar'

import JobItemsDetails from "../JobItemsDetails"

import { FaSearch } from "react-icons/fa";

import Cookies from "js-cookie"

import { BeatLoader } from "react-spinners"

import "./index.css"

const StatusApiContent = {
  initial : "INITIAL",
  success : "SUCCESS",
  failure : "FAILURE",
  is_Loading : "IS_LOADING"
}

const JobItems = () => {

  const [employeType, setEmployeType] = useState([]);

  const [JobDetails, setJobDetails]  = useState([]);

  const [status, setStatus] = useState(StatusApiContent.initial);

  const [salaryType, setSalaryType] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const [Render, setRender] = useState(false);

  useEffect(() => {

    const getJobDetails = async () => {

      setStatus(StatusApiContent.is_Loading)

      const APiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeType}&minimum_package=${salaryType}&search=${searchInput}`

      const jwtToken = Cookies.get("jwt_token");
      
      const options = {
        method: "GET",
        headers: {
          Authorization : `Bearer ${jwtToken}`
        }
      }

      const response = await fetch(APiUrl, options)
      const fetchData = await response.json()

      if (response.ok === true){
        const upDate = fetchData.jobs.map((each) => ({
          title : each.title,
          companyLogoUrl : each.company_logo_url,
          employmentType : each.employment_type,
          jobDescription : each.job_description,
          location: each.location,
          packagePerAnnum : each.package_per_annum,
          rating : each.rating,
          id : each.id
        }))
        setStatus(StatusApiContent.success)
        setJobDetails(upDate)
      }else{
        setStatus(StatusApiContent.failure)
      }
    }

    getJobDetails();

  },[employeType, salaryType, searchInput, Render])

  const onClickRetryBtn = () => {
    setRender(true);
  }


  const upDateemployeTypeValue = (values) => {
      if (employeType.includes(values)){
            setEmployeType(employeType.filter((each) => each !== values));
        }else{
            setEmployeType([...employeType, values]);
        }
  }

  const upDateemployeSalaryValue = (values) => {
    setSalaryType(values);
  }

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value)
  }

  const getDesktopSearchContainer = () => {
    return(
      <div className="Desktop_search_container">
        <input type='search' className='Search' placeholder='Search' onChange={onChangeSearchInput}/>
        <button type='button' className='search_btn'>
          <FaSearch size={20} color='#ffffff'/>
        </button>
      </div>
    )
  }

  const getMobileSearchContainer = () => {
    return(
      <div className="Mobile_search_container">
        <input type='search' className='Search' placeholder='Search' onChange={onChangeSearchInput}/>
        <button type='button' className='search_btn'>
          <FaSearch size={20} color='#ffffff'/>
        </button>
      </div>
    )
  }

  const getSearchFailureContainer = () => {
    return(
      <div className='Failure_container'>
      <img src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png' alt='no jobs' className='Failure_image'/>
      <h1 className='Failure_heading'>no Jobs Found</h1>
      <p className='Failure_para'>We could not find any jobs. Try other filters.</p>
    </div>
    )
  }

  const LoaderSpinner = () => {
    return(
        <div className='Loader_spinner_container'>
            <BeatLoader color='#ffffff' size={20}/>
        </div>
    )
}

  const getApiSuccessContainer = () => {
    return(
      <>
      {JobDetails.length > 0 ? (
      <ul className='Un_order_success'>
        {JobDetails.map((each) => (
          <JobItemsDetails key = {each.id} eachDetails = {each}/>
        ))}
      </ul>
    ) : (getSearchFailureContainer())}
    </>
    )
  }

  const getApiFailureContainer = () => {
    return(
      <div className='Failure_container'>
        <img src='https://assets.ccbp.in/frontend/react-js/failure-img.png ' alt='failure view' className='Failure_image'/>
        <h1 className='Failure_heading'>Opps! something went wrong</h1>
        <p className='Failure_para'>We cannot seem to find the page you are looking for.</p>
        <button type='button' className='retry_btn' onClick={onClickRetryBtn}>Retry</button>
      </div>
    )
  }

  const CurrentApiStatus = () => {
    switch(status){
        case StatusApiContent.success:
            return getApiSuccessContainer()
        case StatusApiContent.failure:
            return getApiFailureContainer()
        case StatusApiContent.is_Loading:
            return LoaderSpinner()
        default :
            return null
    }
}
  
  return (
    <div className='Job_Items_container'>
        <Header/>
        <div className='Job_items_bg_container'>
          <aside className='sideArea'>
            {getMobileSearchContainer()}
            
            <SideBar 
              upDateemployeTypeValue = {upDateemployeTypeValue}
              upDateemployeSalaryValue = {upDateemployeSalaryValue}
            />
          </aside>
          <section className='Section_bg_container'>
            {getDesktopSearchContainer()}
            {CurrentApiStatus()}
          </section>

        </div>
    </div>
  )
}

export default JobItems
