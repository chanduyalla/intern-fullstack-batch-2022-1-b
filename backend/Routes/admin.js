const express=require('express');
const router=express();
const bodyParser=require('body-parser');
const cors=require('cors');
router.use(cors());
const verifyWebToken = require('../JWTmiddleware/verifyToken');
const db = require('../models/index');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const bcrypt=require('bcrypt');
const {Users,Categories,Products,Orders} =require('../models');

//add categories
router.post("/addcategory",verifyWebToken,async(req,res)=>{
    console.log(req.body);
    try{
        const temp=await Categories.findOne({where:{category_name:req.body.category_name}});
        if(temp)
        {
            res.status(400).json({msg:"Category already existed with this name"})
        }
        else{
            const category=await Categories.create(req.body);
            console.log("added");
            res.status(200).json({msg:'category added'});
        }
    }
    catch(err){
        res.json({msg:err});
    }
})
//finding edit product
router.get("/findeditproduct/:pid",verifyWebToken,async(req,res)=>{
    console.log(req.params.pid);
        await db.sequelize.query(`select * from products where id=${req.params.pid}`)
        .then(data=>res.send(data[1].rows[0]))
        .catch(err=>res.send({msg:err}))
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
                user_name:req.body.user_name,
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


//get all categories
router.get("/allcategories",verifyWebToken,async(req,res)=>{
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
    const category=await Categories.findOne({where:{category_name:categoryname}});
    const newproduct={
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        product_status:'enable',
        product_image:req.body.imgurl,
        quantity:req.body.quantity,
        delete_status:'false',
        category_id:category.id
    }
    try{
        var product=await Products.create(newproduct);
        res.json({msg:"product added"})
    }
    catch(err)
    {
        res.status(400).json({msg:err})
    }
})

// listout all products
router.get("/allproducts",verifyWebToken,async(req,res)=>{
    db.sequelize.query(`select * from products order by id`)
    .then(data=>res.status(200).json(data[1].rows))
    .catch(err=>res.status(400).json({msg:err}))
})

//category wise products
router.get("/categorywiseproducts/:cid",verifyWebToken,async(req,res)=>{
    db.sequelize.query(`select * from products where category_id=${req.params.cid} and delete_status='false' order by id`)
    .then(data=>res.status(200).json(data[1].rows))
    .catch(err=>res.status(400).json({msg:err}))
})

//disabling/enabling product
router.put("/productstatus/:pid",verifyWebToken,async(req,res)=>{
    try{
        const product=await Products.findOne({where:{id:req.params.pid}});
        if(product.product_status==='enable')
        {
            product.product_status='disable'
        }
        else if(product.product_status==="disable"){
            product.product_status="enable"
        }
        await product.save();
        res.json({msg:'product status updated'})
    }
    catch(err)
    {
        res.status(400).json({msg:err})
    }
})


//deleteproduct
router.put("/deleteproduct/:pid",verifyWebToken,async(req,res)=>{
    console.log(req.params.pid);
    try{
        const product=await Products.findOne({where:{id:req.params.pid}});
        product.delete_status='true'
        product.deleted_at=new Date();
        await product.save();
        res.json({msg:'product deleted'})
    }
    catch(err)
    {
        res.status(400).json({msg:err})
    }
})

//all newly created orders
router.get('/allcreatedorders',verifyWebToken,async(req,res)=>{
    var total;
    var sumprice;
     await db.sequelize.query(`select oid,ordered_date,orders.id as orderid,orders.total_price,products.product_name,products.product_price,orders.quantity,orders.total_price,orders.ordered_date,products.product_image,orders.address_id,addresses.address from orders join products on products.id=orders.product_id join addresses on addresses.id=orders.address_id where orders.order_status='created'`)
    .then(data=>total=data[1].rows)
    .catch(err=>res.status(400).json({msg:err}))
    await db.sequelize.query(`select sum(total_price) as sum_totalprice from orders where order_status='created' group by oid order by oid`)
    .then(data=>sumprice=data[1].rows)
    .catch(err=>res.status(400).json({msg:err}))
    const orders=[];
    var oids=[];
    await db.sequelize.query(`select distinct(oid) from orders where order_status='created' order by oid`)
    .then(data=>{
        data[1].rows.map((e,i)=>{
            oids.push(e.oid);
        })
        oids.map((o,i)=>{
            var ob=[];
            total.map((t,j)=>{
                if(t.oid==o)
                {
                    ob.push(t);
                }
            })
            orders.push(ob);
        })
        res.json({orders,oids,sumprice});
    })
})


//all  out for deliver/delivered/canceled orders
router.post('/allselectedtypeorder',verifyWebToken,async(req,res)=>{
    var total;
   await db.sequelize.query(`select orders.id as orderid,oid,ordered_date,orders.total_price,products.product_name,products.product_price,orders.quantity,orders.total_price,orders.ordered_date,products.product_image,orders.address_id,addresses.address from orders join products on products.id=orders.product_id join addresses on addresses.id=orders.address_id where orders.order_status='${req.body.status}'`)
    .then(data=>total=data[1].rows)
    .catch(err=>res.status(400).json({msg:err}))
    var sumprice;
    await db.sequelize.query(`select sum(total_price) as sum_totalprice from orders where order_status='${req.body.status}' group by oid order by oid`)
    .then(data=>sumprice=data[1].rows)
    .catch(err=>res.status(400).json({msg:err}))
    const orders=[];
    var oids=[];
    await db.sequelize.query(`select distinct(oid) from orders where order_status='${req.body.status}' order by oid`)
    .then(data=>{
        data[1].rows.map((e,i)=>{
            oids.push(e.oid);
        })
        oids.map((o,i)=>{
            var ob=[];
            total.map((t,j)=>{
                if(t.oid==o)
                {
                    ob.push(t);
                }
            })
            orders.push(ob);
        })
        res.json({orders,sumprice});
    })
})


//changestatusoforder
router.put('/changeorderstatus/:oid',verifyWebToken,async(req,res)=>{
    console.log(req.body);
    try{
        const orders=await Orders.findAll({where:{oid:req.params.oid}});
        orders.map((order,i)=>{
            order.order_status=req.body.status;
            order.save();
        })
        res.json({msg:"suceess"})
    }
    catch(err)
    {
        res.status(400).json({msg:err})
    }
})

module.exports=router;