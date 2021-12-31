import Form from '../../../components/bonik/form';
import FormHeader from '../../../components/bonik/formheader';
import { updateProduct, readProduct, fields } from '../../../services/product';

export default function ProductEdit({ product }) {
    const submitProduct = (id, data) => {
        const productId = id;
        const input = {
            "title": data.title,
            "description": data.description
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