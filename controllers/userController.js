// const userModel = require('../models/userModel')


// module.exports = {

//     register: async (req,res)=>{

//     const newUser = new userModel({
//         name:req.body.name,
//         email:req.body.email,
//         password:hashedPassword
//     })
 
//     try{  
//         const saveUser = await newUser.save()
//         res.status(200).send(saveUser)
 
//     }catch(e){
//         res.status(400).send(e.message)
//     }
//     },


//     login: async (req,res)=>{

//     }
// }