import { useRouter } from 'next/router';
import { readProducts, removeProduct } from '../../services/product';
import { readGroups, removeGroup } from '../../services/group';

export default function EntityList({ entity, objects }) {
    const router = useRouter();
    const onDeleteClick = async (entity, object) => {
        if (entity == 'products') {
            removeProduct(object.id)
         } else if (entity == 'groups') {
            removeGroup(object.id);
         }
    }
    return (
        <div>
            {
                objects.map((object) => {
                    return (
                        <div key={(Math.random() + 1).toString(36).substring(7)}>
                            <div onClick={() => { router.push('/' + entity +'/' + object.id) }}>
                                <div>{object.title}</div>
                                <div>{object.description}</div>
                            </div>
                            <button onClick={() => { router.push('/' + entity +'/' + object.id + '/edit') }}>Edit</button>
                            <button onClick={() => { onDeleteClick(entity, object) }}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export async function getServerSideProps(context) {
    const { entity } = context.query;
    const props = { entity }

    if (entity == 'products') {
        props.objects = await readProducts('');
    } else if (entity == 'groups') {
        props.objects = await readGroups('');
    }
    return {
        props
    }
}