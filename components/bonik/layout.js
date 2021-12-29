import layoutstyles from './layout.module.css';
import Nav from './nav';
import Aside from './aside';

export default function Layout({ children }) {
    return (
        <div>
            <Nav></Nav>
            <div className={layoutstyles.container}>
                <div className={layoutstyles.wrapper}>
                    <div className={layoutstyles.body_left_container}>
                        <Aside></Aside>
                    </div>
                    <div className={layoutstyles.body_right_container}>
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </div>
    )
}