import React, { useState, Fragment } from "react";
import formstyles from './form.module.css';
import globalstyles from './global.module.css';
import { useForm } from 'react-hook-form';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, XIcon } from '@heroicons/react/solid'

import { Menu, Transition } from '@headlessui/react'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Form({ defaultValues, children, onSubmitCallback, title, buttonText, buttonOnClick }) {
    const methods = useForm({ defaultValues });
    const { handleSubmit, formState } = methods;

    return (
        <div>
            <div className={globalstyles.formheader_head_container}>
                <div className={globalstyles.formheader_head_wrapper}>
                    <div className={globalstyles.formheader_title_wrapper}>
                        <h2 className={globalstyles.formheader_title}>{title}</h2>
                    </div>
                    <Button text={buttonText} onClick={buttonOnClick}></Button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmitCallback)}>
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
        <div className="w-1/2 p-3">
            <div className="relative w-full">
                <div className={formstyles.form_input_wrapper}>
                    <input {...register(name)} {...rest} className={formstyles.form_input} />
                </div>
                {errors[name] && <small className={formstyles.form_sub}>{title} is Required</small>}
            </div>
        </div>
    )
}

export function Select_({ register, options, name, title, setValue, ...rest }) {
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
export function Select__({ register, options = [], name, title, setValue, ...rest }) {
    const has_default_option = options.filter(o => o.selected).length > 0;
    const [option, setOption] = useState(has_default_option ? options.filter(o => o.selected)[0].title : "Pick a " + title);
    const count = options.length;
    const classMap = options.map((o, i) => {
        if (count == 1) { return " rounded " }
        if (count > 1) {
            if (i == 0) { return " rounded-t " }
            if (i < count - 1) { return "" }
            if (i == count - 1) { return " rounded-b " }
        }
    });
    return (
        <div className="w-1/2 p-3">
            <div className="relative w-full">
                <h2 className="inline-block pr-2">{title}</h2>
                <div className="dropdown inline-block relative">
                    <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                        <span className="mr-1">{option}</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                    </button>
                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1" {...register(name)} {...rest}>
                        {options.map((data, index) => (
                            <li key={data.value} value={data.value} onClick={() => { setOption(data.title); setValue(name, data.value) }}>
                                <div className={classMap[index] + "bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"}>{data.title}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export function Select({ register, options = [], name, title, setValue, ...rest }) {
    const has_default_option = options.filter(o => o.selected).length > 0;
    const [option, setOption] = useState(has_default_option ? options.filter(o => o.selected)[0].title : "Pick a " + title);
    return (
        <div className="w-1/2 p-3">
            <div className="relative w-full">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                            {option}
                            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1" {...register(name)} {...rest}>
                                <Menu.Item>
                                    <a onClick={(e) => { e.preventDefault(); }} className={'text-gray-700 block px-4 py-2 text-sm'}>
                                        {"Pick a " + title}
                                    </a>
                                </Menu.Item>
                                {options.map((data, index) => (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a onClick={(e) => { e.preventDefault(); setOption(data.title); setValue(name, data.value) }} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                                {data.title}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}
function cartesianProduct(arr) {
    return arr.reduce(function (a, b) {
        return a.map(function (x) {
            return b.map(function (y) {
                return x.concat([y]);
            })
        }).reduce(function (a, b) { return a.concat(b) }, [])
    }, [[]])
}
function Variants({ cross }) {
    function onChange(variant, change) {
        console.log(variant, change)
        // to be continued
    }
    return (
        <div>
            {
                cross.map(variant => <Variant variant={variant} onChange={onChange} />)
            }
        </div>
    )
}
function Variant({ variant, onChange }) {
    // reduce variant
    return (
        <div className="w-1/2 p-3">
            <div className="relative w-full">
                <span>T</span>
                <input type="text" onChange={(e) => { onChange(variant, { price: e.target.value }) }} />
                <input type="text" onChange={(e) => { onChange(variant, { stock: e.target.value }) }} />
            </div>
        </div>
    )
}

export function CrossAttribute({ attributes, title }) {
    const [attrs, setAttrs] = useState(attributes.filter(c => c.selected))
    const [cross, setCross] = useState([])
    function onAttrUpdate(attributes) {
        const selected_attrs = attributes.filter(c => c.selected);
        setAttrs(selected_attrs);
    }
    function onVariantUpdate(variants) {
        var selected_options = [];
        attrs.forEach(attr => {
            selected_options.push(attr.options.filter(o => o.selected))//map;
        });
        setCross(cartesianProduct(selected_options));
    }
    return (
        <div className="w-full">
            <Dropdown options={attributes} title={title} onChoiceUpdate={onAttrUpdate} />
            {
                attrs.map(attr => <Dropdown key={attr.value} options={attr.options} title={attr.title} onChoiceUpdate={onVariantUpdate} />)
            }
            <Variants cross={cross} />
        </div>
    )
}

export function Dropdown({ register, options, name, title, setValue, onChoiceUpdate, ...rest }) {
    function isOpen() { return visible }
    function toggle() { setVisible(!visible) }

    const [choices, setChoices] = useState(options);
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState('');
    return (
        <div className="w-1/2 p-3">
            <div className="relative w-full">
                {
                    register ? <input {...register(name)} type="hidden" /> : <div></div>
                }
                <div className="flex flex-auto flex-wrap">
                    <div className="p-2">{title}</div>
                    <div className="flex flex-auto flex-wrap">
                        {
                            choices.filter(o => o.selected).map((choice, index) => {
                                return (
                                    <SelectedItem key={index} choice={choice} index={index} onCrossClickCallback={remove}></SelectedItem>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="w-full" onClick={toggle}>
                    <div className="flex flex-auto flex-wrap">
                        <div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
                            <input className="p-1" type="text" placeholder={title} value={filter} onChange={handleFilterChange} onClick={toggle} />
                            <DropdownButton collapsed={isOpen()} toggleCallback={toggle}></DropdownButton>
                        </div>
                        <div className="w-full px-4">
                            <div className={(isOpen() ? "" : " hidden ") + "absolute shadow top-100 bg-white z-40 w-full left-0 rounded max-h-select"}>
                                <div className="flex flex-col w-full overflow-y-auto h-64">
                                    {
                                        choices.filter(o => filter == '' || o.title.toLowerCase().indexOf(filter) > -1).map((choice, index) => {
                                            return (
                                                <DropdownItem key={index} choice={choice} index={index} onClickCallback={select}></DropdownItem>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
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
        if (setValue) {
            setValue(name, new_choices.filter(o => o.selected).map(o => o.value));
        }
        setChoices(new_choices);
        if (onChoiceUpdate) {
            onChoiceUpdate(new_choices);
        }
    }
    function remove(choice) {
        const new_choices = choices.map((o) => {
            if (o.value == choice.value) {
                o.selected = false;
            }
            return o;
        })
        if (setValue) {
            setValue(name, new_choices.filter(o => o.selected).map(o => o.value));
        }
        setChoices(new_choices);
        if (onChoiceUpdate) {
            onChoiceUpdate(new_choices);
        }
    }
}

function SelectedItem({ choice, index, onCrossClickCallback }) {
    return (
        <div className="flex justify-center items-center font-medium bg-white rounded bg-gray-100 border mr-2">
            <div className="text-xs font-normal leading-none max-w-full flex-initial p-2">
                {choice.title}
            </div>
            <div className="flex flex-auto flex-row-reverse cursor-pointer pr-1">
                <div className="w-4 h-4" onClick={(e) => { e.stopPropagation(); onCrossClickCallback(choice) }}><XIcon /></div>
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
                    <div className={choice.selected ? 'w-4 h-4' : ' hidden '}>
                        <CheckIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
function DropdownButton({ collapsed, toggleCallback }) {
    return (
        <div className="border-l flex items-center border-gray-200 pl-1">
            <div onClick={() => { toggleCallback() }} className={(collapsed ? " hidden " : "") + "cursor-pointer w-4 h-4"} >
                <ChevronDownIcon />
            </div>
            <div onClick={() => { toggleCallback() }} className={(collapsed ? "" : " hidden ") + "cursor-pointer w-4 h-4"}>
                <ChevronUpIcon />
            </div>
        </div>
    )
}
export function Button({ text, onClick }) {
    return (
        <div className={`text-center`}>
            <button onClick={onClick} className={`${formstyles.button}  ${formstyles.red}`} type="button">{text}</button>
        </div>
    )
}

export function Submit({ text }) {
    return (
        <div className={`w-full text-center`}>
            <button className={`${formstyles.button}  ${formstyles.red}`} type="submit">{text}</button>
        </div>
    )
}

export function Table({ columns, children }) {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {
                                        columns.map((column) => {
                                            return (
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {column.title}
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function CellImageMultiLinel({ image, lines }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={image} alt="" />
                </div>
                <div className="ml-4">
                    {
                        lines.map((line, index) => {
                            if (index == 0) {
                                return <div className="text-sm font-medium text-gray-900">{line}</div>
                            }
                            return <div className="text-sm text-gray-500">{line}</div>
                        })
                    }
                </div>
            </div>
        </td>
    )
}
export function CellMultiLine({ lines }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap">
            {
                lines.map((line, index) => {
                    if (index == 0) {
                        return <div className="text-sm text-gray-900">{line}</div>
                    }
                    return <div className="text-sm text-gray-500">{line}</div>
                })
            }
        </td>
    )
}
export function CellColor({ text, textcolor, bgcolor }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${bgcolor} text-${textcolor}}`}>
                {text}
            </span>
        </td>
    )
}
export function Cell({ initValue, editable, onChangeCallback }) {
    const [value, setValue] = useState(initValue);
    function onChange(e) {
        const newValue = e.target.value;
        setValue(newValue);
        onChangeCallback(newValue);
    }
    return (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {
                editable ? <input type="text" value={value} onChange={onChange} /> : <div>{initValue}</div>
            }
        </td>
    )
}
export function CellLink({ text, link }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a href={link} className="text-indigo-600 hover:text-indigo-900">
                {text}
            </a>
        </td>
    )
}
export function Row({ object, saveCallback }) {
    function onChangeCallback(key, newValue) {
        object[key] = newValue;
        saveCallback(object);
    }
    return (
        <tr>
            {
                Object.keys(object).map((k) => {
                    return <Cell editable={true} initValue={object[k]} onChangeCallback={(newValue) => { onChangeCallback(k, newValue) }}></Cell>
                })
            }
        </tr>
    )
}