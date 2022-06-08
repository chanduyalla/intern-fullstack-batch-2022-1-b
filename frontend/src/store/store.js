import {configureStore} from '@reduxjs/toolkit';
import categoryReducer from '../features/categorySlice';
import productsReducer from '../features/productsSlice';
import ordersReducer from '../features/ordersSlice';
import cartitemsReducer from '../features/cartitemsSlice';
const store=configureStore(
    {
        reducer:{
            categoryReducer:categoryReducer,
            productsReducer:productsReducer,
            ordersReducer:ordersReducer,
            cartitemsReducer:cartitemsReducer,
        }
    }
)

export default store;