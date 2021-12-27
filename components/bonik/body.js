import bodystyles from './body.module.css';
import Aside from './aside';
import Form from './form';

const items = [
    { "title": "Dashboard", },
    { "title": "Products", },
    { "title": "Add New Product", },
    { "title": "Orders", },
    { "title": "Account Settings", },
]

const fields = [
    { "title": "Title", "id": "title" },
    { "title": "Description", "id": "description" },
]

export default function Body() {
    return (
        <div className={bodystyles.container}>
            <div className={bodystyles.wrapper}>
                <div className={bodystyles.body_left_container}>
                    <Aside items={items}></Aside>
                </div>
                <div className={bodystyles.body_right_container}>
                    <Right></Right>
                </div>
            </div>
        </div>
    )
}



function Right() {
    return (
        <div>
            <div className={bodystyles.body_right_head_container}>
                <div className={bodystyles.body_right_head_wrapper}>
                    <div classname={bodystyles.body_right_title_wrapper}>
                        <h2 className={bodystyles.body_right_title}>Edit Product</h2>
                    </div>
                    <button className={bodystyles.body_right_button}>Back to Product List</button>
                </div>
            </div>
            <Form fields={fields}></Form>
        </div>
    )
}