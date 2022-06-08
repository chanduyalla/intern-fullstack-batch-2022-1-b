import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { getProducts,changeproductstatus ,deleteproduct} from "../features/productsSlice";
import { Link } from "react-router-dom";

export default function AllProducts()
{
    const dispatch=useDispatch();
    const allproducts=useSelector((state)=>{return state.productsReducer.products[0]})
    React.useEffect(()=>{
        dispatch(getProducts());
    },[]);
    return(
        <div>
             <div className="bg-dark p-2 d-flex justify-content-between">
                <Link to="/admin/home" className="link ms-3">Home</Link>
                <span style={{color:'#fff',fontWeight:'bold'}} className="me-3">{JSON.parse(localStorage.getItem('data')).uname}</span>
            </div>
            <h2 className="mt-3" style={{textAlign:'center'}}>All Products</h2>
            <div className="d-flex flex-wrap">
                {
                    allproducts && allproducts.map((product,i)=>{
                        return(
                            <div key={i} className="card m-5 p-5">
                                <div className="d-flex justify-content-between">
                                    <p>Name : {product.name}</p>
                                    <i class="bi bi-x-circle-fill" style={{color:'red'}} onClick={()=>{dispatch(deleteproduct(product.id))}}></i>
                                </div>
                                <p>Price : {product.name}</p>
                                <p>Status : {product.status}</p>
                                <p>Available Quantity : {product.quantity}</p>
                                <div className="mt-3">
                                    <button className="btn btn-warning me-3" onClick={()=>dispatch(changeproductstatus(product.id))}>Change Status</button>
                                    <button className="btn btn-primary me-3">edit</button>
                                    {/* <button className="btn btn-danger">Delete</button> */}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}