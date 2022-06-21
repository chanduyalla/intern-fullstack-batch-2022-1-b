import { createSlice } from "@reduxjs/toolkit";

const customerSlice=createSlice({
    name:'customer',
    initialState:{
        customersideproducts:[],
        eachusercartproducts:[],
        myfilteredorders:[],
        filterorderprice:[],
        myaddresses:[],
    },
    reducers:{
        loadcustomersideproducts:(state,action)=>{
            state.customersideproducts=[];
            state.customersideproducts.push(action.payload);
        },
        loadeachusercartproducts:(state,action)=>{
            state.eachusercartproducts=[];
            state.eachusercartproducts.push(action.payload);
        },
        loadmyfilteredorders:(state,action)=>{
            state.myfilteredorders=[];
            state.myfilteredorders.push(action.payload.orders);
            state.filterorderprice=[];
            state.filterorderprice.push(action.payload.sumprice);
        },
        loadmyaddresses:(state,action)=>{
            state.myaddresses=[];
            state.myaddresses.push(action.payload);
        },
    }
})

//get all products that are enable
export function getcustomersideProducts()
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch("https://chandu-ecom-backend.herokuapp.com/customer/customerproducts",{
            headers:{
                'Authorization':`Token ${token}`
            }
        })
        .then(async(res)=>{let data=await res.json();dispatch(loadcustomersideproducts(data))})
    }   
}

//add product to cart 
export function addcartitem(pid,quantity)
{
    return(dispatch)=>{
        const pc={};
        pc.pid=pid;
        pc.quantity=quantity
        pc.uid=JSON.parse(localStorage.getItem('data')).uid;
        const token=JSON.parse(localStorage.getItem('data')).Token;
        console.log(pc);
        fetch("https://chandu-ecom-backend.herokuapp.com/customer/addcart",{
            method:'POST',
            body:JSON.stringify(pc),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        }).then(async(res)=>{let data=await res.json();if(res.status===200){window.location="/customer/cart"}else{alert(data.msg)}})
    }
}

//getting each user cart products
export function eachcustomercartproducts()
{
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/customer/cartitems/${uid}`,{
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>dispatch(loadeachusercartproducts(data)));
    }
}

//remove cart items
export function removecartitem(cartid)
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/customer/deletecartitem/${cartid}`,{
            method:"DELETE",
            headers:{
                'Authorization':`Token ${token}`
            }
        }).then(res=>res.json())
        .then(data=>dispatch(eachcustomercartproducts()));
    }
}

export function getmyfilteredorders(status)
{
    const obj={
        status:status
    }
    const token=JSON.parse(localStorage.getItem('data')).Token;
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    return(dispatch)=>{
        fetch(`https://chandu-ecom-backend.herokuapp.com/customer/myordersbystatus/${uid}`,{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>dispatch(loadmyfilteredorders(data)))
    }
}

export function filteredproducts(cid)
{
    if(cid=='All')
    {
        return(dispatch)=>{
            dispatch(getcustomersideProducts())
        }
    }
    else{
        const token=JSON.parse(localStorage.getItem('data')).Token;
        return(dispatch)=>{
            fetch(`https://chandu-ecom-backend.herokuapp.com/customer/filterproducts/${cid}`,{
                headers:{
                    'Authorization':`Token ${token}`
                }
            }).then(res=>res.json())
            .then(data=>dispatch(loadcustomersideproducts(data)));
        }
    }
}

export function getmyAddresses()
{
    const token=JSON.parse(localStorage.getItem('data')).Token;
    const uid=JSON.parse(localStorage.getItem('data')).uid;
   return(dispatch)=>{
    fetch(`https://chandu-ecom-backend.herokuapp.com/customer/addresses/${uid}`,{
        headers:{
            'Authorization':`Token ${token}`
        }
    }).then(res=>res.json())
    .then(data=>dispatch(loadmyaddresses(data)));
   }
}


export function directcreateOrder(pid,flag,address,quantity)
{
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    if(flag==1)
    {
        
        const Address=address.label;
        var lat;
        var lng={};
        const obj={
            product_id:pid,
            address:Address,
            quantity:quantity
        }
        return(dispatch)=>{
            fetch(`https://chandu-ecom-backend.herokuapp.com/customer/directorderwithnewaddress/${uid}`,{
                method:'POST',
                body:JSON.stringify(obj),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`
                }
            }).then(res=>res.json())
            .then(()=>console.log("done"))
        }
    }
    else if(flag==0)
    {
        const obj={
            product_id:pid,
            address_id:address,
            quantity:quantity
        }
        console.log(obj);
        return(dispatch)=>{
            fetch(`https://chandu-ecom-backend.herokuapp.com/customer/directorderwithexistingaddress/${uid}`,{
                method:'POST',
                body:JSON.stringify(obj),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`
                }
            })
            .then(res=>res.json())
            .then(()=>console.log("done"))
        }
    }
}


export function carttomyorders(address,flag)
{
    const uid=JSON.parse(localStorage.getItem('data')).uid;
    const token=JSON.parse(localStorage.getItem('data')).Token;
    if(flag==1)
    {
        const newaddress={
            address:address.label
        }
        return(dispatch)=>{
            fetch(`https://chandu-ecom-backend.herokuapp.com/customer/carttoorderswithnewaddress/${uid}`,{
                method:'POST',
                body:JSON.stringify(newaddress),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`
                } 
            }).then(res=>res.json())
            .then(data=>{console.log(data)})
        }
    }
    else if(flag==0)
    {
        const obj={
            address_id:address
        }
        return(dispatch)=>{
            fetch(`https://chandu-ecom-backend.herokuapp.com/customer/carttoorderswithexistingaddress/${uid}`,{
                method:'POST',
                body:JSON.stringify(obj),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`
                } 
            }) .then(res=>res.json())
            .then(data=>{console.log(data)})
        }
    }
}

export const {loadcustomersideproducts,loadeachusercartproducts,loadmyfilteredorders,loadmyaddresses,loadlatlng}=customerSlice.actions;

export default customerSlice.reducer;