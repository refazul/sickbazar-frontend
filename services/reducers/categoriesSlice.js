import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { readEntities, removeEntity } from '../entity'
import { sleep } from '../helper';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await readEntities('categories', '');
    return response
})
export const removeCategory = createAsyncThunk('categories/removeCategory', async (id) => {
    const response = await removeEntity('categories', id);
    return { id };
})

const initialState = {
    categories: [],
    status: 'idle',
    error: null
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.categories = state.categories.concat(action.payload)
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder.addCase(removeCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                state.categories = state.categories.filter((o) => o.id != action.payload.id)
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { addCategory } = categoriesSlice.actions

export default categoriesSlice.reducer