import { EntityAddEdit } from '../../components/bonik/entity/addedit';
import React, { useState } from 'react';
import { createGroup } from '../../services/reducers/groupsSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';


export default function GroupNew() {
    const entity = 'groups'
    const dispatch = useDispatch()
    const router = useRouter();

    const createGroupCallback = async (entity, input) => {
        dispatch(createGroup([entity, input])).then(res => {
            const id = res.payload.id;
            router.push('/' + entity + '/' + id + '/edit');
        });
    }

    return (
        <EntityAddEdit entity={entity} object={{}} createEntity={createGroupCallback}/>
    )
}
