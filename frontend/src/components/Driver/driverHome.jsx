import React from "react";
import DriverNav from "./driverNav";
import { useDispatch,useSelector } from "react-redux";
import { getallacceptedorders,changestatusoforders } from "../../features/driverSlice";

export default function DriverHome()
{
    const dispatch=useDispatch();
    const allacceptedorders=useSelector((state)=>{return state.driverReducer.allacceptedorders[0]});
    const oids=useSelector((state)=>{return state.driverReducer.acceptedoids[0]})
    const op=useSelector((state)=>{return state.driverReducer.acceptedprice[0]})
    React.useEffect(()=>{
        dispatch(getallacceptedorders());
    },[])
    return(
        <div>
            <DriverNav/>
            <div className="mt-3 w-75 mx-auto">
                {
                    allacceptedorders && allacceptedorders.map((ordergroup,i)=>{
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
                             <button className="btn btn-dark my-4 mx-auto w-75" onClick={()=>dispatch(changestatusoforders('out for delivery',oids[i]))}>Out for Delivery</button> 
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



