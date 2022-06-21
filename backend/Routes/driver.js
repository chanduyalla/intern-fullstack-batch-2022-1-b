const express=require('express');
const router=express();
const bodyParser=require('body-parser');
const cors=require('cors');
router.use(cors());
const verifyWebToken = require('../JWTmiddleware/verifyToken');
const db = require('../models/index');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const {Driver,Orders,Routes} =require('../models');
const distance=require('google-distance-matrix');
require('dotenv').config()

//all newly accepted orders
router.get('/allaccptedorders',verifyWebToken,async(req,res)=>{
    var total;
    await db.sequelize.query(`select orders.id as orderid,oid,ordered_date,orders.total_price,products.product_name,products.product_price,orders.quantity,orders.total_price,orders.ordered_date,products.product_image,orders.address_id,addresses.address from orders join products on products.id=orders.product_id join addresses on addresses.id=orders.address_id where orders.order_status='accepted'`)
    .then(data=>total=data[1].rows)
    .catch(err=>res.status(400).json({msg:err}))
    var sumprice;
    await db.sequelize.query(`select sum(total_price) as sum_totalprice from orders where order_status='accepted' group by oid order by oid`)
    .then(data=>sumprice=data[1].rows)
    .catch(err=>res.status(400).json({msg:err}))
    const orders=[];
    var oids=[];
    await db.sequelize.query(`select distinct(oid) from orders where order_status='accepted' order by oid`)
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

//change order status accepted to out for delivery
router.put('/changeorderstatus/:oid',verifyWebToken,async(req,res)=>{
    const obj={
        oid:req.params.oid,
        driver_id:req.body.uid,
        flag:'false',
    }
    try{
        const orders=await Orders.findAll({where:{oid:req.params.oid}});
        orders.map((order,i)=>{
            order.order_status=req.body.status;
            order.save();
        })
        const driver=await Driver.create(obj);
        res.json({msg:"suceess"})
    }
    catch(err)
    {
        res.status(400).json({msg:err})
    }
})


//driver selected orders
router.get('/allselectedorders/:did',verifyWebToken,async(req,res)=>{
    console.log("hi");
    var total;
    await db.sequelize.query(`select products.product_name,orders.ordered_date,drivers.oid,products.product_price,addresses.address,orders.quantity,orders.total_price,users.user_name,products.product_image from orders,products,drivers,addresses,users where drivers.driver_id=${req.params.did} and orders.oid=drivers.oid and products.id=orders.product_id and addresses.id=orders.address_id and users.id=orders.user_id and drivers.flag='false'`)
    .then(data=>total=data[1].rows)
    .catch(err=>res.status(400).json({msg:err}))
    var sumprice;
    await db.sequelize.query(`select sum(total_price) as sum_totalprice from orders where order_status='out for delivery' group by oid order by oid`)
    .then(data=>sumprice=data[1].rows)
    .catch(err=>res.status(400).json({msg:err}))
    const orders=[];
    var oids=[];
    await db.sequelize.query(`select distinct(oid) from drivers where flag='false' order by oid`)
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

//creating route for selected orders
router.get('/route/:did',verifyWebToken,async(req,res)=>{
    var total;
    distance.key(process.env.GPIKEY);
    distance.units('metric');
    var origins = [`Kakinada, Andhra Pradesh, India`];
    var destinations=[];
    var temp=[];
    await db.sequelize.query(`select distinct(oid),address,address_id from orders,addresses where orders.user_id=addresses.user_id and addresses.id=address_id`)
    .then(async(data)=>{
        total=data[1].rows
    })
    .catch(err=>res.status(400).json({msg:err}))
    var oids=[];
    await db.sequelize.query(`select distinct(oid) from drivers where flag='false' and driver_id=${req.params.did}`)
    .then(data=>{
        data[1].rows.map((e,i)=>{
            oids.push(e.oid);
        })})
    .catch(err=>res.status(400).json({msg:err}))
    oids.map((o,i)=>{
        total.map((t,j)=>{
            if(t.oid==o)
            {
                destinations.push(t.address);
            }
        })
    })
     console.log(destinations,oids);
   await db.sequelize.query(`update drivers set flag='true' where driver_id=${req.params.did}`)
    .then(data=>console.log(data)).catch(err=>res.status(400).json({msg:err}))
    distance.matrix(origins, destinations, function (err, distances) {
        console.log(distances);
        if (err) {
            return console.log(err);
        }
        if (!distances) {
            return console.log('no distances');
        }
        if (distances.status == 'OK') {
            for (var i = 0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var distance = distances.rows[i].elements[j].distance.value;
                        distance=distance/1000;
                         var route={
                            driver_id:req.params.did,
                            destination:destination,
                            oid:oids[j],
                            flag:'false',
                            distance_in_km:distance,
                        }
                        const newroute=Routes.create(route);
                    } else {
                        console.log(
                            destination + ' is not reachable by land from ' + origin
                        );
                    }
                }
            }
        }
    });
})

//getting route data
router.get('/routesdata/:did',verifyWebToken,async(req,res)=>{
    var total;
   await db.sequelize.query(`select products.product_name,products.product_price,routes.oid,orders.ordered_date,orders.quantity,orders.total_price,users.user_name,users.phone_number,routes.destination,routes.distance_in_km,routes.flag,routes.id as route_id from products,orders,users,routes where routes.driver_id=${req.params.did} and products.id=orders.product_id and orders.oid=routes.oid and users.id=orders.user_id order by routes.flag,distance_in_km`)
   .then(data=>total=data[1].rows)
   .catch(err=>res.send({msg:err}))
   var sumprice;
    await db.sequelize.query(`select sum(total_price) as sum_totalprice from orders where order_status='out for delivery' or order_status='delivered' group by oid order by oid`)
    .then(data=>sumprice=data[1].rows)
    .catch(err=>res.status(400).json({msg:err}))
    var orders=[];
    var oids=[];
    await db.sequelize.query(`select distinct(oid),distance_in_km,flag from routes order by flag,distance_in_km`)
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


//changing order status to delivered
router.put('/deliverorder/:did',verifyWebToken,async(req,res)=>{
    console.log(req.body.route_id);
    db.sequelize.query(`select * from routes where driver_id=${req.params.did} order by flag,distance_in_km limit 1`)
    .then(async(data)=>{
        if(req.body.route_id!=data[1].rows[0].id){
            res.status(300).json({msg:`can't possible`})
        }
        else{
            const order=await Orders.findAll({where:{oid:data[1].rows[0].oid}});
            order.map((o,i)=>{
                o.order_status='delivered';
                o.save();
            })
            await db.sequelize.query(`update routes set flag='true' where id=${data[1].rows[0].id}`)
            res.send({msg:'done'})
        }
    })
    .catch(err=>res.send({msg:err}))
})

module.exports=router;