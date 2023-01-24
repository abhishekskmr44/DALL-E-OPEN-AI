import express from 'express';

import * as dotenv from 'dotenv';

import { v2 as cloudinary }  from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

    api_key: process.env.CLOUDINARY_API_KEY,

   api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS

router.route('/').get(async(req,response)=>{
    try {
        const posts = await Post.find({});

        response.status(200).json({success: true, data:posts})
    } catch (error) {
        response.status(500).json({success: false, message:error})
    }

});


// CREATE A POST

router.route('/').get(async(req,response)=>{
 
    try {
           // we're sending it from the from the front end
        //    here we are getting the entire post
  const {name, prompt, photo} = req.body;

  //   we need to upload photo URL to cloudinary
  const photoUrl = await cloudinary.uploader.upload(photo);
  
  // now we have data and newly updated photoUrl
  const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
  })
  
  response.status(201).json({success:true, data: newPost})
    } catch (error) {
        
        response.status(500).json({success: false, message:error})
    }
});





// exporting
export default router;