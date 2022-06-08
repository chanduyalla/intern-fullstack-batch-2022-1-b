import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getOrders,changeorderstatus,filterordersbystatus } from '../features/ordersSlice';
import { Link } from 'react-router-dom';

export default function AllOrders()
{
    const dispatch=useDispatch();
    const allorders=useSelector((state)=>state.ordersReducer.orders[0])
    const [type,setType]=React.useState('Placed Orders');
    React.useEffect(()=>{
        dispatch(getOrders());
    },[])
    return(
        <div>
             <div className="bg-dark p-2 d-flex justify-content-between">
                <Link to="/admin/home" className="link ms-3">Home</Link>
                <span style={{color:'#fff',fontWeight:'bold'}} className="me-3">{JSON.parse(localStorage.getItem('data')).uname}</span>
            </div>
            <h2 style={{textAlign:'center'}} className="mt-3">{type}</h2>
            <div className='d-flex'>
                <div>
                <div className='m-5'>
                    <h5 onClick={()=>{dispatch(getOrders());setType('Placed Order')}} style={{cursor:'pointer'}} className="mb-4">Placed Orders</h5>
                    <h5 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(filterordersbystatus('READY FOR DELIVERY'));setType('Ready for Devliver Orders')}}>Ready to Deliver Orders</h5>
                    <h5 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(filterordersbystatus('delivered'));setType('Delivered Orders')}}>Delivered Orders</h5>
                    <h5 className="mb-4" style={{cursor:'pointer'}} onClick={()=>{dispatch(filterordersbystatus('canceled'));setType('Canceled Order')}}>Canceled orders</h5>
                </div>
                </div>
                <div className='d-flex flex-wrap ms-5'>
                    {
                        allorders && allorders.map((each,i)=>{
                            if(each.status=='placed')
                            {
                                return(
                                    <div className='card p-5 m-5' key={i}>
                                        <p>Name : {each.name}</p>
                                        <p>Price : {each.price}</p>
                                        <p>Quantity : {each.quantity}</p>
                                        <p>Status : {each.status}</p>
                                        <button onClick={()=>{dispatch(changeorderstatus('READY FOR DELIVERY',each.id))}} className="btn btn-success">Make ready to deliver</button>
                                        <span className='mx-auto'>OR</span>
                                        <button onClick={()=>{dispatch(changeorderstatus('canceled',each.id))}} className="btn btn-danger" >Cancel Order</button>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div className='card p-5 m-5' key={i}>
                                        <p>Name : {each.name}</p>
                                        <p>Price : {each.price}</p>
                                        <p>Quantity : {each.quantity}</p>
                                        <p>Status : {each.status}</p>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}