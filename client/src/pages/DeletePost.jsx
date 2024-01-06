import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
const DeletePost = ({postId : id}) => {
  const [isLoading,setisLoading] = useState(false)
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()

  //redirect to login page for any user who isn't logged in
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  const location = useLocation()

  const removePost =async ()=>{
    setisLoading(true)
    try {
      
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,{withCredentials : true, headers : {Authorization : `Bearer ${token}`}})
        if(response.status == 200){
          if(location.pathname == `myPosts/${currentUser.id}`){
            navigate(0)
          }
          else{
            navigate('/')
          }
        }
    } catch (err) {
        console.log('Couldnt delete post')
    }
    setisLoading(false)
  }
  if(isLoading){
    return <Loader/>
  }

  return (
    <Link className='btn sm danger' onClick={()=>removePost(id)}>Delete</Link>
  )
}

export default DeletePost