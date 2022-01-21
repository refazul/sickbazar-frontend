import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { readEntities, removeEntity } from '../entity'
import { sleep } from '../helper';

export const fetchAttributes = createAsyncThunk('attributes/fetchAttributes', async () => {
    const response = await readEntities('attributes', '');
    return response
})
export const removeAttribute = createAsyncThunk('attributes/removeAttribute', async (id) => {
    const response = await removeEntity('attributes', id);
    return { id };
})

const initialState = {
    attributes: [],
    status: 'idle',
    error: null
}

const attributesSlice = createSlice({
    name: 'attributes',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAttributes.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAttributes.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.attributes = state.attributes.concat(action.payload)
            })
            .addCase(fetchAttributes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder.addCase(removeAttribute.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(removeAttribute.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                state.attributes = state.attributes.filter((o) => o.id != action.payload.id)
            })
            .addCase(removeAttribute.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { addAttribute } = attributesSlice.actions

export default attributesSlice.reducer