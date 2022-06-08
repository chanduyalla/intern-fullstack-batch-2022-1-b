import React from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useNavigate,Link } from "react-router-dom";

export default function AddDriver()
{
    const navigate=useNavigate();
    const drivererrorSchema=yup.object().shape({
        name:yup.string().required("name is Required").max(30,"name should be less than 30 characters").min(3,"name should be greater than 3 characters"),
        email:yup.string().required("email is required").email("Invalid email format"),
        password:yup.string().required("password is required").min(5,"password length should be greater than 5").max(30,"password length should be less than 30"),
        phone_number:yup.string().required("phone number is requied")
    })
    const driverdetails=useFormik({
        initialValues:{},
        onSubmit:adddriver,
        validationSchema:drivererrorSchema
    })
    function adddriver(driver)
    {
        console.log(driver);
        const token=JSON.parse(localStorage.getItem('data')).Token;
        fetch("http://localhost:3600/admin/adddriver",{
            method:"POST",
            body:JSON.stringify(driver),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(async(res)=>{let data=await res.json();if(res.status===200){navigate("/admin/home")}else{alert(data.msg)}})
    }
    return(
        <div>
             <div className="bg-dark p-2 d-flex justify-content-between">
                <Link to="/admin/home" className="link ms-3">Home</Link>
                <span style={{color:'#fff',fontWeight:'bold'}} className="me-3">{JSON.parse(localStorage.getItem('data')).uname}</span>
            </div>
            <div className="card shadow rounded p-5 m-5 mx-auto" style={{width:'700px'}}>
                <form onSubmit={driverdetails.handleSubmit}>
                    <h2 className="mb-5">Add Driver</h2>
                    <input type="text" placeholder="Enter Name" className="form-control" {...driverdetails.getFieldProps('name')}/>
                    <span style={{color:"red"}}>
                        {driverdetails.touched.name && driverdetails.errors.name}
                    </span>
                    <input type="text" placeholder="Enter email" className="form-control mt-4" {...driverdetails.getFieldProps('email')}/>
                    <span style={{color:"red"}}>
                        {driverdetails.touched.email && driverdetails.errors.email}
                    </span>
                    <input type="password" placeholder="Enter Password" className="form-control mt-4" {...driverdetails.getFieldProps('password')}/>
                    <span style={{color:"red"}}>
                        {driverdetails.touched.password && driverdetails.errors.password}
                    </span>
                    <input type="text" placeholder="Enter phone Number" className="form-control mt-4" {...driverdetails.getFieldProps('phone_number')}/>
                    <span style={{color:"red"}}>
                        {driverdetails.touched.phone_number && driverdetails.errors.phone_number}
                    </span>
                    <br/>
                    <button type="submit" className="btn btn-dark mt-3">Add Driver</button>
                </form>
            </div>
        </div>
    )
}