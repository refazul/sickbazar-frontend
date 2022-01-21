import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../services/reducers/categoriesSlice';
import { EntityDetail } from '../../components/bonik/entity/detail';

export default function CategoryDetail({ id }) {
    const router = useRouter();
    const dispatch = useDispatch()

    const category = useSelector(state => state.categories.categories.find(a => a.id === id))
    const status = useSelector(state => state.categories.status)
    const error = useSelector(state => state.categories.error)

    useEffect(() => {
        dispatch(fetchCategory([entity, id, {}]))
    }, [])

    let content
    let entity = 'categories'

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = <EntityDetail entity={entity} object={category}/>
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