import React from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import Navbar from "./Navbar";
import { addnewDriver } from "../../features/adminSlice";
import { useDispatch } from "react-redux";

export default function AddDriver()
{
    const dispatch=useDispatch();
    const drivererrorSchema=yup.object().shape({
        user_name:yup.string().required("name is Required").max(30,"name should be less than 30 characters").min(3,"name should be greater than 3 characters"),
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
        dispatch(addnewDriver(driver));
    }
    return(
        <div>
             <Navbar/>
            <div className="card shadow rounded p-5 m-5 mx-auto w-75">
                <form onSubmit={driverdetails.handleSubmit} className="mx-3 p-3">
                    <h2 className="mb-5">Add Driver</h2>
                    <input type="text" placeholder="Enter Name" className="form-control" {...driverdetails.getFieldProps('user_name')}/>
                    <span style={{color:"red"}}>
                        {driverdetails.touched.user_name && driverdetails.errors.user_name}
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