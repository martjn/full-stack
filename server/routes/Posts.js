const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll()
  res.json(listOfPosts)
});
router.get("/:id", async (req, res) => {
  const post = await Posts.findOne({
    where: {
      id: req.params.id
    }
  })
  res.json(post)
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

router.put("/:id", async (req, res) => {
  try{

    const post = await Posts.findOne({
      where: {
        id: req.params.id,
      }
    })

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if(post.username === req.body.username){

      post.set({
        title: req.body.title,
        postText: req.body.postText,
        username: req.body.username
      })
    
      await post.save();
    
      res.json(req.body);
    }
    else{
      res.json({error: "unauthorized"})
    }
  
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: error})
  }


})

module.exports = router;
