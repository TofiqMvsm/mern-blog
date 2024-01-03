import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const DeletePost = () => {
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()

  //redirect to login page for any user who isn't logged in
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  return (
    <div>DeletePost</div>
  )
}

export default DeletePost