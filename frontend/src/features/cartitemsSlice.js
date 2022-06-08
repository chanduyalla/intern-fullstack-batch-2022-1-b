import { createSlice } from "@reduxjs/toolkit";

const cartitemsSlice=createSlice({
    name:'cartiems',
    initialState:{
        cartitems:[]
    },
    reducers:{
        loadcartitems:(state,action)=>{
            state.cartitems=[];
            state.cartitems.push(action.payload);
        }
    }
})

export function getcartitems()
{
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`http://localhost:3600/customer/cartitems/${uid}`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>dispatch(loadcartitems(data)));
    }
}


export const {loadcartitems}=cartitemsSlice.actions;

export default cartitemsSlice.reducer;