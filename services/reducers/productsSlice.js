import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action) {
            state.push(action.payload)
        }
    }
})

export const { addProduct } = productsSlice.actions

export default productsSlice.reducer