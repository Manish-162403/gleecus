const express = require('express');
const router = express.Router();
const gleecus = require('../model/gleecus')
const jwt = require('jsonwebtoken')

   const isValid = function (value) {
    if (typeof value == 'undefined' || value === null) return false
    if (typeof value == 'string' && value.trim().length === 0) return false
    return true
}

router.post( "/logIn" , async (req, res) => {
    try {
        let body = req.body
        if (!body)
            return res.status(400).send({ status: false, msg: "invalid request parameter, please provide login details" })

        const { email, password } = body

        if (isValid(email))
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)))
            return res.status(400).send({ status: false, msg: "email is not a valid " })

        if (!isValid(email))
            return res.status(400).send({ status: false, msg: "please enter email" })

        if (!isValid(password))
            return res.status(400).send({ status: false, msg: "please enter password" })

        var token = jwt.sign({

            email: email,

        }, "gleecus")//secret key
       
        res.setHeader("authorization", token) // look ion the postman body header

        return res.status(200).send({ status: true, msg: "user loing successfully", data: token })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

})
////////////////////////////////////////////////////////////////////////////////

const authentication = function (req, res, next) {
    try {
        const token = req.headers["authorization"]
        if (!token) {
            return res.status(400).send({ status: false, message: "token must be present" });
        }
        const bearer=token.split(' ')
        const bearerToken=bearer[1]
        const decodedToken = jwt.verify(bearerToken, "gleecus");

        if (!decodedToken) {
            return res.status(400).send({ status: false, message: "token is invalid" });
        }
        next();
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ msg: err.message })
    }

}
/////////////////////////////////////////////////////////////////
router.get('/allpost',authentication, async (req, res) => {  
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