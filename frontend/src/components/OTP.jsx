import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';

export default function OTP()
{
    const navigate=useNavigate();  
    const errorSchema=yup.object().shape({
        otp:yup.string().required('Enter OTP')
    })
    const check=useFormik({
        initialValues:{otp:''},
        onSubmit:checkotp,
        validationSchema:errorSchema
    })
    function checkotp(value)
    {
        const uid=JSON.parse(localStorage.getItem('data')).uid;
        var obj={
            uid:uid,
            otp:value.otp
        }
        const token=JSON.parse(localStorage.getItem('data')).Token;
        fetch("https://chandu-ecom-backend.herokuapp.com/otp/checkotp",{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        }).then(async(res)=>{ 
            let data=await res.json();
            if(res.status==200){
                const role=JSON.parse(localStorage.getItem('data')).role;
                navigate(`/${role}/home`)
            }
            else{
                alert(data.msg);
            }
        }) 
    }
    return(
        <div className='card shadow rounded p-5 mx-auto mt-5 mx-5 w-75'>
            <h1 className='mb-3 mx-5'>Two Step Verification</h1>
            <span className='mb-3 mx-5'>OTP sent to Your registered Mobile Number</span>
            <form onSubmit={check.handleSubmit} className="mx-5">
                <input type="number" className='form-control' placeholder='Enter OTP' {...check.getFieldProps('otp')}/>
                <span style={{color:'red'}}>
                {check.touched.otp && check.errors.otp}
                </span>
                <br/>
                <button type='submit' className='btn btn-dark mt-3'>Login</button>
            </form>
        </div>
    )
}