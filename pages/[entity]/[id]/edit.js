import { Form, Input, Select } from '../../../components/bonik/form';
import { updateProduct, readProduct } from '../../../services/product';
import { updateGroup, readGroup, readGroups } from '../../../services/group';
import { updateCategory, readCategory, readCategories } from '../../../services/category';
import { singularize, capitalize } from '../../../services/helper';
import { s3_upload } from '../../../services/s3client';

export default function EntityEdit({ entity, object, ...rest }) {
    const onSubmit = async (id, data) => {
        const { title, description, groupID } = data
        const image = data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : object.image;

        if (entity == 'products') {
            const result = updateProduct(id, { title, description, image, groupID });
        } else if (entity == 'groups') {
            const result = updateGroup(id, { title, description, image });
        } else if (entity == 'categories') {
            const result = updateCategory(id, { title, description, image });
        }
    }
    return (
        <div>
            <Form onSubmitCallback={onSubmit} defaultValues={object} title={"Edit " + capitalize(singularize(entity))} button={"Back to " + capitalize(singularize(entity)) + " List"}>
                <Input name="title" placeholder="Title" />
                <Input name="description" placeholder="Description" />
                <Input name="image" type="file" />
                {
                    entity == 'products' ? <Select name="groupID" options={rest.groups.map(g => { return { title: g.title, value: g.id } })} /> : <div></div>
                }
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { entity, id } = context.query;
    const props = { entity }

    if (entity == 'products') {
        props.object = await readProduct(id);
        props.groups = await readGroups('');
    } else if (entity == 'groups') {
        props.object = await readGroup(id);
    } else if (entity == 'categories') {
        props.object = await readCategory(id);
    }
    
    return {
        props
    }
}