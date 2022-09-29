import React, { useState } from 'react'
import PT from 'prop-types'
import axios from 'axios'



 

export default function LoginForm(props) {
  
  
  // ✨ where are my props? Destructure them here
  const onChange = evt => {
    const { id, value } = evt.target
    props.setUser({ ...props.user, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    props.login(props.user)
    
  }

  const isDisabled = () => {
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    if(props.user.username.trim().length > 2 && props.user.password.trim().length > 7){
      return false
    }
    else{
      return true
    }
  }
  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={props.user.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={props.user.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
