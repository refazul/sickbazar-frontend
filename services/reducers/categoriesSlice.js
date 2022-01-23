import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { readEntities, removeEntity, createEntity, readEntity, updateEntity } from '../entity'
import { sleep } from '../helper';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    return await readEntities('categories', '');
})
export const fetchCategory = createAsyncThunk('categories/fetchCategory', async (params) => {
    return await readEntity.apply(null, params);
})
export const removeCategory = createAsyncThunk('categories/removeCategory', async (id) => {
    return await removeEntity('categories', id);
})
export const createCategory = createAsyncThunk('categories/createCategory', async (params) => {
    return await createEntity.apply(null, params);
})
export const updateCategory = createAsyncThunk('categories/updateCategory', async (params) => {
    return await updateEntity.apply(null, params);
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
                state.categories = action.payload.concat(state.categories.filter(o => action.payload.map(c => c.id).indexOf(o.id) == -1))
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(fetchCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.categories = [action.payload].concat(state.categories.filter(o => action.payload.id != o.id))
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(removeCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = removed id
                state.categories = state.categories.filter(o => o.id != action.payload)
            })
            .addCase(removeCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(createCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = new object
                state.categories = state.categories.concat(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(updateCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = new object
                state.categories = [action.payload].concat(state.categories.filter(o => action.payload.id != o.id))
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { addCategory } = categoriesSlice.actions

export default categoriesSlice.reducer