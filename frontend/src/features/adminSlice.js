import { createSlice } from "@reduxjs/toolkit";

const adminSlice=createSlice({
    name:'admin',
    initialState:{
        allcategories:[],
        alldrivers:[],
        allproducts:[],
        categorywiseproducts:[],
        allcreatedorders:[],
        createdordersprice:[],
        createdoids:[],
        filteredorders:[],
        filterorderprice:[],
    },
    reducers:{
        loadallcategories:(state,action)=>{
            state.allcategories=[];
            state.allcategories.push(action.payload);
        },
        loadalldrivers:(state,action)=>{
            state.alldrivers=[];
            state.alldrivers.push(action.payload)
        },
        loadallproducts:(state,action)=>{
            state.allproducts=[];
            state.allproducts.push(action.payload);
        },
        loadcategorywiseproducts:(state,action)=>{
            state.categorywiseproducts=[];
            state.categorywiseproducts.push(action.payload);
        },
        loadallcreatedorders:(state,action)=>{
            state.allcreatedorders=[];
            state.allcreatedorders.push(action.payload.orders);
            state.createdoids=[];
            state.createdoids.push(action.payload.oids);
            state.createdordersprice=[];
            state.createdordersprice.push(action.payload.sumprice);
        },
        loadallfilteredorders:(state,action)=>{
            state.filteredorders=[];
            state.filteredorders.push(action.payload.orders);
            state.filterorderprice=[];
            state.filterorderprice.push(action.payload.sumprice);
        }
    }
})

//add category
export function addCategory(categoryName)
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch("https://chandu-ecom-backend.herokuapp.com/admin/addcategory",{
            method:'POST',
            body:JSON.stringify(categoryName),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        }).then(async(res)=>{let data=await res.json();console.log(data);if(res.status==200){window.location="/admin/home"}else{alert(data.msg)}})
    }
}


//get all categories
export function getallCategories()
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch("https://chandu-ecom-backend.herokuapp.com/admin/allcategories",{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>{dispatch(loadallcategories(data))})
    }
}

export function getalldrivers()
{
    return(dispatch)=>{

    }
}

//add new driver
export function addnewDriver(driver)
{
    console.log('driver',driver);
    return(dispatch)=>{
        const token=JSON.parse(localStorage.getItem('data')).Token;
        fetch("https://chandu-ecom-backend.herokuapp.com/admin/adddriver",{
            method:"POST",
            body:JSON.stringify(driver),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(async(res)=>{let data=await res.json();if(res.status===200){window.location="/admin/home"}else{alert(data.msg)}})
    }
}


//add product
export function addproduct(productdetails)
{
    console.log('productdetails',productdetails);
    return(dispatch)=>{
        const token=JSON.parse(localStorage.getItem('data')).Token;
        fetch("https://chandu-ecom-backend.herokuapp.com/admin/addproduct",{
            method:'POST',
            body:JSON.stringify(productdetails),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(async(res)=>{let data=await res.json();console.log(data);if(res.status===200){window.location='/admin/allproducts'}else{alert(data.msg)}})
    }
}

//get all product
export function getallProducts()
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch("https://chandu-ecom-backend.herokuapp.com/admin/allproducts",{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        .then(async(res)=>{let data=await res.json();dispatch(loadallproducts(data))})
    }
}

//categorywise products
export function eachcategoryproducts(cid)
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/admin/categorywiseproducts/${cid}`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(async(res)=>{let data=await res.json();dispatch(loadcategorywiseproducts(data))})
    }
}


//disable product
export function changeproductstatus(pid,cid)
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/admin/productstatus/${pid}`,{
            method:"PUT",
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        .then(res=>res.json())
        .then(()=>dispatch(eachcategoryproducts(cid)))
    }
}

//delete product
export function deleteproduct(pid,cid)
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/admin/deleteproduct/${pid}`,{
            method:"PUT",
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        .then(res=>res.json())
        .then(()=>dispatch(eachcategoryproducts(cid)))
    }
}

//get all created orders
export function getallcreatedorders()
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch("https://chandu-ecom-backend.herokuapp.com/admin/allcreatedorders",{
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>dispatch(loadallcreatedorders(data)))
    }
}

//accept or cancel order by admin
export function changeorderstatus(status,oid)
{
    console.log(oid);
    const obj={};
    obj.status=status;
    console.log(obj);
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/admin/changeorderstatus/${oid}`,{
            method:"PUT",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(()=>dispatch(getallcreatedorders()))
    }
}


//filter orders by order status
export function filterbyorderstatus(status)
{
    const obj={};
    obj.status=status;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch("https://chandu-ecom-backend.herokuapp.com/admin/allselectedtypeorder",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then((data)=>dispatch(loadallfilteredorders(data)))
    }
}


export const {loadallcategories,loadcategorywiseproducts,loadalldrivers,loadallproducts,loadallcreatedorders,loadallfilteredorders}=adminSlice.actions;

export default adminSlice.reducer;