import formstyles from './form.module.css';

export default function Form({ fields, values, onSubmit, id }) {
    return (
        <div className={formstyles.form_content_container}>
            <form onSubmit={onSubmit}>
                <div className={formstyles.form_content_wrapper}>
                    {
                        fields.map((field) => {
                            return (
                                <div className={formstyles.form_field_wrapper}>
                                    <div className={formstyles.form_item_wrapper}>
                                        <label className={formstyles.form_label}>{field.title}</label>
                                        <div className={formstyles.form_input_wrapper}>
                                            <input name={field.name} value={values[field.name]} placeholder={field.title} className={formstyles.form_input} />
                                        </div>
                                        <small className={formstyles.form_sub}>{field.isReq ? "required" : ""}</small>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <input type="hidden" name="id" value={id} />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}