import { EntityAddEdit } from '../../components/bonik/entity/addedit';
import { createProduct } from '../../services/reducers/productsSlice';
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import { fetchGroups } from '../../services/reducers/groupsSlice';
import { fetchCategories } from '../../services/reducers/categoriesSlice';
import { fetchAttributes } from '../../services/reducers/attributesSlice';
import { useRouter } from 'next/router';


export default function ProductNew() {
    const entity = 'products'
    const dispatch = useDispatch()
    const router = useRouter();

    const groups = useSelector(state => state.groups.groups);
    const categories = useSelector(state => state.categories.categories);
    const attributes = useSelector(state => state.attributes.attributes);

    const group_status = useSelector(state => state.groups.status)
    const category_status = useSelector(state => state.categories.status)
    const attribute_status = useSelector(state => state.attributes.status)

    useEffect(() => {
        dispatch(fetchGroups())
        dispatch(fetchCategories())
        dispatch(fetchAttributes())
    }, [])

    const createProductCallback = async (entity, input) => {
        dispatch(createProduct([entity, input])).then(res => {
            const id = res.payload.id;
            router.push('/' + entity + '/' + id + '/edit');
        });
    }

    if (group_status != 'succeeded' || category_status != 'succeeded' || attribute_status != 'succeeded') return <div />

    return (
        <EntityAddEdit entity={entity} object={{}} createEntity={createProductCallback} groups={groups} categories={categories} attributes={attributes} />
    )
}
