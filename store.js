import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './services/reducers/counterSlice'
import productsReducer from './services/reducers/productsSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        products: productsReducer
    }
})