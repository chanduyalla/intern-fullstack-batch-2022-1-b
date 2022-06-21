import { useFormik } from "formik";
import * as yup from 'yup';
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { getallCategories,addproduct } from "../../features/adminSlice";
import Navbar from "./Navbar";

export default function AddProduct()
{
    const dispatch=useDispatch();
    const allcategories=useSelector((state)=>{return state.adminReducer.allcategories[0]})
    React.useEffect(()=>{
        dispatch(getallCategories());
    },[])
    var [myimg,setmyimg]=React.useState({})
    const errormsgSchema=yup.object().shape({
        product_name:yup.string().required("Product name is required"),
        product_price:yup.string().required("Price is required"),
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
        console.log(productdetails,myimg);
        const formData = new FormData()
           formData.append('file', myimg);
           formData.append('upload_preset', 'docs_upload_example_us_preset');
           
            fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
            method: 'POST',
            body: formData,
             })
            .then((response) => response.json())
             .then((data) => {
                dispatch(addproduct({...productdetails,imgurl:data.url}))
              
             });
    }
    const hadleimage=(e)=>{

        setmyimg(e.target.files[0])
    
       }    
    return(
        <div>
             <Navbar/>
            <div className="card shadow rounded m-4 p-5 mx-auto w-75">
                <form onSubmit={productdetails.handleSubmit} className="mx-3 p-2" >
                    <h2 className="mb-5">Add Product</h2>
                    <input type="text" className="form-control" placeholder="Enter Product Name" {...productdetails.getFieldProps('product_name')} />
                    <span style={{color:"red"}}>
                        {productdetails.touched.product_name && productdetails.errors.product_name}
                    </span>
                    <input type="number" className="form-control mt-4" placeholder="Enter Product Price" {...productdetails.getFieldProps('product_price')}/>
                    <span style={{color:"red"}}>
                        {productdetails.touched.product_price && productdetails.errors.product_price}
                    </span>
                    <input type="number" className="form-control mt-4" placeholder="Enter Quantity" {...productdetails.getFieldProps('quantity')}/>
                    <span style={{color:"red"}}>
                        {productdetails.touched.quantity && productdetails.errors.quantity}
                    </span>
                    <p className="mt-4">Select Image:</p>
                    <input type="file" className="form-control" name="postpic" onChange={hadleimage} placeholder="Select a picture" required/>
                    <p className="mt-4">Select Category:</p>
                    <select className="form-control" style={{width:'500px'}} {...productdetails.getFieldProps('category')}>
                        <option>!---Select Category---!</option>
                        {
                            allcategories && allcategories.map((category,i)=>{
                                return(
                                    <option key={i}>{category.category_name}</option>
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