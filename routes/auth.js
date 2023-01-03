const router = require('express').Router()
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const {registerValidation,loginValidation} = require('../validateion')
const JWT = require('jsonwebtoken')



router.post('/register',async (req,res)=>{

    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const emailExits = await userModel.findOne({email:req.body.email})
    if(emailExits) return res.status(400).send('Email already exits ')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new userModel({
                name:req.body.name,
                 email:req.body.email,
                 password:hashedPassword
            })

            try{
                const saveUser = await newUser.save()
                res.status(200).send(saveUser)
            }catch(e){
                res.status(400).send(e)
            }
})


router.post('/login',async (req,res)=>{
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await userModel.findOne({email: req.body.email})
    if(!user) return res.status(400).send("Invalid Email")

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(200).send("Password valid")

    const token = JWT.sign({_id: user._id},process.env.TOKEN_SECRET)
    res.header("auth-token",token).send(token)
    if(!token)  return res.status(401).send("Access-Denied")

    try{
            const verfied = JWT.verify(token, process.env.TOKEN_SECRET)
            req.user = verfied
    }catch(e){
         res.status(401).send(`Invalid User ${e.message}`)
    }
})



module.exports = router