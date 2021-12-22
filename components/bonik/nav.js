import navstyles from './nav.module.css'

const mega_menu_json = [
    {
        "title": "Fashion",
        "type": "megamenu_large",
        "children": [
            {
                "title": "Man Clothes",
                "children": [
                    { "title": "Shirt" },
                    { "title": "T-Shirt" },
                    { "title": "Pant" },
                    { "title": "Underwear" },
                ]
            },
            {
                "title": "Accessories",
                "children": [
                    { "title": "Belt" },
                    { "title": "Hat" },
                    { "title": "Watches" },
                    { "title": "Sunglasses" },
                ]
            },
            {
                "title": "Shoes",
                "children": [
                    { "title": "Sneakers" },
                    { "title": "Sandals" },
                    { "title": "Formal" },
                    { "title": "Casual" },
                ]
            },
            {
                "title": "Bags",
                "children": [
                    { "title": "Backpack" },
                    { "title": "Crossbody Bags" },
                    { "title": "Side Bags" },
                    { "title": "Slides" },
                ]
            },
            {
                "title": "Woman Clothes",
                "children": [
                    { "title": "Shirt" },
                    { "title": "T-Shirt" },
                    { "title": "Pant" },
                    { "title": "Underwear" },
                ]
            },
            {
                "title": "Accessories",
                "children": [
                    { "title": "Belt" },
                    { "title": "Hat" },
                    { "title": "Watches" },
                    { "title": "Sunglasses" },
                ]
            },
            {
                "title": "Shoes",
                "children": [
                    { "title": "Sneakers" },
                    { "title": "Sandals" },
                    { "title": "Formal" },
                    { "title": "Casual" },
                ]
            },
            {
                "title": "Bags",
                "children": [
                    { "title": "Backpack" },
                    { "title": "Crossbody Bags" },
                    { "title": "Side Bags" },
                    { "title": "Slides" },
                ]
            },
        ],
    },
    {
        "title": "Bikes",
        "children": [
            {
                "title": "Man",
                "children": [
                    { "title": "Shirt" },
                    { "title": "T-Shirt" },
                    { "title": "Pant" },
                    { "title": "Underwear" },
                ]
            },
            {
                "title": "Woman",
            },
            {
                "title": "Baby Boy",
            },
            {
                "title": "Baby Girl",
            }
        ]
    }
]

export default function Nav() {
    return (
        <div className={navstyles.container}>
            <div className={navstyles.bar}>
                <div className={navstyles.button_wrapper}>
                    <button className={navstyles.button}>Categories</button>
                    <div className={navstyles.left_menu_wrapper_outer}>
                        {
                            mega_menu_json.map((mm_item) => {
                                return (
                                    <div key={mm_item.title} className={navstyles.left_menu_wrapper_inner}>
                                        <div className={navstyles.left_menu_wrapper}>
                                            <span className={navstyles.left_menu_item}>{mm_item.title}</span>
                                        </div>
                                        <MegaMenu items={mm_item.children} type={mm_item.type}></MegaMenu>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={navstyles.right_menu_wrapper}>
                    <div className={navstyles.nav_item_wrapper}>
                        <span className={navstyles.nav_item}>Home</span>
                        <SubNav></SubNav>
                    </div>
                    <div className={navstyles.nav_item_wrapper}>
                        <span className={navstyles.nav_item}>Home2</span>
                        <SubNav></SubNav>
                    </div>
                    <div className={navstyles.nav_item_wrapper}>
                        <span className={navstyles.nav_item}>Home3</span>
                        <SubNav></SubNav>
                    </div>
                    <div className={navstyles.nav_item_wrapper}>
                        <span className={navstyles.nav_item}>Home4</span>
                        <SubNav></SubNav>
                    </div>
                    <div className={navstyles.nav_item_wrapper}>
                        <span className={navstyles.nav_item}>Home5</span>
                        <SubNav></SubNav>
                    </div>
                    <div className={navstyles.nav_item_wrapper}>
                        <span className={navstyles.nav_item}>Home6</span>
                        <SubNav></SubNav>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SubNav() {
    return (
        <div className={navstyles.subnav_wrapper_outer}>
            <div className={navstyles.subnav_wrapper_inner}>
                <a className={navstyles.subnav_item_wrapper_outer} href="/">
                    <div className={navstyles.subnav_item_wrapper_inner}>
                        <span font-size="14px" className={navstyles.subnav_item}>Sub Menu</span>
                    </div>
                </a>
                <a className={navstyles.subnav_item_wrapper_outer} href="/">
                    <div className={navstyles.subnav_item_wrapper_inner}>
                        <span font-size="14px" className={navstyles.subnav_item}>Sub Menu 2</span>
                    </div>
                </a>
                <a className={navstyles.subnav_item_wrapper_outer} href="/">
                    <div className={navstyles.subnav_item_wrapper_inner}>
                        <span font-size="14px" className={navstyles.subnav_item}>Sub Menu 3</span>
                    </div>
                </a>
                <a className={navstyles.subnav_item_wrapper_outer} href="/">
                    <div className={navstyles.subnav_item_wrapper_inner}>
                        <span font-size="14px" className={navstyles.subnav_item}>Sub Menu 4</span>
                    </div>
                </a>
            </div>
        </div>
    )
}

function MegaMenu({ items, type }) {
    var menu_class = navstyles.mega_menu_wrapper_3_sm;
    if (type === "megamenu_large") {
        menu_class = navstyles.mega_menu_wrapper_3_lg
    } else if (type === "megamenu_small") {
        menu_class = navstyles.mega_menu_wrapper_3_md
    }
    return (
        <div className={navstyles.mega_menu_wrapper_4}>
            <div className={`${navstyles.mega_menu_wrapper_3} ${menu_class}`}>
                {
                    type === "megamenu_large" ? <MegaMenuInner items={items}></MegaMenuInner> : <RegularMenu items={items}></RegularMenu>
                }
            </div>
        </div>
    )
}

function MegaMenuInner({ items }) {
    return (
        <div className={navstyles.mega_menu_wrapper_2}>
            <div className={navstyles.mega_menu_wrapper_1}>
                <div className={navstyles.mega_menu_wrapper}>
                    {
                        items.map((item) => {
                            return (
                                <div className={navstyles.mega_menu}>
                                    <a className={navstyles.mega_menu_item}>{item.title}</a>
                                    {
                                        item.children.map((children) => {
                                            return (
                                                <a className={`${navstyles.mega_menu_item} ${navstyles.mega_menu_item_child}`}>{children.title}</a>
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
    )
}

function RegularMenu({ items }) {
    return (
        <div>
            {
                items.map((item) => {
                    return (
                        <div className={navstyles.regularmenu_item_wrapper_outer}>
                            <div className={navstyles.regularmenu_item_wrapper}>
                                <span className={navstyles.regularmenu_item}>{item.title}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}