import React, { useContext, useEffect,useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useNavigate, useParams } from "react-router-dom";
import Thumbnail from "../images/blog22.jpg";
import { UserContext } from "../context/UserContext";
import DeletePost from "./DeletePost"
import Loader from "../components/Loader";
import axios from "axios";
const PostDetail = () => {
  const {id} = useParams()
  const [post,setPost] = useState(null)
  const [error,setError] = useState(null)
  const [isLoading,setisLoading] = useState(false)

  const {currentUser} = useContext(UserContext)


  useEffect(()=>{
    const getPost = async ()=>{
      setisLoading(true)
      try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setPost(response.data)
        setisLoading(false)
      }
      catch(err){
        setError(err)
      }
    }
    getPost()
  },[])

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="post-detail">
    {error && <p className="error">{error}</p>}
    {post && <div className="container post-detail-container">
        <div className="post-detail-header">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt}  />
          {currentUser?.id==post?.creator && <div className="post-detail-buttons">
            <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
              Edit
            </Link>
            <DeletePost postId = {id} />
          </div>}
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail-thumbnail">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
        </div>
        <p dangerouslySetInnerHTML={{__html : post.description}}></p>
       
      </div>}
      
    </section>
  );
};

export default PostDetail;
