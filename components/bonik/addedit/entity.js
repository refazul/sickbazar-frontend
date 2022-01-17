import { CrossAttribute, Dropdown, Form, Input, Select, Submit, Table, Row } from '../form';
import { singularize, capitalize, isValidHttpUrl } from '../../../services/helper';
import { s3_upload } from '../../../services/s3client';
import { useRouter } from 'next/router';

export function EntityAddEdit({ entity, object, createEntity, updateEntity, groups, categories, attributes }) {
    const router = useRouter();
    const onSubmit = async (data) => {
        const { title, description, groupID, categoryIDs } = data
        const image = isValidHttpUrl(data.image) ? data.image : (data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : object.image);

        const input = { title, description, image }
        if (entity == 'products') {
            input.groupID = groupID;
            input.categoryIDs = categoryIDs;
        }
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
            <Input name="image" type="file" />
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
                entity == 'attributes' ? <div>
                    <Table columns={[{ title: "Title" }, { title: "Value" }, { title: "Color" }, { title: "Image" }, { title: "" }]}>
                        {
                            object.options.map((option) => {
                                return (
                                    <Row object={option} saveCallback={(option) => { console.log(option) }}></Row>
                                )
                            })
                        }
                    </Table>
                </div> : <div></div>
            }
            <Submit text="Save" />
        </Form>
    )
}