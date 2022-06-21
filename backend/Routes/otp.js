const express=require('express');
const router=express();
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const cors=require('cors');
const verifyWebToken = require('../JWTmiddleware/verifyToken');
router.use(cors());
require('dotenv').config();
const client = require('twilio')(process.env.accountSID,process.env.authToken);
const {Users}=require('../models');

router.post('/checkotp',verifyWebToken,async(req,res)=>{
    try{
        console.log(req.body);
        const user=await Users.findOne({where:{id:req.body.uid}})
        client.verify
        .services(process.env.serviceSID)
        .verificationChecks
        .create({
            to: "+91" + user.dataValues.phone_number,
            code: req.body.otp
            }).then(data => {
                if (data.valid) {
                    res.status(200).json("success")
                }
                else {
                        res.status(400).json({ message: "unsuccess" })
                    }
            })
    }
    catch(err)
    {
        res.status(400).json({msg:err})
    }
})

module.exports=router;