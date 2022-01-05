import Form from '../../../components/bonik/form';
import FormHeader from '../../../components/bonik/formheader';
import { updateGroup, readGroup, fields } from '../../../services/group';
import { s3_upload } from '../../../services/s3client';

export default function GroupEdit({ group }) {
    const submitGroup = async (id, data) => {
        const groupId = id;
        const input = {
            "title": data.title,
            "description": data.description
        }
        if (data.image && data.image.length > 0) {
            const file = data.image[0];
            const url = await s3_upload(file);
            input.image = url;
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