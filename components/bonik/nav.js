import navstyles from './nav.module.css'

export default function Nav() {
    return (
        <div className={navstyles.container}>
            <div className={navstyles.bar}>
                <div className={navstyles.button_wrapper}>
                    <button className={navstyles.button}>Categories</button>
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