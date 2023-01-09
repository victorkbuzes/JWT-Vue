const Post = require("../model/Post");

module.exports.posts =  async(req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        date: new Date(req.body.date)


    });
    try {
        const savePost = await post.save();
        res.json(savePost)
        
    } catch (error) {
        res.json({ message: error})
        
    }
}

module.exports.getPost =   async(req, res) => {
    const post = await Post.find({})
    // console.log(post);
    res.send(post)
   
}

