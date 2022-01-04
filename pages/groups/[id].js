import { readGroup } from '../../services/group';

export default function GroupDetail({ group }) {
    console.log(group);
    return (
        <div>
            <div>{group.id}</div>
            <div>{group.title}</div>
            <div>{group.description}</div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const group = await readGroup(id);
    return {
        props: { group }
    }
}