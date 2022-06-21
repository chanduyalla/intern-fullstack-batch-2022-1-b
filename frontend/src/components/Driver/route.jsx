import React from "react";
import DriverNav from "./driverNav";
import { useDispatch,useSelector } from "react-redux";
import { getroutedata,orderdelivered } from "../../features/driverSlice";

export default function OrdersRoute()
{
    const dispatch=useDispatch();
    const routesdata=useSelector((state)=>{return state.driverReducer.routesdata[0]});
    const oids=useSelector((state)=>{return state.driverReducer.routesoids[0]})
    const prices=useSelector((state)=>{return state.driverReducer.routesprices[0]})
    const [f,setF]=React.useState(0);
    React.useEffect(()=>{
        dispatch(getroutedata())
    },[])
    return(
        <div>
            <DriverNav/>
            <div className="m-5">
            <table className="table table-striped table-dark table-hover table-responsive">
                <thead>
                    <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Ordered Quantity</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Ordered Date</th>
                    <th scope="col">Destination Addresss</th>
                    <th scope="col">Distace(in km)</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Customer Phone Number</th>
                    <th scope="col">Total Order Price</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                        {
                            routesdata && routesdata.map((routegroup,i)=>{
                                return(
                                    <tr key={i}>
                                                <td scope="col">{
                                                    routegroup.map((route,j)=>{
                                                        return(
                                                            <div key={j}>
                                                                {route.product_name}
                                                             </div>
                                                        )
                                                    })
                                                }</td>
                                                <td scope="col">{
                                                    routegroup.map((route,j)=>{
                                                        return(
                                                            <div key={j}>
                                                                {route.product_price}
                                                             </div>
                                                        )
                                                    })
                                                }</td>
                                                <td scope="col">{
                                                    routegroup.map((route,j)=>{
                                                        return(
                                                            <div key={j}>
                                                                {route.quantity}
                                                             </div>
                                                        )
                                                    })
                                                }</td>
                                                <td scope="col">{
                                                    routegroup.map((route,j)=>{
                                                        return(
                                                            <div key={j}>
                                                                {route.total_price}
                                                             </div>
                                                        )
                                                    })
                                                }</td>
                                                <td>
                                               {
                                                routegroup.map((route,j)=>{
                                                    if(j==0)
                                                    {
                                                   return(
                                                    <div key={j}>
                                                    {route.ordered_date}
                                                 </div>
                                                   )
                                                    }
                                                })
                                               }
                                                </td>
                                                <td scope="col">{
                                                    routegroup.map((route,j)=>{
                                                        return(
                                                            <div key={j}>
                                                                {route.destination}
                                                             </div>
                                                        )
                                                    })
                                                }</td>
                                                <td scope="col">{
                                                    routegroup.map((route,j)=>{
                                                        return(
                                                            <div key={j}>
                                                                {route.distance_in_km}
                                                             </div>
                                                        )
                                                    })
                                                }</td>
                                                <td scope="col">{
                                                    routegroup.map((route,j)=>{
                                                        return(
                                                            <div key={j}>
                                                                {route.user_name}
                                                             </div>
                                                        )
                                                    })
                                                }</td>
                                                <td scope="col">{
                                                    routegroup.map((route,j)=>{
                                                        return(
                                                            <div key={j}>
                                                                {route.phone_number}
                                                             </div>
                                                        )
                                                    })
                                                }</td>
                                                <td>
                                                ₹{prices[i].sum_totalprice}
                                                </td>
                                                <td>
                                               {
                                                routegroup.map((route,k)=>{
                                                    if(k==0)
                                                    {
                                                   return(
                                                       <> {route.flag=='false' && f==i ? <button className="btn btn-light" onClick={()=>{dispatch(orderdelivered(route.route_id));setF(i)}}>Deliver</button> : <></>}
                                                          {route.flag=='true' ? 'delivered' : <></>}                                                       </>
                                                   )
                                                    }
                                                })
                                               }
                                                </td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
            </div>
        </div>
    )
}