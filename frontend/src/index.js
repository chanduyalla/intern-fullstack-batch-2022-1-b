import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { Provider } from 'react-redux';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/Register';
import AdminHome from './components/Admin/adminHome';
import AddCategory from './components/Admin/addCategory';
import AddDriver from './components/Admin/addDriver';
import AddProduct from './components/Admin/addProduct';
import CustomerHome from './components/Customer/customerHome';
import AllProducts from './components/Admin/allProducts';
import Addcartform from './components/Customer/addcartform';
import CartItems from './components/Customer/cartitems';
import DirectPlaceorder from './components/Customer/directPlaceorder';
import DriverHome from './components/Driver/driverHome';
import AllOrders from './components/Admin/allorders';
import Myorders from './components/Customer/myOrders';
import DriverselectedOrders from './components/Driver/selectedOrders';
import OrdersRoute from './components/Driver/route';
import OTP from './components/OTP';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path='/otp' element={<OTP/>}></Route>
      <Route path='/admin/home' element={<AdminHome/>}></Route>
      <Route path='/admin/addcategory' element={<AddCategory/>}></Route>
      <Route path='/admin/adddriver' element={<AddDriver/>}></Route>
      <Route path='/admin/addproduct' element={<AddProduct/>}></Route>
      <Route path='/customer/home' element={<CustomerHome/>}></Route>
      <Route path='/admin/allproducts' element={<AllProducts/>}></Route>
      <Route path='/admin/allorders' element={<AllOrders/>}></Route>
      <Route path='/customer/addcart/:pid' element={<Addcartform/>}></Route>
      <Route path='/customer/cart' element={<CartItems/>}></Route>
      <Route path='/customer/myorders' element={<Myorders/>}></Route>
      <Route path='/customer/directplaceorder/:pid' element={<DirectPlaceorder/>}></Route>
      <Route path='/driver/home' element={<DriverHome/>}></Route>
      <Route path='/driver/selectedorders' element={<DriverselectedOrders/>}></Route>
      <Route path='/driver/route' element={<OrdersRoute/>}></Route>
      <Route path="/" element={<App/>}></Route>
    </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
