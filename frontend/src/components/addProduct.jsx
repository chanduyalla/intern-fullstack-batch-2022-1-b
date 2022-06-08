import { useFormik } from "formik";
import * as yup from 'yup';
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { getcategories } from "../features/categorySlice";
import { useNavigate,Link } from "react-router-dom";

export default function AddProduct()
{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const categories=useSelector((state)=>{return state.categoryReducer.categories[0]})
    React.useEffect(()=>{
        dispatch(getcategories());
    },[])
    const errormsgSchema=yup.object().shape({
        name:yup.string().required("Product name is required"),
        price:yup.string().required("Price is required"),
        quantity:yup.string().required("Quantity is required"),
        category:yup.string().required("category is required")
    })
    const productdetails=useFormik({
        initialValues:{},
        onSubmit:addProduct,
        validationSchema:errormsgSchema,
    })
    function addProduct(productdetails)
    {
        console.log(productdetails);
        const token=JSON.parse(localStorage.getItem('data')).Token;
        fetch("http://localhost:3600/admin/addproduct",{
            method:'POST',
            body:JSON.stringify(productdetails),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(async(res)=>{let data=res.json();if(res.status===200){navigate('/admin/allproducts')}else{alert(data.msg)}})
    }
    return(
        <div>
             <div className="bg-dark p-2 d-flex justify-content-between">
                <Link to="/admin/home" className="link ms-3">Home</Link>
                <span style={{color:'#fff',fontWeight:'bold'}} className="me-3">{JSON.parse(localStorage.getItem('data')).uname}</span>
            </div>
            <div className="card shadow rounded m-5 p-5 mx-auto" style={{width:'700px'}}>
                <form onSubmit={productdetails.handleSubmit}>
                    <h2 className="mb-5">Add Product</h2>
                    <input type="text" className="form-control" placeholder="Enter Product Name" {...productdetails.getFieldProps('name')} />
                    <span style={{color:"red"}}>
                        {productdetails.touched.name && productdetails.errors.name}
                    </span>
                    <input type="number" className="form-control mt-4" placeholder="Enter Product Price" {...productdetails.getFieldProps('price')}/>
                    <span style={{color:"red"}}>
                        {productdetails.touched.price && productdetails.errors.price}
                    </span>
                    <input type="number" className="form-control mt-4" placeholder="Enter Quantity" {...productdetails.getFieldProps('quantity')}/>
                    <span style={{color:"red"}}>
                        {productdetails.touched.quantity && productdetails.errors.quantity}
                    </span>
                    <p className="mt-4">Select Category:</p>
                    <select className="form-control" style={{width:'500px'}} {...productdetails.getFieldProps('category')}>
                        <option>!---Select Category---!</option>
                        {
                            categories && categories.map((category,i)=>{
                                return(
                                    <option key={i}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                    <span style={{color:"red"}}>
                        {productdetails.touched.category && productdetails.errors.category}
                    </span><br/>
                    <button type="submit" className="btn btn-dark mt-3">Add Product</button>
                </form>
            </div>
        </div>
    )
}