// ========================== Create Post
// POST : api/posts
// Protected

const createPost = async (req,res,next)=>{
    res.json("Create Post")
}


// ========================== Get All Posts
// Get : api/posts
// Unprotected

const getAllPosts = async (req,res,next)=>{
    res.json("Get All Posts")
}


// ========================== Get Single Post
// Get : api/posts/:id
// Unprotected

const getPost = async (req,res,next)=>{
    res.json("Get Post")
}



// ========================== Get Posts By Category
// GET : api/posts/categories/:category 
// Unprotected

const getCatPosts = async (req,res,next)=>{
    res.json("Get posts by category")
}



// ========================== Get Author Post
// GET : api/posts/users/:id
// Unprotected

const getUserPosts = async (req,res,next)=>{
    res.json("Get User Posts")
}



// ========================== Edit Post
// PATCH : api/posts/:id
// Protected

const editPost = async (req,res,next)=>{
    res.json("Edit Post")
}



// ========================== Create Post
// Delete : api/posts/:id
// Protected

const deletePost = async (req,res,next)=>{
    res.json("Delete Post")
}



module.exports = {deletePost,editPost,getCatPosts,getUserPosts,getPost,getAllPosts,createPost}