import React, { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { BeatLoader } from "react-spinners"

import "./index.css"

const StatusApiContent = {
    initial : "INITIAL",
    success : "SUCCESS",
    failure : "FAILURE",
    is_Loading : "IS_LOADING"
}

const SideBar = (props) => {
    
    const {upDateemployeTypeValue, upDateemployeSalaryValue} = props

    const [profileData, setProfileData] = useState([])

    const [RetryBtn, setRetryBtn] = useState(false);

    const [status, setStatus] = useState(StatusApiContent.initial);


    useEffect(() => {
        const getProfileDetails = async() => {

            setStatus(StatusApiContent.is_Loading)

            const profileApi = 'https://apis.ccbp.in/profile'

            const jwtToken = Cookies.get("jwt_token");

            const options = {
                method: "GET",
                headers : {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(profileApi, options)
            const fetchData = await response.json()

            if (response.ok === true){
                const upDateData = {
                    name : fetchData.profile_details.name,
                    profileImageUrl : fetchData.profile_details.profile_image_url,
                    shortBio : fetchData.profile_details.short_bio
                }
                setStatus(StatusApiContent.success)
                setProfileData(upDateData);
            }else{
                setStatus(StatusApiContent.failure)
            }

        }
        getProfileDetails()
    },[RetryBtn])

    const onClickRetryBtn = () => {
        setRetryBtn(true);
    }

    const onChangEmployment = (event) => {
        upDateemployeTypeValue(event.target.value);
    }

    const onChangeRadio = (event) => {
        upDateemployeSalaryValue(event.target.value);
    }

    const LoaderSpinner = () => {
        return(
            <div className='Loader_spinner_container'>
                <BeatLoader color='#ffffff' size={20}/>
            </div>
        )
    }

    const getProfileDetails = () => {

        const { name, profileImageUrl, shortBio} = profileData
        return(
            <div className='profile_container'>
                <img src={profileImageUrl} className='profile_image' alt={name}/>
                <h1 className='profile_heading'>{name}</h1>
                <p className='profile_para'>{shortBio}</p>
            </div>
        )
    }

    const getProfileFailure = () => (
        <div className='Loader_spinner_container'>
            <button type='button' className='ReTry_btn' onClick={onClickRetryBtn}>Retry</button>
        </div>
    )

    const getTypeOfEmployment = () => {
        return(
            <div className='Employment_Container'>
                <span className='break'></span>
                <div className='Employment_input_container'>
                    <h1 className='Employment_Heading'>Type of Employment</h1>
                    <div className='Checkbox_container'>
                        <input type='checkbox' id='FULLTIME' className='checkbox_input' value = "FULLTIME" onChange={onChangEmployment}/>
                        <label className='CheckBox_label' htmlFor='FULLTIME'>Full Time</label>
                    </div>
                    <div className='Checkbox_container'>
                        <input type='checkbox' id='PARTTIME' className='checkbox_input' value = "PARTTIME" onChange={onChangEmployment}/>
                        <label className='CheckBox_label' htmlFor='PARTTIME'>Part Time</label>
                    </div>
                    <div className='Checkbox_container'>
                        <input type='checkbox' id='FREELANCE' className='checkbox_input' value = "FREELANCE" onChange={onChangEmployment}/>
                        <label className='CheckBox_label' htmlFor='FREELANCE'>Freelance</label>
                    </div>
                    <div className='Checkbox_container'>
                        <input type='checkbox' id='INTERNSHIP' className='checkbox_input' value = "INTERNSHIP" onChange={onChangEmployment}/>
                        <label className='CheckBox_label' htmlFor='INTERNSHIP'>Internship</label>
                    </div>
                </div>
            </div>
        )
    }

    const getSalaryRange = () => {
        return(
            <div className='Employment_Container'>
                <span className='break'></span>
                <div className='Employment_input_container'>
                    <h1 className='Employment_Heading'>Salary Range</h1>
                    <div className='Checkbox_container'>
                        <input type='radio' id='10LPAABOVE' className='checkbox_input' value="1000000" name='Salary' onChange={onChangeRadio}/>
                        <label className='CheckBox_label' htmlFor='10LPAABOVE'>10 LPA and above</label>
                    </div>
                    <div className='Checkbox_container'>
                        <input type='radio' id='20LPAABOVE' className='checkbox_input' value="2000000" name='Salary' onChange={onChangeRadio}/>
                        <label className='CheckBox_label' htmlFor='20LPAABOVE'>20 LPA and above</label>
                    </div>
                    <div className='Checkbox_container'>
                        <input type='radio' id='30LPAABOVE' className='checkbox_input' value="3000000" name='Salary' onChange={onChangeRadio}/>
                        <label className='CheckBox_label' htmlFor='30LPAABOVE'>30 LPA and above</label>
                    </div>
                    <div className='Checkbox_container'>
                        <input type='radio' id='40LPAABOVE' className='checkbox_input' value="4000000" name='Salary' onChange={onChangeRadio}/>
                        <label className='CheckBox_label' htmlFor='40LPAABOVE'>40 LPA and above</label>
                    </div>
                </div>
            </div>
        )
    }

    const CurrentApiStatus = () => {
        switch(status){
            case StatusApiContent.success:
                return getProfileDetails()
            case StatusApiContent.failure:
                return getProfileFailure()
            case StatusApiContent.is_Loading:
                return LoaderSpinner()
            default :
                return null
        }
    }

  return (
    <div>
        {CurrentApiStatus()}
        {getTypeOfEmployment()}
        {getSalaryRange()}
    </div>
  )
}

export default SideBar

