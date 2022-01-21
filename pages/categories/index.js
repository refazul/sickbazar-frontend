import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories, removeCategory } from '../../services/reducers/categoriesSlice'

import globalstyles from '../../components/bonik/global.module.css';
import { Card } from '../../components/bonik/card';

export default function CategoriesList() {
    const router = useRouter();
    const dispatch = useDispatch()

    const categories = useSelector(state => state.categories.categories)
    const status = useSelector(state => state.categories.status)
    const error = useSelector(state => state.categories.error)

    const onDeleteClick = async (entity, object) => {
        const result = await dispatch(removeCategory(object.id))
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories())
        }
    }, [status, dispatch])

    let content
    let entity = 'categories'

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = categories.map(product => (
            <Card entity={entity} object={product}
                onClick={(entity, object) => { router.push('/' + entity + '/' + object.id) }}
                onEditClick={(entity, object) => { router.push([entity, object.id, 'edit'].join('/')) }}
                onDeleteClick={(entity, object) => { onDeleteClick(entity, object) }}
            />
        ))
    } else if (status === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div>
            <div className={globalstyles.formheader_head_container}>
                <div className={globalstyles.formheader_head_wrapper}>
                    <div className={globalstyles.formheader_title_wrapper}>
                        <h2 className={globalstyles.formheader_title}>{"Categories List"}</h2>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {
                            content
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}