const express=require('express');
const router=express();
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const cors=require('cors');
router.use(cors());
const bcrypt=require('bcrypt');
require('dotenv').config();
const client = require('twilio')(process.env.accountSID,process.env.authToken);
const {Users,Roles}=require('../models');

router.post("/",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await Users.findOne({where:{email:email}});
        if(user){
            const validpassword=bcrypt.compareSync(password,user.password);
            if(validpassword)
            {
                const r=await Roles.findOne({where:{id:user.role_id}});
                jwt.sign({user},'this is secret key',(err,token)=>{
                    if(!err)
                    {
                        client.verify
                            .services(process.env.serviceSID)
                            .verifications
                            .create({
                                to: "+91" + user.dataValues.phone_number,
                                channel: 'sms',
                            }).then(data => {res.status(200).json({uid:user.id,role:r.role_name,Token:token,uname:user.user_name})})
                    }
                    else{
                        res.status(400).json({msg:"token not"})
                    }
                })
            }
            else{
                res.status(400).json({msg:'Wrong Password'})
            }
        }
        else{
            res.status(404).json({msg:'User not found'})
        }
    }
    catch(err){
        console.log(err);
    }
})


module.exports=router;