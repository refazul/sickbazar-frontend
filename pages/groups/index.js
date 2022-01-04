import { useRouter } from 'next/router';
import { readGroups, removeGroup } from '../../services/group';
export default function GroupList({ groups }) {
    const router = useRouter();
    return (
        <div>
            {
                groups.map((group) => {
                    return (
                        <div key={(Math.random() + 1).toString(36).substring(7)}>
                            <div onClick={() => { router.push('/groups/' + group.id) }}>
                                <div>{group.title}</div>
                                <div>{group.description}</div>
                            </div>
                            <button onClick={() => { router.push('/groups/' + group.id + '/edit') }}>Edit</button>
                            <button onClick={() => { removeGroup(group.id) }}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export async function getServerSideProps() {
    const groups = await readGroups('')
    return {
        props: { groups }
    }
}