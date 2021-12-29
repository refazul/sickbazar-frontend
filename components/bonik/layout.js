import layoutstyles from './layout.module.css';
import Aside from './aside';

import React from 'react'
import { useRouter } from 'next/router';


const items = [
    { "title": "Dashboard", "link": "/dashboard" },
    { "title": "Products", "link": "/products" },
    { "title": "Add New Product", "link": "/products/new" },
    { "title": "Orders", "link": "/orders" },
    { "title": "Account Settings", "link": "/settings" },
]

export default function Layout({ children }) {
    const router = useRouter()
    return (
        <div className={layoutstyles.container}>
            <div className={layoutstyles.wrapper}>
                <div className={layoutstyles.body_left_container}>
                    <Aside items={items}></Aside>
                </div>
                <div className={layoutstyles.body_right_container}>
                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}