import Form from '../../components/bonik/form';
import FormHeader from '../../components/bonik/formheader';
import { createGroup, fields } from '../../services/group';
import { s3_upload } from '../../services/s3client';

export default function GroupNew() {
    const submitGroup = async (data) => {
        const input = {
            "title": data.title,
            "description": data.description
        }
        const file = data.image[0];
        const url = await s3_upload(file)
        input.image = url;
        const result = createGroup(input);
    }
    return (
        <div>
            <FormHeader title="New Group" button="Back to Group List"></FormHeader>
            <Form fields={fields} onSubmitCallback={submitGroup}></Form>
        </div>
    )
}