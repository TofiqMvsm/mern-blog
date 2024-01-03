import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Loader from "./Loader";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        console.log(response.data)
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      }
      setisLoading(false);
    };
    fetchPost();
  }, []);

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
};

export default Posts;
