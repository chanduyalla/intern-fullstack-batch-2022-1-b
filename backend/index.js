const express=require('express');
const app=express();
const loginRouter=require('./routes/login');
const registerRouter=require('./routes/register');
const adminRouter=require('./routes/admin');
const customerRouter=require('./routes/customer');

app.use("/login",loginRouter);
app.use("/register",registerRouter);
app.use("/admin",adminRouter);
app.use("/customer",customerRouter);

const PORT=process.env.PORT || 3600
app.listen(PORT,()=>{console.log(`server is running on ${PORT}`)})