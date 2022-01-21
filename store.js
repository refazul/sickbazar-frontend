import { configureStore } from '@reduxjs/toolkit'
import attributesSlice from './services/reducers/attributesSlice'
import categoriesSlice from './services/reducers/categoriesSlice'
import counterReducer from './services/reducers/counterSlice'
import groupsSlice from './services/reducers/groupsSlice'
import productsReducer from './services/reducers/productsSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        products: productsReducer,
        categories: categoriesSlice,
        groups: groupsSlice,
        attributes: attributesSlice,
    }
})