import React, { useEffect, useState } from 'react'

import Header from "../Header";

import Cookies from 'js-cookie';

import { useParams, Link } from 'react-router-dom';

import { FaStar, FaExternalLinkAlt } from "react-icons/fa";

import { MdLocationOn } from "react-icons/md";

import { IoBagAddSharp } from "react-icons/io5";

import SimilarJobs from "../SimilarJobs"

import { BeatLoader } from "react-spinners"

import "./index.css"

const StatusApiContent = {
  initial : "INITIAL",
  success : "SUCCESS",
  failure : "FAILURE",
  is_Loading : "IS_LOADING"
}


const EachJobDetails = () => {

  const { id } = useParams();

  const [EachVedio, setEachVedio] = useState([])

  const [SimilarJob, setSimilarJob] = useState([]);

  const [ReRender, setReRender] = useState(false);

  const [status, setStatus] = useState(StatusApiContent.initial);

  useEffect(() => {

    const getEachVedioDetails = async() => {
    
      setStatus(StatusApiContent.is_Loading)

      const ApiUrl = `https://apis.ccbp.in/jobs/${id}`

      const jwtToken = Cookies.get("jwt_token");

      const options = {
        method: "GET",
        headers:{
          Authorization : `Bearer ${jwtToken}`
        }
      }

      const response = await fetch(ApiUrl, options)
      const fetchData = await response.json();

      if (response.ok === true){
        const upDateData = {
          title : fetchData.job_details.title,
          companyLogoUrl : fetchData.job_details.company_logo_url,
          companyWebsiteUrl: fetchData.job_details.company_website_url,
          employmentType : fetchData.job_details.employment_type,
          jobDescription : fetchData.job_details.job_description,
          location: fetchData.job_details.location,
          packagePerAnnum : fetchData.job_details.package_per_annum,
          rating : fetchData.job_details.rating,
          id : fetchData.job_details.id,
          Skills : fetchData.job_details.skills.map((each) => ({
            name: each.name,
            imageUrl: each.image_url
          })),
        CompanyDescription : fetchData.job_details.life_at_company.description,
        CompanyImageUrl : fetchData.job_details.life_at_company.image_url
        }

        const SimilarjobData = fetchData.similar_jobs.map((each) => ({
          companyLogoUrl : each.company_logo_url,
          employmentType : each.employment_type,
          jobDescription : each.job_description,
          location: each.location,
          rating : each.rating,
          title : each.title,
          id : each.id
        }))

        setStatus(StatusApiContent.success)
        setEachVedio(upDateData)
        setSimilarJob(SimilarjobData)
    }else{
      setStatus(StatusApiContent.failure)
    }
  }

    getEachVedioDetails();
  },[id, ReRender])

  const getEachVedioItems = () => {

    const { companyLogoUrl, title, rating, location, packagePerAnnum, employmentType, 
            jobDescription, companyWebsiteUrl, Skills = [], CompanyDescription, CompanyImageUrl } = EachVedio

    return(
          <div className="Job_items_details_container">
          <div className="Top_container">
              <img src= {companyLogoUrl} alt= {title} className="Company_logo"/>
              <div className="Top_card_container">
                  <h1 className="Top_card_heading">{title}</h1>
                  <h2 className="Top_card_heading"><span className="span"><FaStar size={24} color="#fbbf24"/></span> {rating}</h2>
              </div>
          </div>
          <div className='Middle_contianer'>
              <div className='Middle_min_card_container'>
                  <div className='Middle_card_container'>
                      <MdLocationOn size={35} color='#f1f5f9'/>
                      <p className='Middle_card_para'> {location}</p>
                  </div>
                  <div className='Middle_card_container'>
                      <IoBagAddSharp size={35} color='#f1f5f9'/>
                      <p className='Middle_card_para'> {employmentType}</p>
                  </div>
              </div>
              <p className='packagePerAnnum'>{packagePerAnnum}</p>
          </div>
          <hr className='line_break'/>
          <div className='Description_container'>
              <div className='Link_container'>
                <h1 className='Description'>Description</h1>
                <Link to= {companyWebsiteUrl} className='Link'>
                  <div className='Link_items_container'>
                    <p className='Nav_link'>Visit</p>
                    <FaExternalLinkAlt size={15} color='#6366f1'/>
                  </div>
                </Link>
              </div>
              <p className='jobDescription'>{ jobDescription }</p>
          </div>
          <h1 className='Skills_heding'>Skills</h1>
          <ul className="Skills_container">
          {Skills.map((skill) => (
            <li key={skill.name} className="skills_items">
              <img src={skill.imageUrl} alt={skill.name} className="skill_image" />
              <p className='Skill_name'>{skill.name}</p>
            </li>
          ))}
        </ul>
        <h1 className='Skills_heding'>Life at Company</h1>
        <div className='Life_company_container'>
          <p className='Life_company_para'>{CompanyDescription}</p>
          <img src={CompanyImageUrl} alt='Life Company' className='Life_company_image'/>
        </div>
      </div>
    )

  }

  const getSimilarJobs = () => {
    return (
      <>
        <h1 className='Skills_heding'>Similar Jobs</h1>
        <ul className='Similar_un_order_container'>
          {SimilarJob.map((each) => (
            <SimilarJobs key = {each.id} eachDetails = {each}/>
          ))}
        </ul>
      </>

    )
  }

  const onClickRetryBtn = () => {
    setReRender(true)
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
          <div className='Each_vedio_Card_container'>
            {getEachVedioItems()}
            {getSimilarJobs()}
          </div>
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
    <div className='Each_vedio_bg_container'>
      <Header/>
      {CurrentApiStatus()}
    </div>
  )
}

export default EachJobDetails


