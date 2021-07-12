const router = require("express").Router();
const Post = require("../Model/Post"); //loading Post Schema

/*========================GET ROUTE HERE ========================*/
router.get("/all-posts", async (req, res) => {
  try {
    let posts = await Post.find({}).sort({ date: "-1" });
    res.status(201).json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json("SERVER ERROR");
  }
});

// for to get one objects using findOne() method to display individual data of the post
router.get("/post/:id", async (req,res) => {
  try {
    let post = await Post.findOne({ _id: req.params.id });
    // console.log(post);
    res.status(201).json( post );
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});

/*========================POST ROUTE HERE ========================*/
router.post("/add-post", async (req, res) => {
  let { title, details } = req.body;
  try {
    let newPost = new Post({
      title,
      details,
    });
    //save into database
    await newPost.save();
    return res.status(201).json({ msg: "Successfully post created" });
  } catch (err) {
    console.error(err);
    res.status(500).json("SERVER ERROR");
  }
});

/*========================PUT ROUTE HERE ========================*/

router.put("/edit-post/:id", async (req, res) => {
  try {
    let updatePost = Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        details: req.body.details,
      },
      { new: true }
    );
    //save or update  into database
    await (await updatePost).save();
    return res.status(201).json({ msg: "successfully posts updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json("SERVER ERROR");
  }
});

router.get("/post/:id", async (req, res) => { try { let post = await Post.findOne({ _id: req.params.id }); console.log(post); res.status(201).json({ post }); } catch (err) { console.error(err); res.status(500).json("SERVER ERROR"); } });

/*========================DELETE ROUTE HERE ========================*/

router.delete("/delete-post/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete({ _id: req.params.id });
    return res.status(201).json({ msg: "successfully post deleted" });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
