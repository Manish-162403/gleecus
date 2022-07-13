const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest ,(req, res) => {
    res.render('login')
  })

router.get("/log",ensureAuth, async(req,res)=>{
   
    res.sendFile('./data.js', {root: __dirname})
})
module.exports=router;