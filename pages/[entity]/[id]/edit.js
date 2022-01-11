import { Dropdown, Form, Input, Select } from '../../../components/bonik/form';
import { updateEntity, readEntity, readEntities } from '../../../services/entity';
import { singularize, capitalize } from '../../../services/helper';
import { s3_upload } from '../../../services/s3client';

export default function EntityEdit({ entity, object, ...rest }) {
    const onSubmit = async (id, data) => {
        const { title, description, groupID } = data
        const image = data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : object.image;

        const input = { title, description, image }
        if (entity == 'products') {
            input.groupID = groupID;
            input.categoryIDs = categoryIDs;
        }
        const result = updateEntity(id, input);
    }
    return (
        <div>
            <Form onSubmitCallback={onSubmit} defaultValues={object} title={"Edit " + capitalize(singularize(entity))} button={"Back to " + capitalize(singularize(entity)) + " List"}>
                <Input name="title" placeholder="Title" />
                <Input name="description" placeholder="Description" />
                <Input name="image" type="file" />
                {
                    entity == 'products' ? <Select name="groupID" options={
                        rest.groups.map(g => {
                            const r = { title: g.title, value: g.id };
                            if (object.groupID == g.id) {
                                r.selected = true;
                            }
                            return r;
                        })
                    } /> : <div></div>
                }
                {
                    entity == 'products' ? <Dropdown name="categoryIDs" options={
                        rest.categories.map(c => {
                            const r = { title: c.title, value: c.id };
                            if (object.categoryIDs.indexOf(c.id) > -1) {
                                r.selected = true;
                            }
                            return r;
                        })
                    } /> : <div></div>
                }
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { entity, id } = context.query;
    const props = { entity }

    const param = {};
    if (entity == 'products') {
        param.extra_fields = 'groupID, categoryIDs';
    }
    props.object = await readEntity(entity, id, param);
    if (entity == 'products') {
        props.groups = await readEntities('groups', '');
        props.categories = await readEntities('categories', '');
    }

    return {
        props
    }
}