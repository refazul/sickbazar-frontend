import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './services/reducers/counterSlice'

export default configureStore({
    reducer: {
        counter: counterReducer
    }
})