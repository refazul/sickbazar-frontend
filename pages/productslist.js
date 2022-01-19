import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../services/reducers/productsSlice'

export default function ProductsList() {
    const dispatch = useDispatch()

    const products = useSelector(state => state.products.products)
    const status = useSelector(state => state.products.status)
    const error = useSelector(state => state.products.error)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts())
        }
    }, [status, dispatch])

    let content

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = products.map(product => (
            <div key={product.id} >{product.title}</div>
        ))
    } else if (status === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <section>
            <h2>Products</h2>
            {content}
        </section>
    )
}