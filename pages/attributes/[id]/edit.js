import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttribute, updateAttribute } from '../../../services/reducers/attributesSlice';
import { Form, Input, Select, Submit, Table } from '../../../components/bonik/form';
import { capitalize, isValidHttpUrl, singularize } from '../../../services/helper';
import { s3_upload } from '../../../services/s3client';

export default function AttributeEdit({ id }) {
    const entity = 'attributes'
    const dispatch = useDispatch()

    const attribute = useSelector(state => state.attributes.attributes.find(a => a.id === id))
    const status = useSelector(state => state.attributes.status)
    const error = useSelector(state => state.attributes.error)

    useEffect(() => {
        dispatch(fetchAttribute([id]))
    }, [])

    const updateAttributeCallback = async (data) => {
        const { title, description, name, type, options } = data
        const image = isValidHttpUrl(data.image) ? data.image : (data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : attribute.image);

        const input = { title, description, image, name, type, options }
        console.log(input);
        
        dispatch(updateAttribute([id, input]))
    }

    let content

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content =
            <Form onSubmitCallback={updateAttributeCallback} defaultValues={attribute} title={"Edit " + capitalize(singularize(entity))} buttonText={"Back to " + capitalize(singularize(entity)) + " List"} buttonOnClick={() => { router.push('/' + entity) }}>
                <Input name="title" placeholder="Title" />
                <Input name="description" placeholder="Description" />
                <Input name="name" placeholder="Name" />
                <Select name="type" title="Type" options={[{ title: "Color", value: "color" }, { title: "Text", value: "text" }, { title: "Image", value: "image" }].map(r => { if (attribute.type == r.value) { r.selected = true } return r; })} />
                <Table name="options" object={attribute} rows={attribute.options} columns={[{ title: "Color", value: "color" }, { title: "Text", value: "text" }, { title: "Image", value: "image" }]} />
                <Submit text="Save" />
            </Form>
    } else if (status === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div>{content}</div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    return {
        props: {
            id
        }
    }
}