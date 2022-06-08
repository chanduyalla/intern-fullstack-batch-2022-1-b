import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import reportWebVitals from './reportWebVitals';
import Register from './components/Register';
import AdminHome from './components/adminHome';
import CustomerHome from './components/customerHome';
import DriverHome from './components/driverHome';
import AddCategory from './components/addCategory';
import AddDriver from './components/addDriver';
import AddProduct from './components/addProduct';
import AllProducts from './components/AllProducts';
import AllOrders from './components/AllOrders';
import AddCart from './components/addcart';
import EachCustomerCart from './components/eachCustomerCartItems';
import EachCustomerPlacedorders from './components/eachCustomerPlacedOrders';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/admin/home' element={<AdminHome/>}></Route>
      <Route path='/customer/home' element={<CustomerHome/>}></Route>
      <Route path='/driver/home' element={<DriverHome/>}></Route>
      <Route path='/admin/addcategory' element={<AddCategory/>}></Route>
      <Route path='/admin/addproduct' element={<AddProduct/>}></Route>
      <Route path='/admin/adddriver' element={<AddDriver/>}></Route>
      <Route path='/admin/allproducts' element={<AllProducts/>}></Route>
      <Route path='/admin/allorders' element={<AllOrders/>}></Route>
      <Route path='/customer/addcart/:pid' element={<AddCart/>}></Route>
      <Route path='/customer/cart' element={<EachCustomerCart/>}></Route>
      <Route path='/customer/myorders' element={<EachCustomerPlacedorders/>}></Route>
      <Route path="/" element={<App/>}></Route>
    </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
