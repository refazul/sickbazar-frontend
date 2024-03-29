import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroup } from '../../services/reducers/groupsSlice';
import { EntityDetail } from '../../components/bonik/entity/detail';

export default function GroupDetail({ id }) {
    const router = useRouter();
    const dispatch = useDispatch()

    const group = useSelector(state => state.groups.groups.find(a => a.id === id))
    const status = useSelector(state => state.groups.status)
    const error = useSelector(state => state.groups.error)

    useEffect(() => {
        dispatch(fetchGroup([entity, id, {}]))
    }, [])

    let content
    let entity = 'groups'

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = <EntityDetail entity={entity} object={group}/>
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