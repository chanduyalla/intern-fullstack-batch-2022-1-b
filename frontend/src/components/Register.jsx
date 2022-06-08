import React from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";

export default function Register()
{
    const navigate=useNavigate();
    const checkformatSchema=yup.object().shape({
        name:yup.string().required("name is Required").max(30,"name should be less than 30 characters").min(3,"name should be greater than 3 characters"),
        email:yup.string().required("email is required").email("Invalid email format"),
        password:yup.string().required("password is required").min(5,"password length should be greater than 5").max(30,"password length should be less than 30"),
        phone_number:yup.string().required("phone number is requied")
    })
    const details=useFormik({
        initialValues:{},
        onSubmit:save,
        validationSchema:checkformatSchema
    })
    function save(userdetails)
    {
        console.log(userdetails);
        fetch("http://localhost:3600/register",{
            method:"POST",
            body:JSON.stringify(userdetails),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(async(res)=>{
            let data=await res.json();
            if(res.status==200){
                navigate("/")
            }
            else{
                alert(data.msg);
            }
        })
    }
    return(
        <div className="card shadow rounded m-5 p-5 mx-auto" style={{width:"600px"}}>
            <h2 className="mb-4">Register</h2>
            <form onSubmit={details.handleSubmit}>
                <input type="text" className="form-control" placeholder="Enter name" {...details.getFieldProps('name')}/>
                <span style={{color:'red'}}>
                    {details.touched.name && details.errors.name}
                </span>
                <input type="text" className="form-control mt-4" placeholder="Enter Email"  {...details.getFieldProps('email')}/>
                <span style={{color:'red'}}>
                    {details.touched.email && details.errors.email}
                </span>
                <input type="password" className="form-control mt-4" placeholder="Enter Password"  {...details.getFieldProps('password')}/>
                <span style={{color:'red'}}>
                    {details.touched.password && details.errors.password}
                </span>
                <input type="text" className="form-control mt-4" placeholder="Enter Phone Number"  {...details.getFieldProps('phone_number')}/>
                <span style={{color:'red'}}>
                    {details.touched.phone_number && details.errors.phone_number}
                </span><br/>
                <button type="submit" className="btn btn-dark mt-4">Register</button>
                <p className="mt-3">Already Have an Account? <Link to="/">Login</Link></p>
            </form>
        </div>
    )
}