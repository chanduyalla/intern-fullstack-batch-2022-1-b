const express=require('express');
const router=express();
const bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const cors=require('cors');
router.use(cors());
const db = require('../models/index');
const {Products,Cart,Users,Addresses,Orders} =require('../models');
const verifyWebToken = require('../jwtmiddleware/verifyToken');

//add product to cart
router.post("/addcart",verifyWebToken,async(req,res)=>{
    const cartitem={
        product_id:req.body.pid,
        user_id:req.body.uid,
        quantity:req.body.quantity,
        flag:'not placed'
    }
    console.log(cartitem);
    try{
        const cart=await Cart.create(cartitem);
        const address={
            address:req.body.address,
            pincode:req.body.pincode,
            user_id:req.body.uid,
            cart_id:cart.id
        }
        const loc=await Addresses.create(address);
        res.status(200).json({msg:'product added to cart'})
    }
    catch(err)
    {
        res.status(400).json({msg:err});
    }
})

//getting cart items
router.get("/cartitems/:uid",verifyWebToken,async(req,res)=>{
         db.sequelize.query(`select * from products join cartitems on cartitems.product_id=products.id where cartitems.user_id=${req.params.uid} and cartitems.flag='not placed'`)
         .then(data=>res.send(data[1].rows))
         .catch(err=>res.json({msg:err}));
})

//place order
router.post("/placeorder/:uid",verifyWebToken,async(req,res)=>{
    const uid=req.params.uid;
    try{
        db.sequelize.query(`select cartitems.product_id,cartitems.user_id,addresses.id as location_id,cartitems.quantity from cartitems join addresses on cartitems.id=addresses.cart_id where cartitems.user_id=${uid} and flag='not placed';`)
        .then(async(data)=>{
            for(let i=0;i<data[1].rows.length;i++)
            {
                data[1].rows[i].status='placed';
                let ord=await Orders.create(data[1].rows[i]);
                db.sequelize.query(`update products set quantity=quantity-${data[1].rows[i].quantity} where id=${data[1].rows[i].product_id}`)
                .then(data=>console.log(data)).catch(err=>console.log(err))
            }
            await db.sequelize.query(`update cartitems set flag='placed' where user_id=${uid}`)
            .then(data=>{res.status(200).json({msg:'cart items updated and placed orders created'});}).catch(err=>res.status(400).json({msg:err}))

        })
        .catch(err=>res.status(400).json({msg:err}))
        // const cart=Cart.findAll({where:{user_id:uid}})
        // res.status(200).json({cart:cart});
    }
    catch(err)
    {
        res.status(400).json({err:err})
    }

})

router.get("/myorders/:uid",verifyWebToken,async(req,res)=>{
    db.sequelize.query(`select * from products join orders on products.id=orders.product_id where orders.user_id=${req.params.uid}`)
    .then(data=>res.status(200).json(data[1].rows))
    .catch(err=>res.status(400).json({msg:{err}}))
})

router.get("/filterproducts/:cname",verifyWebToken,(req,res)=>{
    console.log(req.params.cname);
    db.sequelize.query(`select products.status,products.name,products.price,products.quantity from products join categories on products.category_id=categories.id where categories.name='${req.params.cname}' order by products.id`)
    .then(data=>res.status(200).json(data[1].rows))
    .catch(err=>res.status(400).json({msg:{err}}))
})

module.exports=router;