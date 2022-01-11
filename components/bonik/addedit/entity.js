import { Dropdown, Form, Input, Select } from '../form';
import { singularize, capitalize } from '../../../services/helper';
import { s3_upload } from '../../../services/s3client';

export function EntityAddEdit({ entity, object, createEntity, updateEntity, ...rest}) {
    const onSubmit = async (data) => {
        const { title, description, groupID, categoryIDs } = data
        const image = data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : object.image;

        const input = { title, description, image }
        if (entity == 'products') {
            input.groupID = groupID;
            input.categoryIDs = categoryIDs;
        }
        if (object.id) {
            const result = updateEntity(entity, object.id, input);
        } else {
            const result = createEntity(entity, input);
        }
    }
    return (
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
                        if (object.categoryIDs && object.categoryIDs.indexOf(c.id) > -1) {
                            r.selected = true;
                        }
                        return r;
                    })
                } /> : <div></div>
            }
            <button type="submit">Submit</button>
        </Form>
    )
}