const expressRouter=require('express').Router();
const Post=require('../model/PostModel')
const auth=require('../middleware/auth')

expressRouter.get('/posts',(req,res)=>{
    const postId =  Number(req.query.id);
    let filter={}
    if(postId) {
        filter = {
            id: postId
        }
    }
    let postRequest = Post.find(filter);
    postRequest.then(postData => {
        res.status(200).json({
            message: 'Fetched posts successfully!',
            data: postData
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Failed to fetch posts!',
            error: err
        });
    });
})
expressRouter.post('/posts',auth,(req,res)=>{
    const postData=req.body;
    const post=new Post({
        tittle:postData.tittle,
        body:postData.body,
        image:postData.image,
        user:postData.user
    })
    post.save().then(userdata=>{
        res.status(201).json({
            message: "record saved successfully!",
            data: userdata
        });
    }).catch(err=>{
        res.status(500).json({
            message: "Failed to save!",
            data: err
        });
    })
})
expressRouter.put('/posts/:postId',auth,(req,res)=>{
    const postId = req.params.postId;
    const UpdateData=req.body;
    Post.findByIdAndUpdate({
        _id:postId
    },UpdateData).then(updatePost=>{
        if(!updatePost){
            res.status(404).json({
                message: "Post not found."
            })
        }
        res.status(200).json({
            message: "Post updated successfully!",
            data: updatePost
        });
    }).catch(err=>{
        res.status(500).json({
            message: "Failed to update post.",
            data: err
        });
    })
})
expressRouter.delete('/posts/:postId',auth,(req,res)=>{
    const postId=req.params.postId;
    Post.findByIdAndDelete({_id:postId}).then(response=>{
        res.status(200).json({
            message: "Record deleted successfully",
            data: response
        })
    }).catch(err=>{
        res.status(500).json({
            message:"failed to delete ",
            data:err
        })
    }).catch(err => {
        res.status(500).json({
            message: "Failed to delete!",
            data: err
        });
    });
})

module.exports=expressRouter