import navstyles from './nav.module.css'
import mega_menu_json from './nav_json'
import React, { useState, useEffect } from 'react';

export default function Nav() {
    return (
        <div className={navstyles.container}>
            <div className={navstyles.bar}>
                <NavLeft items={mega_menu_json}></NavLeft>
                <NavTop items={mega_menu_json}></NavTop>
            </div>
        </div>
    );
}
function NavLeft({ items }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });
    return (
        <div className={navstyles.button_wrapper}>
            <button className={navstyles.button} onClick={() => setCount(count + 1)}>Categories</button>
            <div className={`${navstyles.nav_left_container} ` + (count % 2 == 0 ? ' hidden ' : '')}>
                {
                    items.map((item) => {
                        return (
                            <div key={(Math.random() + 1).toString(36).substring(7)} className={navstyles.nav_left_wrapper_inner}>
                                <div className={navstyles.nav_left_item_wrapper}>
                                    <span className={navstyles.nav_left_item}>{item.title}</span>
                                </div>
                                {
                                    item.type === "NavLeftMega" ? <NavLeftMega {...item}></NavLeftMega> : <NavLeftRegular {...item}></NavLeftRegular>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}




function NavLeftMega({ children }) {
    return (
        <div className={navstyles.nav_left_wrapper_outermost}>
            <div className={`${navstyles.nav_left_wrapper_outer} ${navstyles.nav_left_mega_container_large}`}>
                <div className={navstyles.nav_left_mega_container}>
                    <div className={navstyles.nav_left_mega_wrapper_outermost}>
                        <div className={navstyles.nav_left_mega_wrapper_outer}>
                            {
                                children.map((item) => {
                                    return (
                                        <div key={(Math.random() + 1).toString(36).substring(7)} className={navstyles.nav_left_mega_wrapper_inner}>
                                            <a className={navstyles.nav_left_mega_item}>{item.title}</a>
                                            {
                                                item.children.map((children) => {
                                                    return (
                                                        <a key={(Math.random() + 1).toString(36).substring(7)} className={`${navstyles.nav_left_mega_item} ${navstyles.nav_left_mega_item_child}`}>{children.title}</a>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}













function NavTop({ items }) {
    return (
        <div className={navstyles.nav_top_container}>
            {
                items.map((item) => {
                    return (
                        <div key={(Math.random() + 1).toString(36).substring(7)} className={navstyles.nav_top_wrapper_inner}>
                            <span className={navstyles.nav_top_item}>{item.title}</span>
                            {
                                item.children && item.children.length > 0 ? <NavTopRegular {...item} root={true}></NavTopRegular> : <div></div>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
function NavLeftRegular({ children }) {
    return (
        <div className={navstyles.nav_left_wrapper_outermost}>
            <div className={`${navstyles.nav_left_wrapper_outer} ${navstyles.nav_left_regular_wrapper_outer}`}>
                {
                    children.map((item) => {
                        return (
                            <div key={(Math.random() + 1).toString(36).substring(7)} className={navstyles.nav_left_wrapper_inner}>
                                <div className={navstyles.nav_left_item_wrapper}>
                                    <span className={navstyles.nav_left_item}>{item.title}</span>
                                </div>
                                {
                                    item.children && item.children.length > 0 ? item.type == "NavLeftMega" ? <NavLeftMega {...item}></NavLeftMega> : <NavLeftRegular {...item}></NavLeftRegular> : <div></div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
function NavTopRegular({ children, root }) {
    var nav_top_wrapper_root = root ? navstyles.nav_top_wrapper_root : '';
    return (
        <div className={`${navstyles.nav_top_wrapper_outermost} ${nav_top_wrapper_root}`}>
            <div className={navstyles.nav_top_wrapper_outer}>
                {
                    children.map((item) => {
                        return (
                            <div key={(Math.random() + 1).toString(36).substring(7)} className={navstyles.nav_top_wrapper_inner}>
                                <div className={navstyles.nav_top_item_wrapper}>
                                    <span className={navstyles.nav_top_item}>{item.title}</span>
                                </div>
                                {
                                    item.children && item.children.length > 0 ? <NavTopRegular {...item}></NavTopRegular> : <div></div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}