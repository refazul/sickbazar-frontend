import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGroups, removeGroup } from '../../services/reducers/groupsSlice'

import globalstyles from '../../components/bonik/global.module.css';
import { Card } from '../../components/bonik/card';

export default function GroupsList() {
    const router = useRouter();
    const dispatch = useDispatch()

    const groups = useSelector(state => state.groups.groups)
    const status = useSelector(state => state.groups.status)
    const error = useSelector(state => state.groups.error)

    const onDeleteClick = async (entity, object) => {
        const result = await dispatch(removeGroup(object.id))
    }

    useEffect(() => {
        dispatch(fetchGroups())
    }, [])

    let content
    let entity = 'groups'

    if (status === 'loading') {
        content = <div>"Loading..."</div>
    } else if (status === 'succeeded') {
        content = groups.map(group => (
            <Card entity={entity} object={group}
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
                        <h2 className={globalstyles.formheader_title}>{"Groups List"}</h2>
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