import { EntityAddEdit } from '../../components/bonik/addedit/entity';
import { createEntity, readEntity, readEntities, updateEntity, deleteEntity } from '../../services/entity';


export default function EntityNew({ entity, ...rest }) {
    return (
        <EntityAddEdit entity={entity} object={{}} createEntity={createEntity} updateEntity={updateEntity} {...rest}></EntityAddEdit>
    )
}

export async function getServerSideProps(context) {
    const { entity } = context.query;
    const props = { entity }

    if (entity == 'products') {
        props.groups = await readEntities('groups', '');
        props.categories = await readEntities('categories', '');
        /**
         * attributes = readAttributes('')
         * "Add Option" CLICK => 1 Single DropDown(attribute keynames) & 1 Multi Dropdown(of the attribute values)
         * Pick one from left => Multi DropDown update
         * Pick one from the right => Cross Product variant UI below
         */
    }
    return {
        props
    }
}