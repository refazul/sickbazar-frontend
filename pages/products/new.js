import Form from '../../components/bonik/form';
import FormHeader from '../../components/bonik/formheader';


const fields = [
    { "title": "Title", "name": "title" },
    { "title": "Description", "name": "description" },
]

export default function ProductNew() {
    const createProduct = async event => {
        event.preventDefault()

        const query = `
            mutation CreateProduct($input: ProductInput) {
                createProduct(input: $input) {
                    success
                }
            }
        `;
        const variables = {
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
            <FormHeader title="New Product" button="Back to Product List"></FormHeader>
            <Form fields={fields} values={{}} onSubmit={createProduct}></Form>
        </div>
    )
}