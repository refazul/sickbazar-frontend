import { Form, Input, Dropdown, Select } from '../../components/bonik/form';
import { createProduct } from '../../services/product';
import { createGroup, readGroups } from '../../services/group';
import { createCategory, readCategories } from '../../services/category';
import { singularize, capitalize } from '../../services/helper';
import { s3_upload } from '../../services/s3client';

export default function EntityNew({ entity, ...rest }) {
    const onSubmit = async (data) => {
        const { title, description, groupID } = data
        const image = data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : undefined;

        if (entity == 'products') {
            const result = createProduct({ title, description, image, groupID });
        } else if (entity == 'groups') {
            const result = createGroup({ title, description, image });
        } else if (entity == 'categories') {
            const result = createCategory({ title, description, image });
        }
    }
    return (
        <div>
            <Form onSubmitCallback={onSubmit} title={"New " + capitalize(singularize(entity))} button={"Back to " + capitalize(singularize(entity)) + " List"}>
                <Input name="title" placeholder="Title" />
                <Input name="description" placeholder="Description" />
                <Input name="image" type="file" />
                {
                    entity == 'products' ? <Dropdown name="groupID" options={rest.groups.map(g => { return { title: g.title, value: g.id } })} /> : <div></div>
                }
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { entity } = context.query;
    const props = { entity }

    if (entity == 'products') {
        props.groups = await readGroups('');
        props.categories = await readCategories('');
        /**
         * attributes = readAttributes('')
         * "Add Option" CLICK => 1 Single DropDown(attribute keynames) & 1 Multi Dropdown(of the attribute values)
         * Pick one from left => Multi DropDown update
         * Pick one from the right => Cross Product variant UI below
         */
    }
    return {
        props
    }
}