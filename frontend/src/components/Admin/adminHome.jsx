import React from "react";
import Navbar from "./Navbar";
import { getallcreatedorders,changeorderstatus } from "../../features/adminSlice";
import { useDispatch,useSelector } from "react-redux";

export default function AdminHome()
{
    const dispatch=useDispatch();
    const allcreatedorders=useSelector((state)=>{return state.adminReducer.allcreatedorders[0]})
    const oids=useSelector((state)=>{return state.adminReducer.createdoids[0]})
    const op=useSelector((state)=>{return state.adminReducer.createdordersprice[0]})
    React.useEffect(()=>{
        dispatch(getallcreatedorders())
    },[])
    return(
        <div>
            <Navbar/>
            <h2 className="mt-3" style={{textAlign:'center'}}>Placed Orders</h2>
            <div className="mt-3 mx-auto">
                {
                    allcreatedorders && allcreatedorders.map((ordergroup,i)=>{
                        return(
                            <div className="card m-4 p-3 w-75 mx-auto" key={i}>
                            {
                                ordergroup.map((order,j)=>{
                                    return(
                                         <div className="card w-75 mx-auto p-3 m-2" key={j}>
                                            <div className="row no-gutters">
                                                <div className="col-md-4">
                                                <img src={`${order.product_image}`} className="card-img w-50" alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{order.product_name}</h5>
                                                    <h5 className="card-title">₹{order.product_price}</h5>
                                                    <h6 className="card-text">Ordered Quantity : {order.quantity}</h6>
                                                    <h6 className="card-title">Total Price : ₹{order.total_price}</h6>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {  console.log(op)}
                            {
                                 ordergroup.map((order,k)=>{
                                    if(k==0){
                                        return(
                                            <div className="mx-auto mt-2">
                                                <h5 className="card-title">Total Order Price : ₹{op[i].sum_totalprice}</h5>
                                                <h6 className="card-text">Ordered Date : {order.ordered_date}</h6>
                                                <h6 className="card-text">Delivery Address : {order.address}</h6>
                                            </div>
                                        )
                                    }
                                 })
                            }
                            <button className="btn btn-success w-75 mx-auto my-3" onClick={()=>{dispatch(changeorderstatus('accepted',oids[i]))}}>Accept</button>
                            <button className="btn btn-danger w-75 mx-auto" onClick={()=>{dispatch(changeorderstatus('canceled',oids[i]))}}>Cancel</button>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}