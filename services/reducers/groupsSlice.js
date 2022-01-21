import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { readEntities, removeEntity } from '../entity'
import { sleep } from '../helper';

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
    const response = await readEntities('groups', '');
    return response
})
export const removeGroup = createAsyncThunk('groups/removeGroup', async (id) => {
    const response = await removeEntity('groups', id);
    return { id };
})

const initialState = {
    groups: [],
    status: 'idle',
    error: null
}

const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchGroups.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.groups = state.groups.concat(action.payload)
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder.addCase(removeGroup.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(removeGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                state.groups = state.groups.filter((o) => o.id != action.payload.id)
            })
            .addCase(removeGroup.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { addGroup } = groupsSlice.actions

export default groupsSlice.reducer