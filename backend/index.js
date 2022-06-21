const express=require('express');
const app=express();
const loginRouter=require('./Routes/login');
const registerRouter=require('./Routes/register');
const adminRouter=require('./Routes/admin');
const customerRouter=require('./Routes/customer');
const driverRouter=require('./Routes/driver');
const otpRouter=require('./Routes/otp.js')

app.get("/",function(req,res){
    res.send("Its Working")
})

app.use("/login",loginRouter);
app.use("/register",registerRouter);
app.use("/admin",adminRouter);
app.use("/customer",customerRouter);
app.use("/driver",driverRouter);
app.use("/otp",otpRouter);



const PORT=process.env.PORT || 3700
app.listen(PORT,()=>{console.log(`server is running on ${PORT}`)})