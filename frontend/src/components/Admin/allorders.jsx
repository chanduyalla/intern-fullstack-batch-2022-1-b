import React from "react";
import { filterbyorderstatus } from "../../features/adminSlice";
import { useDispatch,useSelector } from "react-redux";
import Navbar from "./Navbar";

export default function AllOrders()
{
    const dispatch=useDispatch();
    const filteredorders=useSelector((state)=>{return state.adminReducer.filteredorders[0]})
    const op=useSelector((state)=>{return state.adminReducer.filterorderprice[0]})
    const [type,setType]=React.useState('Out for Delivery');
    React.useEffect(()=>{
        dispatch(filterbyorderstatus('out for delivery'));
    },[])
    return(
        <div>
            <Navbar/>
            <h2 style={{textAlign:'center'}} className="mt-3">{type} Orders</h2>
            <div className='d-flex'>
                <div>
                <div className='m-5'>
                    <h6 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(filterbyorderstatus('out for delivery'));setType('Out for Delivery')}}>Ready for Delivery Orders</h6>
                    <h6 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(filterbyorderstatus('accepted'));setType('Accepted')}}>Accepted Orders</h6>
                    <h6 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(filterbyorderstatus('delivered'));setType('Delivered')}}>Delivered Orders</h6>
                    <h6 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(filterbyorderstatus('canceled'));setType('Canceled')}}>Canceled orders</h6>
                </div>
                </div>
                <div className='w-75 ms-5'>
                {
                    filteredorders && filteredorders.map((ordergroup,i)=>{
                        return(
                            <div className="card m-5 p-3 w-75 mx-auto" key={i}>
                            {
                                ordergroup.map((order,j)=>{
                                    return(
                                         <div className="card w-75 mx-auto p-3 m-2" key={j}>
                                            <div className="row no-gutters">
                                                <div className="col-md-4">
                                                <img src={`${order.product_image}`} className="card-img w-75" alt="..." />
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
                            {
                                 ordergroup.map((order,k)=>{
                                    if(k==0){
                                        return(
                                            <div className="mx-auto">
                                                <h5 className="card-title">Total Order Price : ₹{op[i].sum_totalprice}</h5>
                                                <h6 className="card-text">Ordered Date : {order.ordered_date}</h6>
                                                <h6 className="card-text">Delivery Address : {order.address}</h6>
                                            </div>
                                        )
                                    }
                                 })
                            }
                        </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}