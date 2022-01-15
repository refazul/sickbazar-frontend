import { EntityAddEdit } from '../../../components/bonik/addedit/entity';
import { createEntity, readEntity, readEntities, updateEntity, deleteEntity } from '../../../services/entity';
import useSWR from 'swr';

export default function EntityEdit({ entity, object, ...rest }) {
    const groups = useSWR(['groups', ''], readEntities).data;
    const categories = useSWR(['categories', ''], readEntities).data;
    const attributes = useSWR(['attributes', '', { extra_fields : "name, type, options{title, value, color, image}" }], readEntities).data;
    
    if (!groups || !categories || !attributes) return <div />
    return (
        <EntityAddEdit entity={entity} object={object} createEntity={createEntity} updateEntity={updateEntity} groups={groups} categories={categories} attributes={attributes}></EntityAddEdit>
    )
}

export async function getServerSideProps(context) {
    const { entity, id } = context.query;
    const props = { entity }

    const param = {};
    if (entity == 'products') {
        param.extra_fields = 'groupID, categoryIDs';
    }
    props.object = await readEntity(entity, id, param);

    return {
        props
    }
}