import Form from '../../components/bonik/form';
import FormHeader from '../../components/bonik/formheader';
import { createProduct, fields } from '../../services/product';

export default function ProductNew() {
    const submitProduct = async event => {
        event.preventDefault()
        const input = {
            "title": event.target.title.value,
            "description": event.target.description.value
        }
        const result = await createProduct(input)
    }
    return (
        <div>
            <FormHeader title="New Product" button="Back to Product List"></FormHeader>
            <Form fields={fields} values={{}} onSubmit={submitProduct}></Form>
        </div>
    )
}