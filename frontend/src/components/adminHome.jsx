import React from "react";
import { Link } from "react-router-dom";
import '../index.css';
import { useSelector,useDispatch } from "react-redux";

export default function AdminHome()
{
    const dispatch=useDispatch();
    return(
        <div>
            <nav className="d-flex justify-content-between bg-dark p-2 text-light">
                <div>
                    <Link to="/admin/home" className="link mx-4">HOME</Link>
                    <Link to="/admin/addcategory" className="link mx-4">Add Category</Link>
                    <Link to="/admin/addproduct" className="link mx-4">Add Product</Link>
                    <Link to="/admin/adddriver" className="link mx-4">Add Driver</Link>
                    <Link to="/admin/allproducts" className="link mx-4">All Products</Link>
                    <Link to="/admin/allorders" className="link mx-4">All Orders</Link>
                </div>
                <div>
                    <span style={{color:'#fff',fontWeight:'bold'}} className="me-3">{JSON.parse(localStorage.getItem('data')).uname}</span>
                    <Link to="/" onClick={()=>localStorage.removeItem('data')} className="link me-3">LOGOUT</Link>
                </div>
            </nav>
        </div>
    )
}