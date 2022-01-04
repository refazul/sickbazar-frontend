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
        const file = data.image[0];
        fetch('/api/s3sign').then((val) => {
            val.json().then((signed) => {
                console.log(signed);
                fetch(signed.uploadURL, { method: "PUT", body: file }).then((res) => {
                    console.log(res);
                    input.image = res.url.split('?')[0];
                    console.log(input);
                    const result = createProduct(input)
                });
            })
        })
    }
    return (
        <div>
            <FormHeader title="New Product" button="Back to Product List"></FormHeader>
            <Form fields={fields} onSubmitCallback={submitProduct}></Form>
        </div>
    )
}