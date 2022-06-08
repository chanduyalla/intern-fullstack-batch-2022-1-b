import { createSlice } from "@reduxjs/toolkit"; 

const ordersSlice=createSlice({
    name:'orders',
    initialState:{
        orders:[]
    },
    reducers:{
        loadorders:(state,action)=>{
            state.orders=[];
            state.orders.push(action.payload);
        }
    }
})

export function getOrders()
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch("http://localhost:3600/admin/placedorders",{
            headers:{
                'Authorization':`token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>dispatch(loadorders(data)))
    }
}

export function myorders()
{
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`http://localhost:3600/customer/myorders/${uid}`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>dispatch(loadorders(data)))
    }
}

export function changeorderstatus(status,oid)
{
    const obj={status:status}
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`http://localhost:3600/admin/changeorderstatus/${oid}`,{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(()=>dispatch(getOrders()));
    }
}

export function filterordersbystatus(status)
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`http://localhost:3600/admin/filterordersbystatus/${status}`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>{console.log(data);dispatch(loadorders(data))})
    }
}

export const {loadorders} =ordersSlice.actions;
export default ordersSlice.reducer;