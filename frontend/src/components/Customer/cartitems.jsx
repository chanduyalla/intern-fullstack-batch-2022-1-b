import React from "react";
import CustomerNav from "./customerNav";
import { eachcustomercartproducts,removecartitem ,getmyAddresses,carttomyorders} from "../../features/customerSlice";
import { useDispatch,useSelector } from "react-redux";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Link } from "react-router-dom";

export default function CartItems()
{
    const dispatch=useDispatch();
    const cartitems=useSelector((state)=>{return state.customerReducer.eachusercartproducts[0]});
    const myaddresses=useSelector((state)=>{return state.customerReducer.myaddresses[0]})
    React.useEffect(()=>{
        dispatch(getmyAddresses());
        dispatch(eachcustomercartproducts());
    },[])
    const [Address,setAddress]=React.useState();
    const [flag,setFlag]=React.useState(0);
    const [btn,setBtn]=React.useState('Add New Address')
    return(
        <div>
            <CustomerNav/>
            <h2 className="mt-2" style={{textAlign:'center'}}>Cart Products</h2>
            <div className="d-flex flex-wrap m-3">
                {
                    cartitems && cartitems.map((product,i)=>{
                        return(
                            <div key={i} className="card m-4 p-3" >
                                <div className="d-flex">
                                <img src={`${product.product_image}`} width="200px" className="mx-auto"></img>
                                <i className="bi bi-x-circle-fill ms-2" style={{color:'red'}} onClick={()=>{dispatch(removecartitem(product.cart_id))}}></i>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <h5 className="card-title">₹{product.product_price}</h5>
                                    <h6 className="card-text"> Quantity Ordered : {product.quantity}</h6>
                                    <h6 className="card-text">Payment Mode : COD</h6>
                                    <h6 className="card-text">Total Price : {product.quantity}*{product.product_price} = ₹{product.total_price}</h6>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="d-flex">
                <div style={{width:'400px'}} className="mt-4 ms-3">
                {
                    flag==0 ? 
                         <select className="form-control" onChange={(e)=>setAddress(e.target.value)} >
                            <option>Select Location</option>
                                {
                                    myaddresses && myaddresses.map((address,j)=>{
                                        return(
                                            <option value={address.id} key={j}>{address.address}</option>
                                            )
                                        })
                                    }
                        </select>
                         : 
                        <GooglePlacesAutocomplete
                        apiKey={process.env.REACT_APP_GMKey}
                            selectProps={{
                            Address,
                            onChange: setAddress,
                            placeholder:"Enter Address",
                            }}
                        >
                        </GooglePlacesAutocomplete>
                    } 
                    </div>
                    <button className="btn btn-secondary mt-4 ms-3" onClick={()=>{flag==1 ? setBtn('Add New Address') : setBtn('Add Existing Address');flag ==0 ? setFlag(1) : setFlag(0);}}>{btn}</button>
                    </div>
                    <Link to="/customer/myorders" className="btn btn-dark mt-5 ms-4" onClick={()=>dispatch(carttomyorders(Address,flag))}>Place Order</Link>
                       
        </div>
    )
}