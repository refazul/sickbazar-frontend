import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, updateProduct } from '../../../services/reducers/productsSlice';
import { fetchGroups } from '../../../services/reducers/groupsSlice';
import { fetchCategories } from '../../../services/reducers/categoriesSlice';
import { fetchAttributes } from '../../../services/reducers/attributesSlice';
import { CrossAttribute, Dropdown, Form, Input, Select, Submit } from '../../../components/bonik/form';
import { capitalize, isValidHttpUrl, singularize } from '../../../services/helper';
import { s3_upload } from '../../../services/s3client';


export default function ProductEdit({ id }) {
    const entity = 'products'
    const dispatch = useDispatch()

    const product = useSelector(state => state.products.products.find(a => a.id === id))
    const status = useSelector(state => state.products.status)
    const error = useSelector(state => state.products.error)

    const groups = useSelector(state => state.groups.groups);
    const categories = useSelector(state => state.categories.categories);
    const attributes = useSelector(state => state.attributes.attributes);

    const group_status = useSelector(state => state.groups.status)
    const category_status = useSelector(state => state.categories.status)
    const attribute_status = useSelector(state => state.attributes.status)

    useEffect(() => {
        dispatch(fetchProduct([entity, id, {}]))
        dispatch(fetchGroups())
        dispatch(fetchCategories())
        dispatch(fetchAttributes(['']))
    }, [])

    const updateProductCallback = async (data) => {
        const { title, description, groupID, categoryIDs } = data
        const image = isValidHttpUrl(data.image) ? data.image : (data.image && data.image.length > 0 ? await s3_upload(data.image[0]) : product.image);

        const input = { title, description, image, groupID, categoryIDs }
        console.log(input);

        dispatch(updateProduct([entity, id, input]))
    }

    if (group_status != 'succeeded' || category_status != 'succeeded' || attribute_status != 'succeeded') return <div />

    let content

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content =
            <Form onSubmitCallback={updateProductCallback} defaultValues={product} title={"Edit " + capitalize(singularize(entity))} buttonText={"Back to " + capitalize(singularize(entity)) + " List"} buttonOnClick={() => { router.push('/' + entity) }}>
                <Input name="title" placeholder="Title" />
                <Input name="description" placeholder="Description" />
                <Input name="image" type="file" />
                <Select title="Group" name="groupID" options={
                    groups.map(g => {
                        const r = { title: g.title, value: g.id };
                        if (product.groupID == g.id) {
                            r.selected = true;
                        }
                        return r;
                    })
                } />
                <Dropdown name="categoryIDs" title="Categories" options={
                    categories.map(c => {
                        const r = { title: c.title, value: c.id };
                        if (product.categoryIDs && product.categoryIDs.indexOf(c.id) > -1) {
                            r.selected = true;
                        }
                        return r;
                    })
                } />
                <CrossAttribute attributes={attributes.map(a => ({ ...a, value: a.name }))} title="Attributes" />
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