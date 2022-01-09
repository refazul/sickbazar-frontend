import React, { useState } from "react";
import formstyles from './form.module.css';
import globalstyles from './global.module.css';
import { useForm } from 'react-hook-form';

export function Form({ defaultValues, children, onSubmitCallback, title, button }) {
    const methods = useForm({ defaultValues });
    const { handleSubmit, formState } = methods;

    async function onSubmit(data) {
        return defaultValues && defaultValues.id ? onSubmitCallback(defaultValues.id, data) : onSubmitCallback(data);
    }

    return (
        <div>
            <div className={globalstyles.formheader_head_container}>
                <div className={globalstyles.formheader_head_wrapper}>
                    <div className={globalstyles.formheader_title_wrapper}>
                        <h2 className={globalstyles.formheader_title}>{title}</h2>
                    </div>
                    <button className={`${globalstyles.formheader_button} red`}>{button}</button>
                </div>
            </div>
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
                                        key: child.props.name,
                                        setValue: methods.setValue
                                    }
                                })
                                : child;
                        })
                    }
                </div>
            </form>
        </div>
    );
}

export function Input({ register, name, title, errors, setValue, ...rest }) {
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

export function Select({ register, options, name, setValue, ...rest }) {
    return (
        <select {...register(name)} {...rest}>
            {options.map(data => (
                <option key={data.value} value={data.value}>
                    {data.title}
                </option>
            ))}
        </select>
    );
}

export function Dropdown({ register, name, options, setValue, ...rest }) {
    function isOpen() { return visible }
    function toggle() { setVisible(!visible) }

    const [choices, setChoices] = useState(options);
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState('');
    return (
        <div>
            <div className="w-full flex flex-col items-center h-64 mx-auto">
                <input {...register(name)} type="hidden" />
                <div className="inline-block relative">
                    <div className="flex flex-col items-center relative">
                        <div className="w-full">
                            <div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
                                <div className="flex flex-auto flex-wrap" onClick={toggle}>
                                    {
                                        choices.filter(o => o.selected).map((choice, index) => {
                                            return (
                                                <SelectedItem key={index} choice={choice} index={index} onCrossClickCallback={remove}></SelectedItem>
                                            )
                                        })
                                    }
                                </div>
                                <input type="text" value={filter} onChange={handleFilterChange} onClick={toggle} />
                                <DropdownButton collapsed={isOpen()} toggleCallback={toggle}></DropdownButton>
                            </div>
                        </div>
                        <div className="w-full px-4">
                            <div className={(isOpen() ? "" : " hidden ") + "absolute shadow top-100 bg-white z-40 w-full left-0 rounded max-h-select"}>
                                <div className="flex flex-col w-full overflow-y-auto h-64">
                                    {
                                        choices.filter(o => {
                                            if (filter == '') {
                                                return true;
                                            }
                                            if (o.title.toLowerCase().indexOf(filter) > -1) {
                                                return true;
                                            }
                                            return false;
                                        }).map((choice, index) => {
                                            return (
                                                <DropdownItem key={index} choice={choice} index={index} onClickCallback={select}></DropdownItem>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
    function handleFilterChange(e) {
        const newFilter = e.target.value;
        console.log(newFilter);
        setFilter(newFilter);
    }
    function select(choice) {
        const new_choices = choices.map((o) => {
            if (o.value == choice.value) {
                o.selected = !o.selected;
            }
            return o;
        })
        setValue("groupID", new_choices.filter(o => o.selected).map(o => o.value).join(','));
        setChoices(new_choices);
    }
    function remove(choice) {
        const new_choices = choices.map((o) => {
            if (o.value == choice.value) {
                o.selected = false;
            }
            return o;
        })
        setValue("groupID", new_choices.filter(o => o.selected).map(o => o.value).join(','));
        setChoices(new_choices);
    }
}

function SelectedItem({ choice, index, onCrossClickCallback }) {
    return (
        <div className="flex justify-center items-center m-1 font-medium py-1 px-1 bg-white rounded bg-gray-100 border">
            <div className="text-xs font-normal leading-none max-w-full flex-initial">
                {choice.title}
            </div>
            <div className="flex flex-auto flex-row-reverse">
                <div onClick={(e) => { e.stopPropagation(); onCrossClickCallback(choice) }}>X</div>
            </div>
        </div>
    )
}
function DropdownItem({ choice, index, onClickCallback }) {
    return (
        <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-gray-100" onClick={() => { onClickCallback(choice) }} >
            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                <div className="w-full items-center flex justify-between">
                    <div className="mx-2 leading-6">{choice.title}</div>
                    <div className={choice.selected ? '' : ' hidden '}>
                        Tick
                    </div>
                </div>
            </div>
        </div>
    )
}
function DropdownButton({ collapsed, toggleCallback }) {
    return (
        <div className="text-gray-300 border-l flex items-center border-gray-200 ">
            <button type="button" onClick={() => { toggleCallback() }} className={(collapsed ? " hidden " : "") + "cursor-pointer text-gray-600 outline-none focus:outline-none"} >
                D
            </button>
            <button type="button" onClick={() => { toggleCallback() }} className={(collapsed ? "" : " hidden ") + "cursor-pointer text-gray-600 outline-none focus:outline-none"}>
                U
            </button>
        </div>
    )
}