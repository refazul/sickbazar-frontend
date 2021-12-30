import Form from '../../../components/bonik/form';
import FormHeader from '../../../components/bonik/formheader';
import { updateProduct, readProduct, fields } from '../../../services/product';

export default function ProductEdit({ product }) {
    const submitProduct = async event => {
        event.preventDefault()
        const productId = event.target.id.value;
        const input = {
            "title": event.target.title.value,
            "description": event.target.description.value
        }
        const result = await updateProduct(productId, input);
    }
    return (
        <div>
            <FormHeader title="Edit Product" button="Back to Product List"></FormHeader>
            <Form fields={fields} values={product} id={product.id} onSubmit={submitProduct}></Form>
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