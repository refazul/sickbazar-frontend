import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { readEntities, removeEntity, createEntity, readEntity, updateEntity } from '../entity'
import { sleep } from '../helper';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    return await readEntities('products', '');
})
export const fetchProduct = createAsyncThunk('products/fetchProduct', async (params) => {
    return await readEntity.apply(null, params);
})
export const removeProduct = createAsyncThunk('products/removeProduct', async (id) => {
    return await removeEntity('products', id);
})
export const createProduct = createAsyncThunk('products/createProduct', async (params) => {
    return await createEntity.apply(null, params);
})
export const updateProduct = createAsyncThunk('products/updateProduct', async (params) => {
    return await updateEntity.apply(null, params);
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
                state.products = action.payload.concat(state.products.filter(o => action.payload.map(c => c.id).indexOf(o.id) == -1))
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(fetchProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.products = [action.payload].concat(state.products.filter(o => action.payload.id != o.id))
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(removeProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = removed id
                state.products = state.products.filter(o => o.id != action.payload)
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(createProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = new object
                state.products = state.products.concat(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(updateProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = new object
                state.products = [action.payload].concat(state.products.filter(o => action.payload.id != o.id))
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { addProduct } = productsSlice.actions

export default productsSlice.reducer