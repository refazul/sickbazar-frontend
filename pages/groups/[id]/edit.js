import { EntityAddEdit } from '../../../components/bonik/entity/addedit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroup, updateGroup } from '../../../services/reducers/groupsSlice';


export default function GroupEdit({ id }) {
    const entity = 'groups'
    const dispatch = useDispatch()

    const group = useSelector(state => state.groups.groups.find(a => a.id === id))
    const status = useSelector(state => state.groups.status)
    const error = useSelector(state => state.groups.error)

    useEffect(() => {
        dispatch(fetchGroup([entity, id, {}]))
    }, [])

    const updateGroupCallback = async (entity, entityID, input) => {
        dispatch(updateGroup([entity, entityID, input]))
    }

    let content

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = <EntityAddEdit entity={entity} object={group} updateEntity={updateGroupCallback} />
    } else if (status === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div>{content}</div>
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