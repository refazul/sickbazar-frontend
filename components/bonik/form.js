import React from "react";
import formstyles from './form.module.css';
import { useForm } from 'react-hook-form';

export function Form({ defaultValues, children, onSubmitCallback }) {
    const methods = useForm({ defaultValues });
    const { handleSubmit, formState } = methods;

    async function onSubmit(data) {
        return defaultValues && defaultValues.id ? onSubmitCallback(defaultValues.id, data): onSubmitCallback(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={formstyles.form_content_wrapper}>
                {
                    React.Children.map(children, child => {
                        return child.props.name
                            ? React.createElement(child.type, {
                                ...{
                                    ...child.props,
                                    register: methods.register,
                                    errors: formState.errors,
                                    key: child.props.name
                                }
                            })
                            : child;
                    })
                }
            </div>
        </form>
    );
}

export function Input({ register, name, title, errors, ...rest }) {
    return (
        <div className={formstyles.form_field_wrapper}>
            <div className={formstyles.form_item_wrapper}>
                <label className={formstyles.form_label}>{title}</label>
                <div className={formstyles.form_input_wrapper}>
                    <input {...register(name)} {...rest} className={formstyles.form_input} />
                </div>
                {errors[name] && <small className={formstyles.form_sub}>{title} is Required</small>}
            </div>
        </div>
    )
}

export function Select({ register, options, name, ...rest }) {
    return (
        <select {...register(name)} {...rest}>
            {options.map(value => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
    );
}