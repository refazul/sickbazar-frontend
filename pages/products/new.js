import { EntityAddEdit } from '../../components/bonik/addedit/entity';
import { createEntity, updateEntity } from '../../services/entity';
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import { fetchGroups } from '../../services/reducers/groupsSlice';
import { fetchCategories } from '../../services/reducers/categoriesSlice';
import { fetchAttributes } from '../../services/reducers/attributesSlice';


export default function ProductNew() {
    const dispatch = useDispatch()
    const entity = 'products'

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

    if (group_status != 'succeeded' || category_status != 'succeeded' || attribute_status != 'succeeded') return <div />
    return (
        <EntityAddEdit entity={entity} object={{}} createEntity={createEntity} updateEntity={updateEntity} groups={groups} categories={categories} attributes={attributes}></EntityAddEdit>
    )
}
