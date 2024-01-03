import React, { useContext, useEffect } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useNavigate } from "react-router-dom";
import Thumbnail from "../images/blog22.jpg";
import { UserContext } from "../context/UserContext";

const PostDetail = () => {

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
    <section className="post-detail">
      <div className="container post-detail-container">
        <div className="post-detail-header">
          <PostAuthor />
          <div className="post-detail-buttons">
            <Link to={`posts/werwer/edit`} className="btn sm primary">
              Edit
            </Link>
            <Link to={`posts/werwer/delete`} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>This is the post title</h1>
        <div className="post-detail-thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
          distinctio reiciendis. Magni modi aliquid, facilis amet officia ipsam!
          Odit unde nisi illum praesentium, itaque reprehenderit, officiis optio
          expedita blanditiis porro aspernatur neque tempore perferendis.
          Facilis, a? Qui tenetur adipisci illum!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          porro commodi cum sunt quos voluptates, temporibus sed corporis magni
          exercitationem distinctio ab eum asperiores odio, tempora quidem
          inventore placeat neque consequatur nam quisquam! Sequi, eligendi!
          Veniam voluptas, similique architecto nulla hic dignissimos porro
          accusantium odio nobis vero ex quidem id, ratione in earum doloribus
          dolore?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          beatae, dolorem molestias numquam odio, ipsa quisquam tempore nisi
          dolorum exercitationem animi dolore accusamus est. Tempore non
          deserunt saepe aspernatur vero natus dolores nam architecto nisi
          minima exercitationem provident quisquam dicta earum, sunt esse quod
          sed incidunt optio reprehenderit fuga labore sequi facilis odit. Harum
          dolorum necessitatibus nam soluta recusandae rerum error excepturi
          accusantium autem vel ut, iste voluptates quaerat neque adipisci
          earum! Mollitia, ullam. Inventore deleniti ratione explicabo, unde,
          voluptatem quia suscipit earum nemo sunt repellendus aspernatur maxime
          incidunt ipsum iusto ducimus, quas provident consectetur error
          sapiente exercitationem magni laudantium nostrum? Facilis architecto
          eveniet ad dolores, labore laboriosam itaque quisquam quasi
          perspiciatis quas exercitationem magnam maiores odio ab, perferendis
          delectus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsum
          voluptate repellendus fuga doloremque nisi quia labore, earum
          explicabo aut!
        </p>
      </div>
    </section>
  );
};

export default PostDetail;
