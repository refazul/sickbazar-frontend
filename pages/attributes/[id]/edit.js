import { EntityAddEdit } from '../../../components/bonik/entity/addedit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttribute, updateAttribute } from '../../../services/reducers/attributesSlice';


export default function AttributeEdit({ id }) {
    const entity = 'attributes'
    const dispatch = useDispatch()

    const attribute = useSelector(state => state.attributes.attributes.find(a => a.id === id))
    const status = useSelector(state => state.attributes.status)
    const error = useSelector(state => state.attributes.error)

    useEffect(() => {
        dispatch(fetchAttribute([entity, id, { extra_fields: 'name, type, options{color, text, image}' }]))
    }, [])

    const updateAttributeCallback = async (entity, entityID, input) => {
        dispatch(updateAttribute([entity, entityID, input]))
    }

    let content

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = <EntityAddEdit entity={entity} object={attribute} updateEntity={updateAttributeCallback} />
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