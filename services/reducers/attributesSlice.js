import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { readEntities, removeEntity, createEntity, readEntity, updateEntity } from '../entity'
import { capitalize, http_post, singularize, sleep } from '../helper';

export const fetchAttributes = createAsyncThunk('attributes/fetchAttributes', async () => {
    return await readEntities('attributes', '');
})
export const fetchAttribute = createAsyncThunk('attributes/fetchAttribute', async (params) => {
    return await readEntity.apply(null, params);
})
export const removeAttribute = createAsyncThunk('attributes/removeAttribute', async (id) => {
    return await removeEntity('attributes', id);
})
export const createAttribute = createAsyncThunk('attributes/createAttribute', async (params) => {
    return await createEntity.apply(null, params);
})
export const updateAttribute = createAsyncThunk('attributes/updateAttribute', async (params) => {
    const entity = params[0];
    const entityID = params[1];
    const input = params[2];
    const updateEntityQuery = `
    mutation Mutation($entityID: ID!, $input: ${capitalize(singularize(entity))}Input) {
        update${capitalize(singularize(entity))}(entityID: $entityID, input: $input) {
            title
            description
            image
            id
            name
            type
            options { color, text, image }
        }
    }
    `
    const variables = {
        "entityID": entityID,
        "input": input
    }
    const res = await http_post({ query: updateEntityQuery, variables })
    const result = await res.json()
    return result.data['update' + capitalize(singularize(entity))];
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
                state.attributes = action.payload.concat(state.attributes.filter(o => action.payload.map(c => c.id).indexOf(o.id) == -1))
            })
            .addCase(fetchAttributes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(fetchAttribute.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAttribute.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.attributes = [action.payload].concat(state.attributes.filter(o => action.payload.id != o.id))
            })
            .addCase(fetchAttribute.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(removeAttribute.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(removeAttribute.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = removed id
                state.attributes = state.attributes.filter(o => o.id != action.payload)
            })
            .addCase(removeAttribute.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(createAttribute.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(createAttribute.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = new object
                state.attributes = state.attributes.concat(action.payload);
            })
            .addCase(createAttribute.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(updateAttribute.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateAttribute.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // createAsyncThunk return value is action.payload
                // action.payload = new object
                state.attributes = [action.payload].concat(state.attributes.filter(o => action.payload.id != o.id))
            })
            .addCase(updateAttribute.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { addAttribute } = attributesSlice.actions

export default attributesSlice.reducer