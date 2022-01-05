import { Form, Input } from '../../components/bonik/form';
import { createGroup, fields } from '../../services/group';
import { s3_upload } from '../../services/s3client';

export default function GroupNew() {
    const onSubmit = async (data) => {
        const { title, description } = data
        const image = data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : undefined;
        const result = createGroup({ title, description, image });
    }
    return (
        <div>
            <Form onSubmitCallback={onSubmit} title="New Group" button="Back to Group List">
                <Input name="title" placeholder="Title" />
                <Input name="description" placeholder="Description" />
                <Input name="image" type="file"/>
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}