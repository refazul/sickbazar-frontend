import { readProduct } from '../../services/product';
import { readGroup } from '../../services/group';

export default function EntityDetail({ object }) {
    return (
        <div>
            <div>{object.id}</div>
            <div>{object.title}</div>
            <div>{object.description}</div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { entity, id } = context.query;
    const props = { entity }

    if (entity == 'products') {
        props.object = await readProduct(id);
    } else if (entity == 'groups') {
        props.object = await readGroup(id);
    }
    return {
        props
    }
}