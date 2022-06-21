const express=require('express');
const router=express();
const bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const cors=require('cors');
router.use(cors());
const db = require('../models/index');
const {Products,CartItems,Users,Addresses,Orders} =require('../models');
const verifyWebToken = require('../JWTmiddleware/verifyToken');

//customerside products
router.get("/customerproducts",verifyWebToken,async(req,res)=>{
    console.log("customer products");
    db.sequelize.query(`select * from products where product_status='enable' and delete_status='false' order by id`)
    .then(data=>res.status(200).json(data[1].rows))
    .catch(err=>res.status(400).json({msg:err}))
})


//add product to cart
router.post("/addcart",verifyWebToken,async(req,res)=>{
    const product=await Products.findOne({where:{id:`${req.body.pid}`}})
    const cartitem={
        product_id:req.body.pid,
        user_id:req.body.uid,
        quantity:req.body.quantity,
        status:'not placed',
        total_price:req.body.quantity*product.product_price
    }
    console.log(cartitem);
    try{
        const cart=await CartItems.create(cartitem);
        res.status(200).json({msg:'product added to cart'})
    }
    catch(err)
    {
        res.status(400).json({msg:err});
    }
})

//getting cart items
router.get("/cartitems/:uid",verifyWebToken,async(req,res)=>{
    db.sequelize.query(`select cartitems.id as cart_id,products.id,products.product_name,products.product_price,cartitems.total_price,products.product_image,cartitems.quantity from products join cartitems on cartitems.product_id=products.id where cartitems.user_id=${req.params.uid} and cartitems.status='not placed'`)
    .then(data=>res.send(data[1].rows))
    .catch(err=>res.json({msg:err}));
})

//delete cart item
router.delete("/deletecartitem/:cartid",verifyWebToken,async(req,res)=>{
    db.sequelize.query(`delete from cartitems where id=${req.params.cartid}`)
    .then(data=>res.send({msg:"deleted"}))
    .catch(err=>res.send({msg:err}))
})


//filter my orders by status
router.post('/myordersbystatus/:uid',verifyWebToken,async(req,res)=>{
    var total;
    await db.sequelize.query(`select orders.id as orderid,oid,ordered_date,orders.total_price,products.product_name,products.product_price,orders.quantity,orders.total_price,orders.ordered_date,products.product_image,orders.address_id,addresses.address from orders join products on products.id=orders.product_id join addresses on addresses.id=orders.address_id where orders.order_status='${req.body.status}' and orders.user_id=${req.params.uid}`)
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


//filter products by category
router.get("/filterproducts/:cid",verifyWebToken,(req,res)=>{
    db.sequelize.query(`select * from products where category_id=${req.params.cid} order by id`)
    .then(data=>res.status(200).json(data[1].rows))
    .catch(err=>res.status(400).json({msg:{err}}))
})

//getuseraddresses
router.get('/addresses/:uid',verifyWebToken,(req,res)=>{
    db.sequelize.query(`select * from addresses where user_id=${req.params.uid} order by id`)
    .then(data=>res.status(200).json(data[1].rows))
    .catch(err=>res.status(400).json({msg:{err}}))
})


//direct create order
router.post('/directorderwithnewaddress/:uid',verifyWebToken,async(req,res)=>{
    console.log(req.body.product_id);
    console.log(req.body);
    const product=await Products.findOne({where:{id:`${req.body.product_id}`}})
    const newaddress={
        address:req.body.address,
        user_id:req.params.uid,
    }
    try{
        const address=await Addresses.create(newaddress);
        var oid;
        await db.sequelize.query(`select oid from orders order by oid desc limit 1`)
        .then(async(data)=>{
            res.send(data[1].rows)
            var order=await Orders.findOne();
            if(order)
            {
                oid=data[1].rows[0].oid+1
            }
            else{
                oid=1;
            }
            console.log(oid);
        }).catch(err=>res.send({msg:err}))
        const neworder={
            oid:oid,
            product_id:req.body.product_id,
            user_id:req.params.uid,
            quantity:req.body.quantity,
            address_id:address.id,
            ordered_date:new Date(),
            order_status:'created',
            total_price:req.body.quantity*product.product_price
        }
        console.log(neworder);
        try{
            const order=await Orders.create(neworder);
        }
        catch(err)
        {
            res.status(400).json({msg:err});
        }
        await db.sequelize.query(`update products set quantity=quantity-${req.body.quantity} where id=${req.body.product_id}`)
        .then(data=>console.log(data)).catch(err=>res.send({msg:err}))
    }
    catch(err)
    {
        res.status(400).json({msg:err});
    }
})
router.post('/directorderwithexistingaddress/:uid',verifyWebToken,async(req,res)=>{
    
    const product=await Products.findOne({where:{id:`${req.body.product_id}`}})
    var oid;
    await db.sequelize.query(`select oid from orders order by oid desc limit 1`)
    .then(async(data)=>{
        var order=await Orders.findOne();
        if(order)
        {
            oid=data[1].rows[0].oid+1
        }
        else{
            oid=1;
        }
    }).catch(err=>res.send({msg:err}))
    const neworder={
        oid:oid,
        product_id:req.body.product_id,
        user_id:req.params.uid,
        quantity:req.body.quantity,
        address_id:req.body.address_id,
        ordered_date:new Date(),
        order_status:'created',
        total_price:req.body.quantity*product.product_price
    }
    try{
        const order=await Orders.create(neworder);
       await db.sequelize.query(`update products set quantity=quantity-${req.body.quantity} where id=${req.body.product_id}`)
        .then(data=>res.status(200).json({msg:'done'})).catch(err=>res.send({msg:err}))
    }
    catch(err)
    {
        res.status(400).json({msg:err});
    }
})

//cart to orders
router.post("/carttoorderswithnewaddress/:uid",verifyWebToken,async(req,res)=>{
    // console.log(req.body);
    const newaddress={
        address:req.body.address,
        user_id:req.params.uid,
    }
    try{
        const address=await Addresses.create(newaddress);
        await db.sequelize.query(`select product_id,quantity,total_price from cartitems where user_id=${req.params.uid} and status='not placed'`)
        .then(async(data)=>{
            var oid;
           await db.sequelize.query(`select oid from orders order by oid desc limit 1`)
            .then(async(data)=>{
                var order=await Orders.findOne();
                if(order)
                {
                    oid=data[1].rows[0].oid+1
                }
                else{
                    oid=1;
                }
            }).catch(err=>res.send({msg:err}))
            for(let i=0;i<data[1].rows.length;i++)
            {
                const neworder={
                    oid:oid,
                    product_id:data[1].rows[i].product_id,
                    user_id:req.params.uid,
                    quantity:data[1].rows[i].quantity,
                    address_id:address.id,
                    ordered_date:new Date(),
                    order_status:'created',
                    total_price:data[1].rows[i].total_price
                }
                console.log(neworder);
                let ord=await Orders.create(neworder);
                await db.sequelize.query(`update products set quantity=quantity-${data[1].rows[i].quantity} where id=${data[1].rows[i].product_id}`)
                .then(data=>console.log("Done")).catch(err=>console.log(err))
            }
            await db.sequelize.query(`update cartitems set status='placed' where user_id=${req.params.uid}`)
            .then((data)=>{
                console.log("updated")
            }).catch(err=>res.status(400).json({msg:err}))
        })
        .catch(err=>res.status(400).json({msg:err}));
    }
    catch(err)
    {
        res.status(400).json({err:err})
    }

})

//cart to orders
router.post("/carttoorderswithexistingaddress/:uid",verifyWebToken,async(req,res)=>{
    console.log(req.body);
    try{
        db.sequelize.query(`select product_id,quantity,total_price from cartitems where user_id=${req.params.uid} and status='not placed'`)
        .then(async(data)=>{
            var oid;
           await db.sequelize.query(`select oid from orders order by oid desc limit 1`)
            .then(async(data)=>{
                var order=await Orders.findOne();
                if(order)
                {
                    oid=data[1].rows[0].oid+1
                }
                else{
                    oid=1;
                }
            }).catch(err=>res.send({msg:err}))
            for(let i=0;i<data[1].rows.length;i++)
            {
                const neworder={
                    oid:oid,
                    product_id:data[1].rows[i].product_id,
                    user_id:req.params.uid,
                    quantity:data[1].rows[i].quantity,
                    address_id:req.body.address_id,
                    ordered_date:new Date(),
                    order_status:'created',
                    total_price:data[1].rows[i].total_price
                }
                console.log(neworder);
                let ord=await Orders.create(neworder);
                await db.sequelize.query(`update products set quantity=quantity-${data[1].rows[i].quantity} where id=${data[1].rows[i].product_id}`)
                .then(data=>console.log("Done")).catch(err=>console.log(err))
            }
            await db.sequelize.query(`update cartitems set status='placed' where user_id=${req.params.uid}`)
            .then((data)=>{
                console.log("updated")
            }).catch(err=>res.status(400).json({msg:err}))

        })
        .catch(err=>res.status(400).json({msg:err}));
    }
    catch(err)
    {
        res.status(400).json({err:err})
    }

})

module.exports=router;