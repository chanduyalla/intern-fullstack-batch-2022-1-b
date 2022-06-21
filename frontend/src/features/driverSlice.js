import { createSlice } from "@reduxjs/toolkit";

const driverSlice=createSlice({
    name:'driver',
    initialState:{
        allacceptedorders:[],
        acceptedprice:[],
        acceptedoids:[],
        allselectedorders:[],
        selectedoids:[],
        selecteprice:[],
        routesdata:[],
        routesoids:[],
        routesprices:[],
    },
    reducers:{
        loadallacceptedorders:(state,action)=>{
            state.allacceptedorders=[];
            state.allacceptedorders.push(action.payload.orders)
            state.acceptedoids=[];
            state.acceptedoids.push(action.payload.oids);
            state.acceptedprice=[];
            state.acceptedprice.push(action.payload.sumprice)
        },
        loadallselectedorders:(state,action)=>{
            state.allselectedorders=[];
            state.allselectedorders.push(action.payload.orders);
            state.selectedoids=[];
            state.selectedoids.push(action.payload.oids);
            state.selecteprice=[];
            state.selecteprice.push(action.payload.sumprice);
        },
        loadroutesdata:(state,action)=>{
            state.routesdata=[];
            state.routesdata.push(action.payload.orders);
            state.routesoids=[];
            state.routesoids.push(action.payload.oids);
            state.routesprices=[];
            state.routesprices.push(action.payload.sumprice);
        }
    }
})

export function getallacceptedorders()
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch("https://chandu-ecom-backend.herokuapp.com/driver/allaccptedorders",{
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>dispatch(loadallacceptedorders(data)))
    }
}

export function changestatusoforders(status,oid)
{
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    const obj={
        status:status,
        uid:uid
    }
    console.log(obj);
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/driver/changeorderstatus/${oid}`,{
            method:'PUT',
            body:JSON.stringify(obj),
            headers:{
                'Authorization':`Token ${token}`,
                'Content-Type':'application/json'
            }
        }).then(res=>res.json())
        .then(()=>dispatch(getallacceptedorders()))
    }
}

export function getSelectedorders()
{
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/driver/allselectedorders/${uid}`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>dispatch(loadallselectedorders(data)))
    }                
}

export function getRoute()
{
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/driver/route/${uid}`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>console.log(data))
    }   
}

export function getroutedata()
{
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/driver/routesdata/${uid}`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>dispatch(loadroutesdata(data)))
    }
}

export function orderdelivered(route_id)
{
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    var obj={
        route_id:route_id
    }
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/driver/deliverorder/${uid}`,{
            method:'PUT',
            body:JSON.stringify(obj),
            headers:{
                'Authorization':`Token ${token}`,
                'Content-Type':'application/json'
            }
        }).then(async(res)=>{let data=await res.json();if(res.status==300){alert(data.msg)}else{dispatch(getroutedata())}})
    }
}

export  const {loadallacceptedorders,loadallselectedorders,loadroutesdata}=driverSlice.actions;

export default driverSlice.reducer;