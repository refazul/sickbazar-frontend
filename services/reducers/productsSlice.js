import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { readEntities } from '../entity'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await readEntities('products', '');
    return response
})

const initialState = {
    products: [],
    status: 'idle',
    error: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.products = state.products.concat(action.payload)
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { addProduct } = productsSlice.actions

export default productsSlice.reducer