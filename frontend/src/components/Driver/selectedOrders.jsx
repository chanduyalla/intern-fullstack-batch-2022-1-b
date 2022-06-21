import React from "react";
import DriverNav from "../Driver/driverNav";
import { getSelectedorders,getRoute } from "../../features/driverSlice";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DriverselectedOrders()
{
    const dispatch=useDispatch();
    const selectedorders=useSelector((state)=>{return state.driverReducer.allselectedorders[0]})
    const oids=useSelector((state)=>{return state.driverReducer.selectedoids[0]})
    const op=useSelector((state)=>{return state.driverReducer.selecteprice[0]})
    React.useEffect(()=>{
        dispatch(getSelectedorders())
    },[])
    return(
        <div>
            <DriverNav/>
            <h2 style={{textAlign:'center'}} className='mt-3'>Selected Orders</h2>
            <div className="mt-3 w-75 mx-auto">
                {
                    selectedorders && selectedorders.map((ordergroup,i)=>{
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
                                                    <h6 className="card-text">Ordered By : {order.user_name}</h6>
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
            <div>
                <Link to="/driver/route" className="btn btn-dark ms-5" onClick={()=>{dispatch(getRoute())}}>Route</Link>
            </div>
        </div>
    )
}