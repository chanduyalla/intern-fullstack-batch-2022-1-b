import React from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getProducts ,filterproductsbycategory} from "../features/productsSlice";
import { getcategories } from "../features/categorySlice";
import "../index.css"

export default function CustomerHome()
{
    const dispatch=useDispatch()
    const allproducts=useSelector((state)=>{return state.productsReducer.products[0]});
    const allcategories=useSelector((state)=>{return state.categoryReducer.categories[0]});
    const [header,setHeader]=React.useState('All Available Products')
    React.useEffect(()=>{
        dispatch(getProducts());
        dispatch(getcategories());
    },[])
    return(
        <div>
            <div className="d-flex justify-content-between bg-dark p-2">
                <div>
                    <Link to="/customer/home" className="link mx-5">Home</Link>
                    <Link to="/customer/cart" className="link mx-5">Cart Items</Link>
                    <Link to="/customer/myorders" className="link mx-5">My Orders</Link>
                </div>
                <div>
                    <span  className="mx-5" style={{color:'#fff',fontWeight:'bold'}}>{JSON.parse(localStorage.getItem('data')).uname}</span>
                    <Link to="/" onClick={()=>localStorage.removeItem('data')} className="link me-4">Logout</Link>
                </div>
            </div>
            <div className="d-flex">
                <div className="mt-5 ms-2">
                    <select className="form-control" style={{width:'250px'}} onChange={(e)=>{setHeader(e.target.value);dispatch(filterproductsbycategory(e.target.value))}}>
                        <option value="All Available Products">All</option>
                        {
                            allcategories && allcategories.map((category,i)=>{
                                return(
                                    <option key={i} value={category.name}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <h3 style={{textAlign:'center'}} className="mt-4">{header}</h3>
                    <div className="d-flex flex-wrap">
                        {
                            allproducts && allproducts.map((product,i)=>{
                                if(product.status=="enable" && product.quantity!=0){
                                    return(
                                        <div className="card m-4 p-5" key={i}>
                                            <p>Product Name : {product.name}</p>
                                            <p>Price : {product.price}</p>
                                            <p>Available Quantity : {product.quantity}</p>
                                            <div className="d-flex justify-content-between">
                                                <Link to={`/customer/addcart/${product.id}`} style={{backgroundColor:'black',borderRadius:'10px'}} className='p-2 link'>Add Cart</Link>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}