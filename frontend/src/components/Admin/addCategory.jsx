import React from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { addCategory } from "../../features/adminSlice";

export default function AddCategory()
{
    const dispatch=useDispatch();
    const errormessageSchema=yup.object().shape({
        category_name:yup.string().required("Category name is required")
    })
    const categoryname=useFormik({
        initialValues:{},
        onSubmit:add,
        validationSchema:errormessageSchema
    })
    function add(category_name)
    {
        console.log(category_name);
        dispatch(addCategory(category_name))
    }
    return(
        <div>
            <Navbar/>
            <div className="card rounded shadow p-5 m-5 mx-auto w-75">
                <form onSubmit={categoryname.handleSubmit} className="mx-5 p-3">
                    <h2 className="mb-5">Add Category</h2>
                    <input type="text" placeholder="Enter Category name" className="form-control" {...categoryname.getFieldProps('category_name')}/>
                    <span style={{color:"red"}}>
                        {categoryname.touched.category_name && categoryname.errors.category_name}
                    </span><br/>
                    <button type='submit' className="btn btn-dark mt-3">Add</button>
                </form>
            </div>
        </div>
    )
}