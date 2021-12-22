import navstyles from './nav.module.css'
import mega_menu_json from './nav_json'

export default function Nav() {
    return (
        <div className={navstyles.container}>
            <div className={navstyles.bar}>
                <NavLeft items={mega_menu_json}></NavLeft>
                <NavTop></NavTop>
            </div>
        </div>
    );
}
function NavLeft({ items }) {
    return (
        <div className={navstyles.button_wrapper}>
            <button className={navstyles.button}>Categories</button>
            <div className={navstyles.left_menu_wrapper_outer}>
                {
                    items.map((item) => {
                        return (
                            <div key={item.title} className={navstyles.left_menu_wrapper_inner}>
                                <div className={navstyles.left_menu_wrapper}>
                                    <span className={navstyles.left_menu_item}>{item.title}</span>
                                </div>
                                {
                                    item.type === "megamenu" ? <MegaMenu title={item.title} items={item.children}></MegaMenu> : <RegularMenu title={item.title} children={item.children}></RegularMenu>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
function RegularMenu({ children }) {
    return (
        <div className={navstyles.mega_menu_wrapper_4}>
            <div className={`${navstyles.mega_menu_wrapper_3} ${navstyles.mega_menu_wrapper_3_sm}`}>
                {
                    children.map((item) => {
                        return (
                            <div className={navstyles.regularmenu_item_wrapper_outer}>
                                <div className={navstyles.regularmenu_item_wrapper}>
                                    <span className={navstyles.regularmenu_item}>{item.title}</span>
                                </div>
                                {
                                    item.children && item.children.length > 0 ? <RegularMenu title={item.title} children={item.children}></RegularMenu> : <div></div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



function MegaMenu({ title, items }) {
    return (
        <div className={navstyles.mega_menu_wrapper_4}>
            <div className={`${navstyles.mega_menu_wrapper_3} ${navstyles.mega_menu_wrapper_3_lg}`}>
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
            </div>
        </div>
    )
}













function NavTop() {
    return (
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
    )
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