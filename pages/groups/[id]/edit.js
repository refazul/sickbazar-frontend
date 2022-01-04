import Form from '../../../components/bonik/form';
import FormHeader from '../../../components/bonik/formheader';
import { updateGroup, readGroup, fields } from '../../../services/group';

export default function GroupEdit({ group }) {
    const submitGroup = (id, data) => {
        const groupId = id;
        const input = {
            "title": data.title,
            "description": data.description
        }
        const result = updateGroup(groupId, input);
    }
    return (
        <div>
            <FormHeader title="Edit Group" button="Back to Group List"></FormHeader>
            <Form fields={fields} defaultValues={group} onSubmitCallback={submitGroup}></Form>
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