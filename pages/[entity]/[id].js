import { readProduct } from '../../services/product';
import { readGroup } from '../../services/group';
import { readCategory } from '../../services/category';
import { Options, BreadCrumb, ImageGallery } from '../../components/bonik/elements';
import React, { useState } from 'react';
import { color_array, size_array } from '../../data';

export default function EntityDetail({ entity, object }) {
    function onAddToCart(colors, sizes) {
        console.log(colors, sizes);
    }
    return (
        <div className="bg-white">
            <div className="pt-6">
                <BreadCrumb></BreadCrumb>

                <ImageGallery></ImageGallery>

                <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                            {object.title}
                        </h1>
                    </div>

                    <Options options={{ color_array, size_array }} onClick={onAddToCart}></Options>

                    <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{object.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                                    <li className="text-gray-400"><span className="text-gray-600">Hand cut and sewn locally</span></li>

                                    <li className="text-gray-400"><span className="text-gray-600">Dyed with our proprietary colors</span></li>

                                    <li className="text-gray-400"><span className="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>

                                    <li className="text-gray-400"><span className="text-gray-600">Ultra-soft 100% cotton</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { entity, id } = context.query;
    const props = { entity }

    if (entity == 'products') {
        props.object = await readProduct(id);
    } else if (entity == 'groups') {
        props.object = await readGroup(id);
    } else if (entity == 'categories') {
        props.object = await readCategory(id);
    }
    return {
        props
    }
}