import { EntityAddEdit } from '../../components/bonik/entity/addedit';
import React, { useState } from 'react';
import { createCategory } from '../../services/reducers/categoriesSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';


export default function CategoryNew() {
    const entity = 'categories'
    const dispatch = useDispatch()
    const router = useRouter();

    const createCategoryCallback = async (entity, input) => {
        dispatch(createCategory([entity, input])).then(res => {
            const id = res.payload.id;
            router.push('/' + entity + '/' + id + '/edit');
        });
    }

    return (
        <EntityAddEdit entity={entity} object={{}} createEntity={createCategoryCallback}/>
    )
}
