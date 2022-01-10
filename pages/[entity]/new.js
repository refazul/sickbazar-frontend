import { Form, Input, Dropdown, Select } from '../../components/bonik/form';
import { createEntity, readEntities } from '../../services/entity';
import { singularize, capitalize } from '../../services/helper';
import { s3_upload } from '../../services/s3client';

export default function EntityNew({ entity, ...rest }) {
    const onSubmit = async (data) => {
        const { title, description, groupID, categoryIDs } = data
        const image = data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : undefined;

        const input = { title, description, image }
        if (entity == 'products') {
            input.groupID = groupID;
            input.categoryIDs = categoryIDs;
        }
        const result = createEntity(entity, input);
    }
    return (
        <div>
            <Form onSubmitCallback={onSubmit} title={"New " + capitalize(singularize(entity))} button={"Back to " + capitalize(singularize(entity)) + " List"}>
                <Input name="title" placeholder="Title" />
                <Input name="description" placeholder="Description" />
                <Input name="image" type="file" />
                {
                    entity == 'products' ? <Select name="groupID" options={rest.groups.map(g => { return { title: g.title, value: g.id } })} /> : <div></div>
                }
                {
                    entity == 'products' ? <Dropdown name="categoryIDs" options={rest.categories.map(g => { return { title: g.title, value: g.id } })} /> : <div></div>
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
        props.groups = await readEntities('group', '');
        props.categories = await readEntities('category', '');
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