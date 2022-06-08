import React from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useNavigate ,Link} from "react-router-dom";

export default function AddCategory()
{
    const navigate=useNavigate();
    const errormessageSchema=yup.object().shape({
        name:yup.string().required("Category name is required")
    })
    const categoryname=useFormik({
        initialValues:{},
        onSubmit:add,
        validationSchema:errormessageSchema
    })
    function add(name)
    {
        console.log(name);
        const token=JSON.parse(localStorage.getItem('data')).Token;
        fetch("http://localhost:3600/admin/addcategory",{
            method:'POST',
            body:JSON.stringify(name),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        }).then(async(res)=>{let data=await res.json();console.log(data);if(res.status==200){navigate("/admin/home")}else{alert(data.msg)}})
    }
    return(
        <div>
            <div className="bg-dark p-2 d-flex justify-content-between">
                <Link to="/admin/home" className="link ms-3">Home</Link>
                <span style={{color:'#fff',fontWeight:'bold'}} className="me-3">{JSON.parse(localStorage.getItem('data')).uname}</span>
            </div>
            <div className="card rounded shadow p-5 m-5 mx-auto" style={{width:'600px'}}>
                <form onSubmit={categoryname.handleSubmit}>
                    <h2 className="mb-5">Add Category</h2>
                    <input type="text" placeholder="Enter Category name" className="form-control" {...categoryname.getFieldProps('name')}/>
                    <span style={{color:"red"}}>
                        {categoryname.touched.name && categoryname.errors.name}
                    </span><br/>
                    <button type='submit' className="btn btn-dark mt-3">Add</button>
                </form>
            </div>
        </div>
    )
}