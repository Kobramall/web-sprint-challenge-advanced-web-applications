import React from "react"
import {Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest }) =>{
    return(
        <Outlet {...rest} render={(props) =>{
            if(localStorage.getItem('token')) {
                return <Component {...props} />
            }
            else{
              return <Navigate to='/' />
            }
        }} />
    )
}

export default PrivateRoute