import React from 'react'

import { FaStar } from "react-icons/fa";

import { MdLocationOn } from "react-icons/md";

import { IoBagAddSharp } from "react-icons/io5";

import { Link } from "react-router-dom";

import "./index.css"

const JobItemsDetails = (props) => {
    const { eachDetails } = props
    const { id, companyLogoUrl, title, rating, location, packagePerAnnum, employmentType, jobDescription } = eachDetails
  return (
    <Link to = {`/jobs/${id}`} className='Link_to'>
    <li className="Job_items_details_container">
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
            <h1 className='Description'>Description</h1>
            <p className='jobDescription'>{ jobDescription }</p>
        </div>
    </li>
    </Link>
  )
}

export default JobItemsDetails;
