import Form from '../../components/bonik/form';
import FormHeader from '../../components/bonik/formheader';
import { createProduct, fields } from '../../services/product';
import { s3_upload } from '../../services/s3client';

export default function ProductNew() {
    const submitProduct = (data) => {
        const input = {
            "title": data.title,
            "description": data.description
        }
        const key = (Math.random() + 1).toString(36).substring(7) + '.jpeg';
        s3_upload(data.image[0], key).then((res) => {
            input.image = res.Location;
            console.log(input);
            const result = createProduct(input)
        });
    }
    return (
        <div>
            <FormHeader title="New Product" button="Back to Product List"></FormHeader>
            <Form fields={fields} onSubmitCallback={submitProduct}></Form>
        </div>
    )
}