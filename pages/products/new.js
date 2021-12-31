import Form from '../../components/bonik/form';
import FormHeader from '../../components/bonik/formheader';
import { createProduct, fields } from '../../services/product';

export default function ProductNew() {
    const submitProduct = (data) => {
        const input = {
            "title": data.title,
            "description": data.description
        }
        const result = createProduct(input)
    }
    return (
        <div>
            <FormHeader title="New Product" button="Back to Product List"></FormHeader>
            <Form fields={fields} onSubmitCallback={submitProduct}></Form>
        </div>
    )
}