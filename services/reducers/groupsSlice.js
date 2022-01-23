import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { readEntities, removeEntity, createEntity, readEntity, updateEntity } from '../entity'
import { sleep } from '../helper';

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
    return await readEntities('groups', '');
})
export const fetchGroup = createAsyncThunk('groups/fetchGroup', async (params) => {
    return await readEntity.apply(null, params);
})
export const removeGroup = createAsyncThunk('groups/removeGroup', async (id) => {
    return await removeEntity('groups', id);
})
export const createGroup = createAsyncThunk('groups/createGroup', async (params) => {
    return await createEntity.apply(null, params);
})
export const updateGroup = createAsyncThunk('groups/updateGroup', async (params) => {
    return await updateEntity.apply(null, params);
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
                state.groups = action.payload.concat(state.groups.filter(o => action.payload.map(c => c.id).indexOf(o.id) == -1))
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(fetchGroup.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.groups = [action.payload].concat(state.groups.filter(o => action.payload.id != o.id))
            })
            .addCase(fetchGroup.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(removeGroup.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(removeGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = removed id
                state.groups = state.groups.filter(o => o.id != action.payload)
            })
            .addCase(removeGroup.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(createGroup.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = new object
                state.groups = state.groups.concat(action.payload);
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(updateGroup.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateGroup.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = new object
                state.groups = [action.payload].concat(state.groups.filter(o => action.payload.id != o.id))
            })
            .addCase(updateGroup.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { addGroup } = groupsSlice.actions

export default groupsSlice.reducer