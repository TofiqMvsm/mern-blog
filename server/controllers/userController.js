//  ========================== Register a new user
// POST : /api/users/register
// UNPROTECTED
const registerUser = async (req,res,next)=>{
    res.json("Register User ")
}





//  ========================== Login user
// POST : /api/users/login
// UNPROTECTED
const loginUser = async (req,res,next)=>{
    res.json("Login User")
}







//  ========================== User Profile
// POST : /api/users/:id
// PROTECTED
const getUser = async (req,res,next)=>{
    res.json("User Profile")
}







//  ========================== Edit User
// POST : /api/users/edit-user
// PROTECTED
const editUser = async (req,res,next)=>{
    res.json("Edit User details")
}








//  ========================== Get All Authors
// POST : /api/users/authors
// UNPROTECTED
const getAuthors = async (req,res,next)=>{
    res.json("Get all authors/users")
}







//  ========================== Change Avatar 
// POST : /api/users/change-avatar
// PROTECTED
const changeAvatar = async (req,res,next)=>{
    res.json("Change User Avatar")
}





module.exports = {registerUser,loginUser,changeAvatar,getUser,getAuthors,editUser}