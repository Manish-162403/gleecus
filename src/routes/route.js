const express = require('express');
const router = express.Router();
const gleecus = require('../model/gleecus')



router.get('/allpost', async (req, res) => {  
    try{
        let page = req.query.page ?? 1;
        let limit = 4;
        const post = await gleecus.find().skip((page * limit) - limit).limit(limit)
        res.status(200).send(post)
    }catch(error){
        res.status(500).send({message:error})
    }
})




module.exports= router;