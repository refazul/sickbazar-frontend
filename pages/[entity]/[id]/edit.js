import { EntityAddEdit } from '../../../components/bonik/addedit/entity';
import { createEntity, readEntity, readEntities, updateEntity, deleteEntity } from '../../../services/entity';

export default function EntityEdit({ entity, object, ...rest }) {
    return (
        <EntityAddEdit entity={entity} object={object} createEntity={createEntity} updateEntity={updateEntity} {...rest}></EntityAddEdit>
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
    if (entity == 'products') {
        props.groups = await readEntities('groups', '');
        props.categories = await readEntities('categories', '');
        props.attributes = await readEntities('attributes', '', { extra_fields : "name, type, options{title, value, color, image}" });
    }

    return {
        props
    }
}