import { CrossAttribute, Dropdown, Form, Input, Select, Submit, Table, Row } from '../form';
import { singularize, capitalize, isValidHttpUrl } from '../../../services/helper';
import { s3_upload } from '../../../services/s3client';
import { useRouter } from 'next/router';

export function EntityAddEdit({ entity, object, createEntity, updateEntity, groups, categories, attributes }) {
    const router = useRouter();
    const onSubmit = async (data) => {
        const { title, description, groupID, categoryIDs, name, type, options } = data
        const image = isValidHttpUrl(data.image) ? data.image : (data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : object.image);

        const input = { title, description, image }
        if (entity == 'products') {
            input.groupID = groupID;
            input.categoryIDs = categoryIDs;
        } else if (entity == 'attributes') {
            input.name = name;
            input.type = type;
            input.options = options;
        }
        console.log(input);
        
        if (object.id) {
            const result = await updateEntity(entity, object.id, input);
        } else {
            const result = await createEntity(entity, input);
            router.push('/' + entity + '/' + result.entity._id + '/edit');
        }
    }
    return (
        <Form onSubmitCallback={onSubmit} defaultValues={object} title={(object.id ? "Edit " : "New ") + capitalize(singularize(entity))} buttonText={"Back to " + capitalize(singularize(entity)) + " List"} buttonOnClick={() => { router.push('/' + entity) }}>
            <Input name="title" placeholder="Title" />
            <Input name="description" placeholder="Description" />
            {
                entity != 'attributes' ? <Input name="image" type="file" /> : <div></div>
            }
            {
                entity == 'products' ? <Select title="Group" name="groupID" options={
                    groups.map(g => {
                        const r = { title: g.title, value: g.id };
                        if (object.groupID == g.id) {
                            r.selected = true;
                        }
                        return r;
                    })
                } /> : <div></div>
            }
            {
                entity == 'products' ? <Dropdown name="categoryIDs" title="Categories" options={
                    categories.map(c => {
                        const r = { title: c.title, value: c.id };
                        if (object.categoryIDs && object.categoryIDs.indexOf(c.id) > -1) {
                            r.selected = true;
                        }
                        return r;
                    })
                } /> : <div></div>
            }
            {
                entity == 'products' ? <CrossAttribute attributes={attributes.map(a => ({ ...a, value: a.name }))} title="Attributes" /> : <div></div>
            }
            {
                entity == 'attributes' ? <Input name="name" placeholder="Name" /> : <div></div>
            }
            {
                entity == 'attributes' ? <Select name="type" title="Type" options={[{ title: "Color", value: "color" }, { title: "Text", value: "text" }, { title: "Image", value: "image" }].map(r => { if (object.type == r.value) { r.selected = true } return r; })} /> : <div></div>
            }
            {
                entity == 'attributes' ? <Table name="options" object={object} rows={object.options} columns={[{ title: "Color", value: "color" }, { title: "Text", value: "text" }, { title: "Image", value: "image" }]} /> : <div></div>
            }
            <Submit text="Save" />
        </Form>
    )
}