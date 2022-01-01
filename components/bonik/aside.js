import React from 'react'
import {useRouter} from 'next/router';

import asidestyles from './aside.module.css';

const items = [
    { "title": "Dashboard", "link": "/dashboard" },
    { "title": "Products", "link": "/products" },
    { "title": "Add New Product", "link": "/products/new" },
    { "title": "Orders", "link": "/orders" },
    { "title": "Account Settings", "link": "/settings" },
]

export default function Aside() {
    const router = useRouter()
    return (
        <div className={asidestyles.aside_container}>
            <div className={asidestyles.aside_wrapper}>
                {
                    items.map((item) => {
                        const active = router.pathname === item.link;
                        return (
                            <a key={item.link} className={`${asidestyles.aside_item_wrapper} ${active ? asidestyles.aside_item_wrapper_active : ''}`}>
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