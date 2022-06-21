import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getcustomersideProducts,addcartitem } from "../../features/customerSlice";
import CustomerNav from "./customerNav";

export default function Addcartform()
{
    const pid=useParams().pid;
    const dispatch=useDispatch();
    const products=useSelector((state)=>{return state.customerReducer.customersideproducts[0]})
    const [q,setQ]=React.useState(1);
    const [availqunat,setAvailquant]=React.useState()
    React.useEffect(()=>{
        dispatch(getcustomersideProducts())
    },[])
    function decquantity()
    {
        if(q>1)
        {
            setQ(q-1);
        }
    }
    function incquantity()
    {
        if(q<availqunat)
        {
            setQ(q+1);
        }
    }
    return(
        <div>
            <CustomerNav/>
            <h2 className="mt-2" style={{textAlign:'center'}}>Add Product to Cart</h2>
            {
                products && products.map((product,i)=>{
                    if(product.id==pid)
                    {
                    return(
                        <div className="m-5 d-flex" key={i}>
                            <img src={`${product.product_image}`} width="300px"/>
                            <div className="ms-5">
                                <h5>{product.product_name}</h5>
                                <h5>₹{product.product_price}</h5>
                                <h6>Available Quantity : {product.quantity}</h6>
                                <h6>Payment Mode : Cash on Delivery</h6>
                                <p>Select Quantity:</p>
                                <div>
                                    <button className="btn btn-secondary" onClick={decquantity}>-</button>
                                    <span className="mx-3">{q}</span>
                                    <button className="btn btn-secondary" onClick={()=>{incquantity();setAvailquant(product.quantity)}}>+</button>
                                </div>
                                <button className="btn btn-dark mt-5" onClick={()=>{dispatch(addcartitem(product.id,q))}}>Add Cart</button>
                            </div>
                        </div>
                    )
                    }
                })
            }
        </div>
    )
}