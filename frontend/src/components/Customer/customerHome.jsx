import React from "react";
import CustomerNav from "./customerNav";
import { useDispatch, useSelector } from "react-redux";
import { getcustomersideProducts,filteredproducts } from "../../features/customerSlice";
import { Link } from "react-router-dom";
import { getallCategories } from "../../features/adminSlice";

export default function CustomerHome()
{
    const dispatch=useDispatch();
    const products=useSelector((state)=>{return state.customerReducer.customersideproducts[0]})
    const allcategories=useSelector((state)=>{return state.adminReducer.allcategories[0]})
    React.useEffect(()=>{
        dispatch(getcustomersideProducts())
        dispatch(getallCategories())
    },[])
    return(
        <div>
            <CustomerNav/>
            <div className="mt-3 mx-auto">
                    <select className="form-control mx-auto" style={{width:'250px'}} onChange={(e)=>{dispatch(filteredproducts(e.target.value))}}>
                        <option value="All">All</option>
                        {
                            allcategories && allcategories.map((category,i)=>{
                                return(
                                    <option key={i} value={category.id}>{category.category_name}</option>
                                )
                            })
                        }
                    </select>
                </div>
            <div className="d-flex flex-wrap m-5">
                {
                    products && products.map((product,p)=>{
                        return(
                            <div className="card m-3 p-3" key={p}>
                                <img src={`${product.product_image}`} width="240px" className="mx-auto"/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <h5 className="card-title">₹{product.product_price}</h5>
                                    <h6 className="card-text">Available Quantity : {product.quantity}</h6>
                                    <h6 className="card-text">Payment Mode : COD</h6>
                                    <Link to={`/customer/directplaceorder/${product.id}`} className="btn btn-dark mt-3">Place Order</Link>
                                    <Link to={`/customer/addcart/${product.id}`} className="btn btn-dark ms-4 mt-3">Add Cart</Link>
                                </div>
                             </div>
                        )
                    })
                }
            </div>
        </div>
    )
}