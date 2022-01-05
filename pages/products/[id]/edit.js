import { Form, Input, Select } from '../../../components/bonik/form';
import FormHeader from '../../../components/bonik/formheader';
import { updateProduct, readProduct } from '../../../services/product';
import { readGroups } from '../../../services/group';
import { s3_upload } from '../../../services/s3client';

export default function ProductEdit({ product, groups }) {
    const onSubmit = async (id, data) => {
        const { title, description, groupID } = data
        const image = data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : product.image;
        const result = updateProduct(id, { title, description, image, groupID });
    }
    return (
        <div>
            <FormHeader title="Edit Product" button="Back to Product List"></FormHeader>
            <Form onSubmitCallback={onSubmit} defaultValues={product}>
                <Input name="title" placeholder="Title" />
                <Input name="description" placeholder="Description" />
                <Input name="image" type="file" />
                <Select name="groupID" options={groups.map(g => { return { title: g.title, value: g.id } })} />
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const product = await readProduct(id);
    const groups = await readGroups('');
    return {
        props: { product, groups }
    }
}