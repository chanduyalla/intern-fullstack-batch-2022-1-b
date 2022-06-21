const {Users}=require('./models');
const bcrypt=require('bcrypt');
async function addadmin()
{
    const password=bcrypt.hashSync("chandu",10);
    const admin={
        user_name:'chandrika',
        email:'chandrikayalla.516@gmail.com',
        password:password,
        phone_number:'7799196683',
        role_id:1
    }
    try{
        const user=await Users.findOne({where:{email:admin.email}});
        if(user)
        {
            console.log("admin already added")
        }
        else{
            const ad=await Users.create(admin);
        }
    }
    catch(err)
    {
        console.log(err)
    }
}

addadmin();