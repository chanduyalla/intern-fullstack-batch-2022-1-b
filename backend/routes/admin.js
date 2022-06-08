const express=require('express');
const router=express();
const bodyParser=require('body-parser');
const cors=require('cors');
router.use(cors());
const verifyWebToken = require('../jwtmiddleware/verifyToken');
const db = require('../models/index');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const bcrypt=require('bcrypt');
const {Users,Categories,Products,Orders} =require('../models');

//add categories
router.post("/addcategory",verifyWebToken,async(req,res)=>{
    console.log(req.body);
    try{
        const temp=await Categories.findOne({where:{name:req.body.name}});
        if(temp)
        {
            res.status(400).json({msg:"Category already existed with this name"})
        }
        else{
            const category=await Categories.create(req.body);
            res.status(200).json({msg:'category added'});
        }
    }
    catch(err){
        res.json({err:err});
    }
})

//get categories
router.get("/categories",verifyWebToken,async(req,res)=>{
    try{
        const categories=await Categories.findAll();
        res.send(categories);
    }
    catch(err)
    {
        res.status(400).json({err:err});
    }
})

//adding new product
router.post("/addproduct",verifyWebToken,async(req,res)=>{
    const categoryname=req.body.category;
    const category=await Categories.findOne({where:{name:categoryname}});
    const newproduct={
        name:req.body.name,
        price:req.body.price,
        status:'enable',
        quantity:req.body.quantity,
        category_id:category.id
    }
    try{
        var product=await Products.create(newproduct);
        res.json({msg:"product added"})
    }
    catch(err)
    {
        res.status(400).json({err})
    }
})

// listout all products
router.get("/products",verifyWebToken,async(req,res)=>{
    db.sequelize.query(`select * from products order by id`)
    .then(data=>res.status(200).json(data[1].rows))
    .catch(err=>res.status(400).json({msg:err}))
})

//list products category wise
router.get("/products/:categoryid",verifyWebToken,async(req,res)=>{
    try{
        const p=await Products.findOne({where:{role_id:req.params.categoryid}});
        res.send(p);
    }
    catch(err)
    {
        res.status(400).json({err});
    }
})


//disabling product
router.put("/productstatus/:id",verifyWebToken,async(req,res)=>{
    try{
        const product=await Products.findOne({where:{id:req.params.id}});
        if(product.status==='enable')
        {
            product.status='disable'
        }
        else if(product.status==="disable"){
            product.status="enable"
        }
        await product.save();
        res.json({msg:'product status updated'})
    }
    catch(err)
    {
        res.status(400).json({err})
    }
})

//delete product
router.delete("/deleteproduct/:pid",verifyWebToken,(req,res)=>{
    // console.log(req.params.pid);
    db.sequelize.query(`delete from products where id=${req.params.pid}`)
    .then(data=>res.send({msg:"deleted"}))
    .catch(err=>res.send({msg:err}))
})

//edit product details
router.put("/editproduct/:id",verifyWebToken,async(req,res)=>{
    const category=await Categories.findOne({where:{name:req.body.category}});
    try{
        const product=await Products.findOne({where:{id:req.params.id}});
        product.name=req.body.name;
        product.price=req.body.price;
        product.quantity=req.body.quantity;
        product.category_id=category.id
        await product.save();
        res.json({msg:"product details updated"})
    }
    catch(err){
        res.status(400).json({err});
    }
})


//adding new driver
router.post("/adddriver",verifyWebToken,async(req,res)=>{
    try{
        const temp=await Users.findOne({where:{email:req.body.email}})
        if(temp){
            res.status(400).json({msg:"Driver already existed with this email"})
        }
        else{
            const password=bcrypt.hashSync(req.body.password,10);
            const newdriver={
                name:req.body.name,
                email:req.body.email,
                password:password,
                phone_number:req.body.phone_number,
                role_id:2
            }
            const driver=await Users.create(newdriver);
            res.status(200).json({msg:"new driver added"})
        }
    }
    catch(err){
        res.status(400).json({msg:err});
    }
})

//all orders

router.get("/placedorders",verifyWebToken,async(req,res)=>{
    db.sequelize.query(`select * from products join orders on products.id=orders.product_id where orders.status='placed'`)
    .then(data=>res.status(200).json(data[1].rows))
    .catch(err=>res.status(400).json({msg:{err}}))
})

router.post("/changeorderstatus/:oid",verifyWebToken,async(req,res)=>{
    console.log(req.body.status,req.params.oid);
    db.sequelize.query(`update orders set status='${req.body.status}' where id=${req.params.oid}`)
    .then(data=>res.status(200).json({msg:"update status"}))
    .catch(err=>res.status(400).json({msg:{err}}))
})
router.get("/filterordersbystatus/:status",verifyWebToken,async(req,res)=>{
    db.sequelize.query(`select * from products join orders on products.id=orders.product_id where orders.status='${req.params.status}'`)
    .then(data=>res.status(200).json(data[1].rows))
    .catch(err=>res.status(400).json({msg:{err}}))
})
module.exports=router;