import React from "react";
import { getallCategories,eachcategoryproducts,changeproductstatus,deleteproduct,getallProducts} from "../../features/adminSlice";
import { useDispatch,useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function AllProducts()
{
    const dispatch=useDispatch();
    const allcategories=useSelector((state)=>{return state.adminReducer.allcategories[0]});
    const categorywiseproducts=useSelector((state)=>{return state.adminReducer.categorywiseproducts[0]});
    React.useEffect(()=>{
        dispatch(getallCategories());
    },[])
    return(
        <div>
            <Navbar/>
            <div>
            <div class="accordion mx-5 p-4" id="accordionExample">
              {
                allcategories&&allcategories.map((category,c)=>{

                  return(
                    <div class="accordion-item" key={c}>
                    <h2 class="accordion-header" id={category.id}>
                      <button style={{backgroundColor:'#eef'}} class="accordion-button" type="button" data-bs-toggle="collapse" value={category.id} data-bs-target={"#"+category.category_name.replace(" ", "")} onClick={(e)=>{dispatch(eachcategoryproducts(category.id))}}  aria-expanded="true"  aria-controls={category.category_name.replace(" ", "")}>
                        {category.category_name}
                      </button>
                    </h2>
                    <div id={category.category_name.replace(" ", "")} class="accordion-collapse collapse" aria-labelledby={category.id} data-bs-parent="#accordionExample">
                      <div class="accordion-body d-flex flex-wrap">
                      {
                         categorywiseproducts && categorywiseproducts.map((product,i)=>{
                                return(
                                     <div className="card p-2 m-3" style={{width: "20rem"}} key={i}>
                                         <img src={`${product.product_image}`} className="card-img-top p-3"  alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.product_name}</h5>
                                                    <h5 className="card-title">₹{product.product_price}</h5>
                                                    <h6 className="card-text">Available Quantity : {product.quantity}</h6>
                                                    <h6 className="card-text">Status: {product.product_status}</h6>
                                                    <button className="btn btn-dark mt-2" onClick={()=>{dispatch(changeproductstatus(product.id,category.id))}}>Change Status</button>
                                                    <button className="btn btn-danger ms-5 mt-2" onClick={()=>{dispatch(deleteproduct(product.id,category.id))}}>Delete</button>
                                                </div>
                                            </div>
                                         )
                                    })
                             }
                        </div>
                    </div>
                  </div>
                  )
                })
              } 
            </div>
          </div>
        </div>
    )
}