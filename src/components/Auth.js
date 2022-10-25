import React from 'react'
import { Navigate } from 'react-router-dom'

function Auth ({children}) {
  const logIn = localStorage.getItem('result')

  if (!logIn){
    return <Navigate to='/' />
  }
  
  return children
}

export default Auth
