import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { getProducts } from "../features/productsSlice";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useNavigate ,Link} from "react-router-dom";
import '../index.css'

export default function AddCart()
{
    const dispatch=useDispatch();
    const pid=useParams().pid;
    const navigate=useNavigate();
    const products=useSelector((state)=>state.productsReducer.products[0]);
    React.useEffect(()=>{
        dispatch(getProducts())
    },[])
    const checkSchema=yup.object().shape({
        quantity:yup.string().required("required"),
        address:yup.string().required("required"),
        pincode:yup.string().required("required")
    })
    const cartdetails=useFormik({
        initialValues:{},
        onSubmit:addcart,
        validationSchema:checkSchema
    })
    function addcart(pc)
    {
        pc.pid=pid;
        pc.uid=JSON.parse(localStorage.getItem('data')).uid;
        const token=JSON.parse(localStorage.getItem('data')).Token;
        fetch("http://localhost:3600/customer/addcart",{
            method:'POST',
            body:JSON.stringify(pc),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        }).then(async(res)=>{let data=await res.json();if(res.status===200){navigate("/customer/cart")}else{alert(data.msg)}})
    }
    return(
        <div>
             <div className="bg-dark p-2 d-flex justify-content-between">
                <Link to="/customer/home" className="link ms-3">Home</Link>
                <span style={{color:'#fff',fontWeight:'bold'}} className="me-3">{JSON.parse(localStorage.getItem('data')).uname}</span>
            </div>
            <div style={{width:'500px'}} className='mx-auto'>
                <h4 style={{textAlign:'center'}} className="mt-3">Add Product to Cart</h4>
                {
                    products&&products.map((p,i)=>{
                        if(p.id==pid)
                        {
                            return(
                                <div className="card m-4 p-5" key={i}>
                                    <p>Product Name : {p.name}</p>
                                    <p>Price : {p.price}</p>
                                    <form onSubmit={cartdetails.handleSubmit}>
                                        <span>Select Quantity:</span>
                                        <input type="range" min="0" max={`${p.quantity}`} {...cartdetails.getFieldProps('quantity')} style={{width:'100%'}}/>
                                        <div className="d-flex justify-content-between">
                                        <span>0</span><span>{p.quantity}</span>
                                        </div>
                                        <span>
                                            {cartdetails.touched.quantity && cartdetails.errors.quantity}
                                        </span>
                                        <input type="text" placeholder="enter address" className="form-control mt-3" {...cartdetails.getFieldProps('address')}/>
                                        <span>
                                            {cartdetails.touched.address && cartdetails.errors.address}
                                        </span>
                                        <input type="text" placeholder="enter pincode" className="form-control mt-3" {...cartdetails.getFieldProps('pincode')}/>
                                        <span>
                                            {cartdetails.touched.pincode && cartdetails.errors.pincode}
                                        </span><br/>
                                        <button type="submit" className="btn btn-dark mt-4">Add Cart</button>
                                    </form>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}