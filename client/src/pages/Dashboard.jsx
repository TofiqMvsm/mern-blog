import React, { useContext, useEffect, useState } from "react";
import { DUMMY_POSTS } from "../data";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  
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
    <section>
      {posts.length ? (
        <div className="container dashboard-container">
          {posts.map((post) => {
            return (
              <article key={post.id} className="dashboard-post">
                <div className="dashboard-post-info">
                  <div className="dashboard-post-thumbnail">
                    <img src={post.thumbnail} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard-post-actions">
                  <Link to={`/posts/${post.id}`} className="btn sm">View</Link>
                  <Link to={`/posts/${post.id}/edit`} className="btn sm primary">Edit</Link>
                  <Link to={`/posts/${post.id}/delete`} className="btn sm danger">Delete</Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2>You have no post yet.</h2>
      )}
    </section>
  );
};

export default Dashboard;
