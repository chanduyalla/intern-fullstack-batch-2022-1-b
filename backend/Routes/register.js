const express=require('express');
const router=express();
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const cors=require('cors');
router.use(cors());
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const {Users}=require('../models');

//new customer registration
router.post("/",async(req,res)=>{
    console.log(req.body);
    try{
        var u=await Users.findOne({where:{email:req.body.email}});
        if(!u){
            const password=bcrypt.hashSync(req.body.password,10);
            const newuser={
                user_name:req.body.user_name,
                email:req.body.email,
                password:password,
                phone_number:req.body.phone_number,
                role_id:3
            }
            var user=await Users.create(newuser);
            res.status(200).json({msg:"new user added"})
        }
        else{
            res.status(400).json({msg:"User already existed with this email"})
        }
    }
    catch(err){
        res.status(400).json({msg:err})
    }
})

module.exports=router;