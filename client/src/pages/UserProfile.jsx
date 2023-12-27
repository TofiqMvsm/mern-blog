import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../images/avatar15.jpg";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
const UserProfile = () => {
  const [avatar,setAvatar] = useState(Avatar)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [currentPassword,setCurrentPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  return (
    <section>
      <div className="container profile-container">
        <Link to={"/myposts/asdasdasd"} className="btn">
          My Posts
        </Link>
        <div className="profile-details"> 
          <div className="avatar-wrapper">
            <div className="profile-avatar">
              <img src={avatar} alt="" />
            </div>
            {/* Form to update Avatar */}
            <form className="avatar-form">
              <input type="file" name="avatar" onChange={e=>setAvatar(e.target.files[0])} id="avatar" accept="jgp, png, jpeg"/>
              <label htmlFor="avatar"><FaEdit/></label>
            </form>
            {/* <button className="profile-avatar-btn"><FaCheck/></button> */}
          </div>
          <h1>Tofiq Movsumov</h1>

          {/* form to update user details */}
          <form className="form profile-form">
            <p className="form-error-message">
              This is an error message
            </p>
            <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input type="password" placeholder="Current Password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} />
            <input type="password" placeholder="New Password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
      <button type="submit" className="btn primary">Update Details</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
