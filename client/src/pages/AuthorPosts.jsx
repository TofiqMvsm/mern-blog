import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import axios from 'axios';
import Loader from "../components/Loader"
import { useParams } from 'react-router-dom';
const AuthorPosts = () => {
  const {id} = useParams()
  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`
        );
        
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      }
      setisLoading(false);
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts-container">
          {posts.map(
            ({ _id : id, thumbnail, category, title, description, creator : authorID, createdAt}) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                description={description}
                authorID={authorID}
                title={title}
                category={category}
                createdAt={createdAt}
                
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No Posts Found</h2>
      )}
    </section>
  );
}

export default AuthorPosts