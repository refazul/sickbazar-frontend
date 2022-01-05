import { Form, Input, Select } from '../../components/bonik/form';
import FormHeader from '../../components/bonik/formheader';
import { createProduct } from '../../services/product';
import { readGroups } from '../../services/group';
import { s3_upload } from '../../services/s3client';

export default function ProductNew({ groups }) {
    const onSubmit = async (data) => {
        const { title, description, groupID } = data
        const image = data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : undefined;
        const result = createProduct({ title, description, image, groupID });
    }
    return (
        <div>
            <FormHeader title="New Product" button="Back to Product List"></FormHeader>
            <Form onSubmitCallback={onSubmit}>
                <Input name="title" placeholder="Title" />
                <Input name="description" placeholder="Description" />
                <Input name="image" type="file" />
                <Select name="groupID" options={groups.map(g => { return { title: g.title, value: g.id } })} />
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

export async function getServerSideProps() {
    const groups = await readGroups('')
    return {
        props: { groups }
    }
}