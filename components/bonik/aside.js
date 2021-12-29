import React from 'react'
import {useRouter} from 'next/router';

import asidestyles from './aside.module.css';

export default function Aside({ items }) {
    const router = useRouter()
    return (
        <div className={asidestyles.aside_container}>
            <div className={asidestyles.aside_wrapper}>
                {
                    items.map((item) => {
                        const active = router.pathname === item.link;
                        console.log(router.pathname, item.link, active);
                        return (
                            <a className={`${asidestyles.aside_item_wrapper} ${active ? asidestyles.aside_item_wrapper_active : ''}`}>
                                <div className={asidestyles.aside_item_wrapper_inner} onClick={() => router.push(item.link)}>
                                    <div className='icon'></div>
                                    <span className={asidestyles.aside_item}>{item.title}</span>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}