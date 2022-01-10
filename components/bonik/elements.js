import React, { useState } from 'react';
import { CheckIcon, PencilIcon } from '@heroicons/react/solid'


export function Options({ options, onClick }) {
    const { color_array, size_array } = options;
    const [colors, setColors] = useState(color_array);
    function onColorPick(color) {
        console.log(color);
        const new_color_array = colors.map((c) => {
            c.active = c.value == color.value ? true : false;
            return c;
        });
        setColors(new_color_array)
    }

    const [sizes, setSizes] = useState(size_array);
    function onSizePick(size) {
        console.log(size);
        const new_size_array = sizes.map((s) => {
            s.active = s.value == size.value ? true : false;
            return s;
        });
        setSizes(new_size_array)
    }
    return (
        <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">$192</p>

            <Reviews></Reviews>

            {/** form */}
            <div className="mt-12">
                <Colors colors={colors} onClick={onColorPick}></Colors>
                <Sizes sizes={sizes} onClick={onSizePick}></Sizes>

                <button type="submit" className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => { onClick(colors, sizes) }}>Add to bag</button>
            </div>
            {/** form */}
        </div>
    )
}
function Color({ color, onClick }) {
    return (

        <label className={"-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400" + (color.active ? " ring ring-offset-1 " : " ring-2 ")}>
            <input type="radio" name="color-choice" value={color.value} className="sr-only" aria-labelledby="color-choice-0-label" onClick={() => onClick(color)} />
            <p id="color-choice-0-label" className="sr-only">
                {color.title}
            </p>
            <span aria-hidden="true" className={`h-8 w-8 bg-${color.value} border border-black border-opacity-10 rounded-full`}></span>
        </label>
    )
}
function Colors({ colors = [], onClick }) {
    return (
        <div>
            <h3 className="text-sm text-gray-900 font-medium">Color</h3>

            <fieldset className="mt-4">
                <legend className="sr-only">
                    Choose a color
                </legend>
                <div className="flex items-center space-x-3">
                    {
                        colors.map((color) => {
                            return <Color key={color.value} color={color} onClick={onClick}></Color>
                        })
                    }
                </div>
            </fieldset>
        </div>
    )
}
function Size({ size, onClick }) {
    return (

        <label className={"group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer" + (size.active ? " ring-2 ring-indigo-500 " : "")}>
            <input type="radio" name="size-choice" value={size.value} className="sr-only" aria-labelledby="size-choice-1-label" onClick={() => { onClick(size) }} />
            <p id="size-choice-1-label">
                {size.title}
            </p>
            <div className="absolute -inset-px rounded-md pointer-events-none" aria-hidden="true"></div>
        </label>
    )
}
function Sizes({ sizes, onClick }) {
    return (
        <div className="mt-10">
            <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
            </div>

            <fieldset className="mt-4">
                <legend className="sr-only">
                    Choose a size
                </legend>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {
                        sizes.map((size) => {
                            return <Size key={size.value} size={size} onClick={onClick}></Size>
                        })
                    }
                </div>
            </fieldset>
        </div>
    )
}
function Reviews() {
    return (
        <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
                <div className="flex items-center">
                    <HeroIcon></HeroIcon>
                    <HeroIcon></HeroIcon>
                    <HeroIcon></HeroIcon>
                    <HeroIcon></HeroIcon>
                    <HeroIcon></HeroIcon>
                </div>
                <p className="sr-only">4 out of 5 stars</p>
                <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
            </div>
            <div className="p-10">

                <div className="dropdown inline-block relative">
                    <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                        <span className="mr-1">Dropdown</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                    </button>
                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                        <li className=""><a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">One</a></li>
                        <li className=""><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Two</a></li>
                        <li className=""><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Three is the magic number</a></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}
function HeroIcon() {
    return (
        <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    )
    {/*
        < !--
        Heroicon name: solid / star

        Active: "text-gray-900", Default: "text-gray-200"
        -->
    */}
}

export function BreadCrumb() {
    return (
        <nav aria-label="BreadCrumb">
            <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                <li>
                    <div className="flex items-center">
                        <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                            Men
                        </a>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                </li>

                <li>
                    <div className="flex items-center">
                        <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                            Clothing
                        </a>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                </li>

                <li className="text-sm">
                    <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                        Basic Tee 6-Pack
                    </a>
                </li>
            </ol>
        </nav>
    )
}
export function ImageGallery() {
    return (
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" alt="Two each of gray, white, and black shirts laying flat." className="w-full h-full object-center object-cover" />
            </div>
            <div className="lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                    <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg" alt="Model wearing plain black basic tee." className="w-full h-full object-center object-cover" />
                </div>
                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                    <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg" alt="Model wearing plain gray basic tee." className="w-full h-full object-center object-cover" />
                </div>
            </div>
            <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg" alt="Model wearing plain white basic tee." className="w-full h-full object-center object-cover" />
            </div>
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
    const [editable, setEditable] = useState(false);
    function onChangeCallback(key, newValue) {
        object[key] = newValue;
    }
    return (
        <tr>
            {
                Object.keys(object).map((k) => {
                    return <Cell editable={editable} initValue={object[k]} onChangeCallback={(newValue) => { onChangeCallback(k, newValue) }}></Cell>
                })
            }
            <div className={editable ? 'hidden' : ''} onClick={() => { setEditable(true) }}>
                <PencilIcon></PencilIcon>
            </div>
            <div className={editable ? '' : 'hidden'} onClick={() => { setEditable(false); saveCallback(object); }}>
                <CheckIcon></CheckIcon>
            </div>
        </tr>
    )
}