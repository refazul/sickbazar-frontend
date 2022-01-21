import { EntityAddEdit } from '../../components/bonik/entity/addedit';
import { createEntity, updateEntity } from '../../services/entity';
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import { fetchGroups } from '../../services/reducers/groupsSlice';
import { fetchCategories } from '../../services/reducers/categoriesSlice';
import { fetchAttributes } from '../../services/reducers/attributesSlice';


export default function AttributeNew() {
    const entity = 'attributes'

    return (
        <EntityAddEdit entity={entity} object={{}} createEntity={createEntity} updateEntity={updateEntity}></EntityAddEdit>
    )
}
