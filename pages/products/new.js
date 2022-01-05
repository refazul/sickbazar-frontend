import Form from '../../components/bonik/form';
import FormHeader from '../../components/bonik/formheader';
import { createProduct, fields } from '../../services/product';
import { s3_upload } from '../../services/s3client';

export default function ProductNew() {
    const submitProduct = async (data) => {
        const input = {
            "title": data.title,
            "description": data.description
        }
        const file = data.image[0];
        const url = await s3_upload(file)
        input.image = url;
        const result = createProduct(input);
    }
    return (
        <div>
            <FormHeader title="New Product" button="Back to Product List"></FormHeader>
            <Form fields={fields} onSubmitCallback={submitProduct}></Form>
        </div>
    )
}