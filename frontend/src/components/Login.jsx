import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';

export default function Login()
{  
    const navigate=useNavigate();
    const errorSchema=yup.object().shape({
        email:yup.string().required(' Enter Email').email("Invalid email format"),
        password:yup.string().required(' Enter Password')
    })
    const check=useFormik({
        initialValues:{email:'',password:''},
        onSubmit:credentials,
        validationSchema:errorSchema
    })
    function credentials(usercredentials)
    {
        console.log(usercredentials);
        // dispatch(login(usercredentials));
        fetch("http://localhost:3600/login",{
            method:"POST",
            body:JSON.stringify(usercredentials),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(async(res)=>{ 
            let data=await res.json();
            localStorage.setItem('data',JSON.stringify(data));
            if(res.status==200){
                // let d=JSON.parse(localStorage.getItem('data'))
                // if(d.Token){
                    navigate(`/${data.role}/home`)
                // }
            }
            else{
                alert(data.msg);
            }
        })
    }
    return(
        <div className='card p-5 mx-auto mt-5' style={{width:'500px'}}>
            <h1 className='mb-5'>Login</h1>
            <form onSubmit={check.handleSubmit}>
                <input type="text" className='form-control' placeholder='Enter Registered Email' {...check.getFieldProps('email')}/>
                <span style={{color:'red'}}>
                {check.touched.email && check.errors.email}
                </span>
                <input type="password" className='form-control mt-4' placeholder="Enter Password" {...check.getFieldProps('password')}/>
                <span style={{color:'red'}}>
                {check.touched.password && check.errors.password}
                </span>
                <br/>
                <button type='submit' className='btn btn-dark mt-3'>Login</button>
                <p className='mt-3'>Don't Have an Account? <Link to="/register">Register here</Link> as a customer</p>
            </form>
        </div>
    )
}