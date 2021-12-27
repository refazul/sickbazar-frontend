import asidestyles from './aside.module.css';

export default function Aside({ items }) {
    return (
        <div className={asidestyles.aside_container}>
            <div className={asidestyles.aside_wrapper}>
                {
                    items.map((item) => {
                        return (
                            <a className={asidestyles.aside_item_wrapper}>
                                <div className={asidestyles.aside_item_wrapper_inner}>
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