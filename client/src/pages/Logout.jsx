import React,{useContext,useEffect} from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const {setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate()
  setCurrentUser(null)
  navigate('/login')
  return (
    <>

    </>
  )
}

export default Logout