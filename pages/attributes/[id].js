import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttribute } from '../../services/reducers/attributesSlice';
import { EntityDetail } from '../../components/bonik/entity/detail';

export default function AttributeDetail({ id }) {
    const router = useRouter();
    const dispatch = useDispatch()

    const attribute = useSelector(state => state.attributes.attributes.find(a => a.id === id))
    const status = useSelector(state => state.attributes.status)
    const error = useSelector(state => state.attributes.error)

    useEffect(() => {
        dispatch(fetchAttribute([id]))
    }, [])

    let content
    let entity = 'attributes'

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = <EntityDetail entity={entity} object={attribute}/>
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