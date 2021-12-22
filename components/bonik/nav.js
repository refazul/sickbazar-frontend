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
            <div className={navstyles.nav_left_container}>
                {
                    items.map((item) => {
                        return (
                            <div key={item.title} className={navstyles.nav_left_wrapper_inner}>
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
function NavLeftRegular({ children }) {
    return (
        <div className={navstyles.nav_left_wrapper_outermost}>
            <div className={`${navstyles.nav_left_wrapper_outer} ${navstyles.mega_menu_wrapper_3_sm}`}>
                {
                    children.map((item) => {
                        return (
                            <div className={navstyles.nav_left_wrapper_inner}>
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



function NavLeftMega({ children }) {
    return (
        <div className={navstyles.nav_left_wrapper_outermost}>
            <div className={`${navstyles.nav_left_wrapper_outer} ${navstyles.mega_menu_wrapper_3_lg}`}>
                <div className={navstyles.nav_left_mega_container}>
                    <div className={navstyles.nav_left_mega_wrapper_outermost}>
                        <div className={navstyles.nav_left_mega_wrapper_outer}>
                            {
                                children.map((item) => {
                                    return (
                                        <div className={navstyles.nav_left_mega_wrapper_inner}>
                                            <a className={navstyles.nav_left_mega_item}>{item.title}</a>
                                            {
                                                item.children.map((children) => {
                                                    return (
                                                        <a className={`${navstyles.nav_left_mega_item} ${navstyles.nav_left_mega_item_child}`}>{children.title}</a>
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