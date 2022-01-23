import { EntityAddEdit } from '../../../components/bonik/entity/addedit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, updateCategory } from '../../../services/reducers/categoriesSlice';


export default function CategoryEdit({ id }) {
    const entity = 'categories'
    const dispatch = useDispatch()

    const category = useSelector(state => state.categories.categories.find(a => a.id === id))
    const status = useSelector(state => state.categories.status)
    const error = useSelector(state => state.categories.error)

    useEffect(() => {
        dispatch(fetchCategory([entity, id, {}]))
    }, [])

    const updateCategoryCallback = async (entity, entityID, input) => {
        dispatch(updateCategory([entity, entityID, input]))
    }

    let content

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = <EntityAddEdit entity={entity} object={category} updateEntity={updateCategoryCallback} />
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