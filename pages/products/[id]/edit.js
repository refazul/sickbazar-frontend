import { EntityAddEdit } from '../../../components/bonik/entity/addedit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, updateProduct } from '../../../services/reducers/productsSlice';
import { fetchGroups } from '../../../services/reducers/groupsSlice';
import { fetchCategories } from '../../../services/reducers/categoriesSlice';
import { fetchAttributes } from '../../../services/reducers/attributesSlice';


export default function ProductEdit({ id }) {
    const entity = 'products'
    const dispatch = useDispatch()

    const product = useSelector(state => state.products.products.find(a => a.id === id))
    const status = useSelector(state => state.products.status)
    const error = useSelector(state => state.products.error)

    const groups = useSelector(state => state.groups.groups);
    const categories = useSelector(state => state.categories.categories);
    const attributes = useSelector(state => state.attributes.attributes);

    const group_status = useSelector(state => state.groups.status)
    const category_status = useSelector(state => state.categories.status)
    const attribute_status = useSelector(state => state.attributes.status)

    useEffect(() => {
        dispatch(fetchProduct([entity, id, { }]))
        dispatch(fetchGroups())
        dispatch(fetchCategories())
        dispatch(fetchAttributes())
    }, [])

    const updateProductCallback = async (entity, entityID, input) => {
        dispatch(updateProduct([entity, entityID, input]))
    }

    if (group_status != 'succeeded' || category_status != 'succeeded' || attribute_status != 'succeeded') return <div />

    let content

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = <EntityAddEdit entity={entity} object={product} updateEntity={updateProductCallback} groups={groups} categories={categories} attributes={attributes} />
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