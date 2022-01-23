import { EntityAddEdit } from '../../components/bonik/entity/addedit';
import React, { useState } from 'react';
import { createAttribute } from '../../services/reducers/attributesSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';


export default function AttributeNew() {
    const entity = 'attributes'
    const dispatch = useDispatch()
    const router = useRouter();

    const createAttributeCallback = async (entity, input) => {
        dispatch(createAttribute([entity, input])).then(res => {
            const id = res.payload.id;
            router.push('/' + entity + '/' + id + '/edit');
        });
    }

    return (
        <EntityAddEdit entity={entity} object={{}} createEntity={createAttributeCallback}/>
    )
}
