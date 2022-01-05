import { Form, Input } from '../../../components/bonik/form';
import FormHeader from '../../../components/bonik/formheader';
import { updateGroup, readGroup } from '../../../services/group';
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
            <Form onSubmitCallback={submitGroup} defaultValues={group}>
                <Input name="title" placeholder="Title" />
                <Input name="description" placeholder="Description" />
                <Input name="image" type="file"/>
                <button type="submit">Submit</button>
            </Form>
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