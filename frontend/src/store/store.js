import {configureStore} from '@reduxjs/toolkit';
import adminReducer from '../features/adminSlice';
import customerReducer from '../features/customerSlice';
import driverReducer from '../features/driverSlice';

const store=configureStore({
    reducer:{
        adminReducer:adminReducer,
        customerReducer:customerReducer,
        driverReducer:driverReducer 
    }
})

export default store;