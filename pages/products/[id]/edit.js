import Form from '../../../components/bonik/form';
import FormHeader from '../../../components/bonik/formheader';

const fields = [
    { "title": "Title", "name": "title" },
    { "title": "Description", "name": "description" },
]

export default function ProductEdit({ product }) {
    const updateProduct = async event => {
        event.preventDefault()

        const query = `
            mutation Mutation($productId: ID!, $input: ProductInput) {
                updateProduct(productID: $productId, input: $input) {
                    success
                }
            }
        `;
        const variables = {
            "productId": event.target.id.value,
            "input": {
                "title": event.target.title.value,
                "description": event.target.description.value
            }
        }
        const res = await fetch(
            'https://graphql.crescentcoder.com/graphql',
            {
                body: JSON.stringify({ query, variables }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        const result = await res.json()
        console.log(result);
    }
    return (
        <div>
            <FormHeader title="Edit Product" button="Back to Product List"></FormHeader>
            <Form fields={fields} values={product} id={product.id} onSubmit={updateProduct}></Form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    const API_URL = 'https://graphql.crescentcoder.com/graphql'
    const query = `
        query ReadProduct($productId: ID!) {
            readProduct(productID: $productId) {
                title
                description
                id
            }
        }
    `;
    const variables = { "productId": id }
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    })

    const json = await res.json()

    /*
    const json = [
        { "title": "RTX 3080", "description": "non LHR" },
    ]
    */

    return {
        props: {
            product: json.data.readProduct
        }
    }
}