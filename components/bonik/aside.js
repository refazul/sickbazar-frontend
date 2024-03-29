import React from 'react'
import { useRouter } from 'next/router';
import { CheckIcon, BeakerIcon } from '@heroicons/react/solid';

import asidestyles from './aside.module.css';

const items = [
    { "title": "Products", "link": "/products" },
    { "title": "Add New Product", "link": "/products/new" },
    { "title": "Groups", "link": "/groups" },
    { "title": "Add New Group", "link": "/groups/new" },
    { "title": "Categories", "link": "/categories" },
    { "title": "Add New Category", "link": "/categories/new" },
    { "title": "Attributes", "link": "/attributes" },
    { "title": "Add New Attribute", "link": "/attributes/new" },
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
                            <div key={item.link} className={`${asidestyles.aside_item_wrapper_outer} ${active ? asidestyles.aside_item_wrapper_active : ''}`}>
                                <a className={`px-6 py-2 ${asidestyles.aside_item_wrapper}`} href={item.link} onClick={(e) => {e.preventDefault(); router.push(item.link)}}>
                                    <div className={asidestyles.aside_item_wrapper_inner}>
                                        <div className='icon pr-1'>
                                            <BeakerIcon className="h-5 w-5 text-green-500"/>
                                        </div>
                                        <span className={asidestyles.aside_item}>{item.title}</span>
                                    </div>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}