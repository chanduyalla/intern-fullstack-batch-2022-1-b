import React from "react";
import { useDispatch,useSelector } from "react-redux";
import {myorders} from '../features/ordersSlice';
import { Link } from "react-router-dom";

export default function EachCustomerPlacedorders()
{
    const dispatch=useDispatch();
    const orderedproducts=useSelector((state)=>state.ordersReducer.orders[0]);
    React.useEffect(()=>{
        dispatch(myorders())
    },[])
    return(
        <div>
            <div className="bg-dark p-2 d-flex justify-content-between">
                <Link to="/customer/home" className="link ms-3">Home</Link>
                <span style={{color:'#fff',fontWeight:'bold'}} className="me-3">{JSON.parse(localStorage.getItem('data')).uname}</span>
            </div>
            <h3 style={{textAlign:'center'}} className="mt-4">My Orders</h3>
            <div className="d-flex">
                {/* <div className="m-5">
                    <h5 className="mb-4" onClick={()=>dispatch(myorders())}>Placed Orders</h5>
                    <h5 className="mb-4">Delivered Orders</h5>
                    <h5 className="mb-4">Canceled Orders</h5>
                </div> */}
                <div className="d-flex flex-wrap ms-5">
                    {
                        orderedproducts && orderedproducts.map((each,i)=>{
                            return(
                                <div className="card p-5 m-5">
                                    <p>Name : {each.name}</p>
                                    <p>price : {each.price}</p>
                                    <p>quantity : {each.quantity}</p>
                                    <p>Order Status : {each.status}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}