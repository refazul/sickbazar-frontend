import pagestyles from './page.module.css';

const items = [
    { "title": "Dashboard", },
    { "title": "Products", },
    { "title": "Add New Product", },
    { "title": "Orders", },
    { "title": "Account Settings", },
]

const fields = [
    { "title": "Title", "id": "title"},
    { "title": "Description", "id": "description"},
]

export default function Page() {
    return (
        <div className={pagestyles.container}>
            <div className={pagestyles.wrapper}>
                <Left items={items}></Left>
                <Right></Right>
            </div>
        </div>
    )
}

function Left({ items }) {
    return (
        <div className={pagestyles.body_left_container}>
            <div className={pagestyles.body_left_wrapper}>
                {
                    items.map((item) => {
                        return (
                            <a className={pagestyles.body_left_item_wrapper}>
                                <div className={pagestyles.body_left_item_wrapper_inner}>
                                    <div className='icon'></div>
                                    <span className={pagestyles.body_left_item}>{item.title}</span>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}

function Right() {
    return (
        <div className={pagestyles.body_right_container}>
            <div className={pagestyles.body_right_head_container}>
                <div className={pagestyles.body_right_head_wrapper}>
                    <div classname={pagestyles.body_right_title_wrapper}>
                        <h2 className={pagestyles.body_right_title}>Edit Product</h2>
                    </div>
                    <button className={pagestyles.body_right_button}>Back to Product List</button>
                </div>
            </div>
            <div className={pagestyles.body_right_content_container}>
                <form>
                    <div className={pagestyles.body_right_content_wrapper}>
                        {
                            fields.map((field) => {
                                return (
                                    <div className={pagestyles.body_right_field_wrapper}>
                                        <div className={pagestyles.body_right_item_wrapper}>
                                            <label className={pagestyles.body_right_label}>{field.title}</label>
                                            <div className={pagestyles.body_right_input_wrapper}>
                                                <input name={field.id} placeholder={field.title} className={pagestyles.body_right_input} />
                                            </div>
                                            <small className={pagestyles.body_right_sub}>{field.isReq ? "required" : ""}</small>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}