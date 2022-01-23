import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../services/reducers/productsSlice';
import { EntityDetail } from '../../components/bonik/entity/detail';

export default function ProductDetail({ id }) {
    const router = useRouter();
    const dispatch = useDispatch()

    const product = useSelector(state => state.products.products.find(a => a.id === id))
    const status = useSelector(state => state.products.status)
    const error = useSelector(state => state.products.error)

    useEffect(() => {
        dispatch(fetchProduct([entity, id, {}]))
    }, [])

    let content
    let entity = 'products'

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = <EntityDetail entity={entity} object={product}/>
    } else if (status === 'failed') {
        content = <div>{error}</div>
    }
    return (
        <div className="bg-white">
            {content}
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    return {
        props: {
            id
        }
    }
}