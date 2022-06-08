import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { getcartitems } from "../features/cartitemsSlice";
import {useNavigate,Link} from 'react-router-dom';

export default function EachCustomerCart()
{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const cartitems=useSelector((state)=>{return state.cartitemsReducer.cartitems[0]})
    React.useEffect(()=>{
        dispatch(getcartitems());
    },[])
    function placeorder(uid)
    {
        const token=JSON.parse(localStorage.getItem('data')).Token;
        fetch(`http://localhost:3600/customer/placeorder/${uid}`,{
            method:'POST',
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(async(res)=>{let data=await res.json();if(res.status==200){navigate("/customer/myorders")}else{alert(data.msg)}})
    }
   return(
       <div>
           <div className="bg-dark p-2 d-flex justify-content-between">
                <Link to="/customer/home" className="link ms-3">Home</Link>
                <span style={{color:'#fff',fontWeight:'bold'}} className="me-3">{JSON.parse(localStorage.getItem('data')).uname}</span>
            </div>
            <h3 className="mt-3" style={{textAlign:'center'}}> Cart Items</h3>
           <div className="d-flex flex-wrap">
           {
               cartitems && cartitems.map((each,i)=>{
                   return(
                       <div key={i} className="card m-5 p-5">
                           <p>Name : {each.name}</p>
                           <p>Price : {each.price}</p>
                           <p>Ordered Quantity : {each.quantity}</p>
                        </div>
                   )
               })
           }
           </div>
           <button className="btn btn-primary m-5" onClick={()=>{placeorder(JSON.parse(localStorage.getItem('data')).uid)}}>Order</button>
       </div>
   ) 
}