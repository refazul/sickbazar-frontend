import Form from '../../../components/bonik/form';
import FormHeader from '../../../components/bonik/formheader';
import { updateProduct, readProduct, fields } from '../../../services/product';
import { s3_upload } from '../../../services/s3client';

export default function ProductEdit({ product }) {
    const submitProduct = async (id, data) => {
        const productId = id;
        const input = {
            "title": data.title,
            "description": data.description
        }
        if (data.image && data.image.length > 0) {
            const file = data.image[0];
            const url = await s3_upload(file);
            input.image = url;
        }
        const result = updateProduct(productId, input);
    }
    return (
        <div>
            <FormHeader title="Edit Product" button="Back to Product List"></FormHeader>
            <Form fields={fields} defaultValues={product} onSubmitCallback={submitProduct}></Form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const product = await readProduct(id);
    return {
        props: { product }
    }
}