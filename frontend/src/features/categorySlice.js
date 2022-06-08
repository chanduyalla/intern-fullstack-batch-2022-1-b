import { createSlice } from "@reduxjs/toolkit";

const categorySlice=createSlice({
    name:'category',
    initialState:{
        categories:[]
    },
    reducers:{
        loadcategories:(state,action)=>{
            // state.categories=[];
            state.categories.push(action.payload);
        }
    }
})
export function getcategories()
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch("http://localhost:3600/admin/categories",{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>{dispatch(loadcategories(data))})
    }
}

export const {loadcategories}=categorySlice.actions;
export default categorySlice.reducer;