import React from "react";
import CustomerNav from "./customerNav";
import { useDispatch,useSelector } from "react-redux";
import { getmyfilteredorders } from "../../features/customerSlice";

export default function Myorders()
{
    const dispatch=useDispatch();
    const myorders=useSelector((state)=>{return state.customerReducer.myfilteredorders[0]});
    const op=useSelector((state)=>{return state.customerReducer.filterorderprice[0]})
    const [type,setType]=React.useState('Created');
    React.useEffect(()=>{
        dispatch(getmyfilteredorders('created'))
    },[])
    return(
        <div>
            <CustomerNav/>
            <h2 style={{textAlign:'center'}} className="mt-3">{type} Orders</h2>
            <div className='d-flex'>
                <div>
                <div className='m-5'>
                    <h5 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(getmyfilteredorders('created'));setType('Created')}}>Created Orders</h5>
                    <h5 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(getmyfilteredorders('accepted'));setType('Active')}}>Active Orders</h5>
                    <h5 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(getmyfilteredorders('out for delivery'));setType('Out for Delivery')}}>Out for Delivery Orders</h5>
                    <h5 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(getmyfilteredorders('delivered'));setType('Delivered')}}>Delivered Orders</h5>
                    <h5 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(getmyfilteredorders('canceled'));setType('Canceled')}}>Canceled orders</h5>
                </div>
                </div>
                <div className='m-5 w-75'>
                {
                    myorders && myorders.map((ordergroup,i)=>{
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