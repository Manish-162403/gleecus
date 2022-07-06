const express = require('express');
const router = express.Router();
const gleecus = require('../model/gleecus')
// const axios = require("axios");
// var cors = require("cors");

// const CLIENT_ID = "e4fc4c549d7eff22f23b";
// const CLIENT_SECRET = "6a94eb52b8fbdfc04a071a784bb709c5ed7b6b56";
// const GITHUB_URL = "https://github.com/login/oauth/access_token";


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

// app.get("/oauth/redirect", (req, res) => {
//     axios({
//       method: "POST",
//       url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
//       headers: {
//         Accept: "application/json",
//       },
//     }).then((response) => {
//       res.redirect(
//         `http://localhost:3000?access_token=${response.data.access_token}`
//       );
//     });
//   });
  



module.exports= router;