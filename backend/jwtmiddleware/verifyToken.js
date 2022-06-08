const jwt=require('jsonwebtoken');

const verifyWebToken=(req,res,next)=>{
    const authheader=req.headers['authorization'];
    if(authheader)
    {
        const token=authheader.split(' ')[1];
        if(token)
        {
            jwt.verify(token,'this is secret key',(err,authData)=>{
                if(!err)
                {
                    next();
                }
                else{
                    res.status(400).json({err:err});
                }
            })
        }
        else{
            res.status(404).json({msg:'token is missing'})
        }
    }
    else{
        res.status(404).json({msg:'auth header is missing'})
    }
}

module.exports=verifyWebToken;