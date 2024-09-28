import React from 'react'

import Cookies from "js-cookie"

import { Outlet, useNavigate } from 'react-router-dom'

import { useEffect } from 'react'

const ProductedRoute = (props) => {

    const navigate = useNavigate();

    useEffect(() => {

        const jwtToken = Cookies.get("jwt_token");

        if (jwtToken === undefined){
            navigate("/login");
        }
    },[navigate])

    return <Outlet/>
}

export default ProductedRoute
