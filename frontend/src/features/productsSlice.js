import { createSlice } from "@reduxjs/toolkit";

const productsSlice=createSlice({
    name:'products',
    initialState:{
        products:[],
    },
    reducers:{
        loadProducts:(state,action)=>{
            state.products=[];
            state.products.push(action.payload);
        }
    }
})

export function getProducts()
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch("http://localhost:3600/admin/products",{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        .then(async(res)=>{let data=await res.json();dispatch(loadProducts(data))})
        // .then(data=>dispatch(loadProducts(data)))
    }
}
export function changeproductstatus(pid)
{
    // console.log(pid);
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`http://localhost:3600/admin/productstatus/${pid}`,{
            method:"PUT",
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        .then(res=>res.json())
        .then(()=>dispatch(getProducts()))
    }
}

export function deleteproduct(pid)
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`http://localhost:3600/admin/deleteproduct/${pid}`,{
            method:'DELETE',
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(()=>dispatch(getProducts()))
    }
}

export function filterproductsbycategory(name)
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    if(name=='All Available Products')
    {
        return(dispatch)=>{
            dispatch(getProducts());
        }
    }
    else{
        return(dispatch)=>{
            fetch(`http://localhost:3600/customer/filterproducts/${name}`,{
                headers:{
                    'Authorization':`Token ${token}`
                }
            }).then(res=>res.json())
            .then(data=>dispatch(loadProducts(data)))
        }
    }
}

export const {loadProducts}=productsSlice.actions;

export default productsSlice.reducer;