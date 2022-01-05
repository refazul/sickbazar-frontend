import { Form, Input } from '../../../components/bonik/form';
import { updateGroup, readGroup } from '../../../services/group';
import { s3_upload } from '../../../services/s3client';

export default function GroupEdit({ group }) {
    const onSubmit = async (id, data) => {
        const { title, description } = data
        const image = data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : group.image;
        const result = updateGroup(id, { title, description, image });
    }
    return (
        <div>
            <Form onSubmitCallback={onSubmit} defaultValues={group} title="Edit Group" button="Back to Group List">
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