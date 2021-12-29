import Form from '../../components/bonik/form';
import FormHeader from '../../components/bonik/formheader';


const fields = [
    { "title": "Title", "id": "title" },
    { "title": "Description", "id": "description" },
]

export default function ProductNew() {
    return (
        <div>
            <FormHeader title="Edit Product" button="Back to Product List"></FormHeader>
            <Form fields={fields}></Form>
        </div>
    )
}