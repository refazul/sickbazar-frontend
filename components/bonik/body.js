import bodystyles from './body.module.css';

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

export default function Body() {
    return (
        <div className={bodystyles.container}>
            <div className={bodystyles.wrapper}>
                <Left items={items}></Left>
                <Right></Right>
            </div>
        </div>
    )
}

function Left({ items }) {
    return (
        <div className={bodystyles.body_left_container}>
            <div className={bodystyles.body_left_wrapper}>
                {
                    items.map((item) => {
                        return (
                            <a className={bodystyles.body_left_item_wrapper}>
                                <div className={bodystyles.body_left_item_wrapper_inner}>
                                    <div className='icon'></div>
                                    <span className={bodystyles.body_left_item}>{item.title}</span>
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
        <div className={bodystyles.body_right_container}>
            <div className={bodystyles.body_right_head_container}>
                <div className={bodystyles.body_right_head_wrapper}>
                    <div classname={bodystyles.body_right_title_wrapper}>
                        <h2 className={bodystyles.body_right_title}>Edit Product</h2>
                    </div>
                    <button className={bodystyles.body_right_button}>Back to Product List</button>
                </div>
            </div>
            <div className={bodystyles.body_right_content_container}>
                <form>
                    <div className={bodystyles.body_right_content_wrapper}>
                        {
                            fields.map((field) => {
                                return (
                                    <div className={bodystyles.body_right_field_wrapper}>
                                        <div className={bodystyles.body_right_item_wrapper}>
                                            <label className={bodystyles.body_right_label}>{field.title}</label>
                                            <div className={bodystyles.body_right_input_wrapper}>
                                                <input name={field.id} placeholder={field.title} className={bodystyles.body_right_input} />
                                            </div>
                                            <small className={bodystyles.body_right_sub}>{field.isReq ? "required" : ""}</small>
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