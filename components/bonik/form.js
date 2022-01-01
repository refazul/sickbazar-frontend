import formstyles from './form.module.css';
import { useForm } from 'react-hook-form';

export default function Form({ fields, defaultValues, onSubmitCallback }) {
    const formOptions = {}
    if (defaultValues && defaultValues.id) {
        formOptions.defaultValues = defaultValues
    }

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return defaultValues && defaultValues.id ? onSubmitCallback(defaultValues.id, data): onSubmitCallback(data);
    }
    return (
        <div className={formstyles.form_content_container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={formstyles.form_content_wrapper}>
                    {
                        fields.map((field) => {
                            return (
                                <div key={(Math.random() + 1).toString(36).substring(7)} className={formstyles.form_field_wrapper}>
                                    <div className={formstyles.form_item_wrapper}>
                                        <label className={formstyles.form_label}>{field.title}</label>
                                        <div className={formstyles.form_input_wrapper}>
                                            <input {...register(field.name)} placeholder={field.title} className={formstyles.form_input} />
                                        </div>
                                        {errors[field.name] && <small className={formstyles.form_sub}>{field.title} is Required</small>}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}