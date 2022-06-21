import React from "react";
import CustomerNav from "./customerNav";
import { useParams,Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getcustomersideProducts,getmyAddresses,directcreateOrder } from "../../features/customerSlice";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function DirectPlaceorder()
{
    const pid=useParams().pid;
    const dispatch=useDispatch();
    const products=useSelector((state)=>{return state.customerReducer.customersideproducts[0]});
    const myaddresses=useSelector((state)=>{return state.customerReducer.myaddresses[0]})
    const [q,setQ]=React.useState(1);
    const [availqunat,setAvailquant]=React.useState();
    const [Address,setAddress]=React.useState();
    const [flag,setFlag]=React.useState(0);
    const [btn,setBtn]=React.useState('Add New Address')
    React.useEffect(()=>{
        dispatch(getmyAddresses())
        dispatch(getcustomersideProducts())
    },[])
    function decquantity()
    {
        if(q>1)
        {
            setQ(q-1);
        }
    }
    function incquantity()
    {
        if(q<availqunat)
        {
            setQ(q+1);
        }
    }
    return(
        <div>
            <CustomerNav></CustomerNav>
            <h2 className="mt-2" style={{textAlign:'center'}}>Place Order</h2>
            <div>
            {
                products && products.map((product,i)=>{
                    if(product.id==pid)
                    {
                    return(
                        <div className="m-5 d-flex" key={i}>
                            <img src={`${product.product_image}`} width="350px"/>
                            <div className="ms-5" style={{width:'800px'}}>
                                <h5>{product.product_name}</h5>
                                <h5>₹{product.product_price}</h5>
                                <h6>Available Quantity : {product.quantity}</h6>
                                <h6>Payment Mode : Cash on Delivery</h6>
                                <p>Select Quantity:</p>
                                <div>
                                    <button className="btn btn-secondary" onClick={decquantity}>-</button>
                                    <span className="mx-3">{q}</span>
                                    <button className="btn btn-secondary" onClick={()=>{incquantity();setAvailquant(product.quantity)}}>+</button>
                                </div>
                                <div className="d-flex">
                                    <div style={{width:'400px'}} className="mt-4">
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
                                <Link  to="/customer/myorders" className="btn btn-dark mt-5" onClick={()=>{dispatch(directcreateOrder(pid,flag,Address,q))}}>Place Order</Link>
                            </div>
                        </div>
                    )
                    }
                })
            }
            </div>
        </div>
    )
}