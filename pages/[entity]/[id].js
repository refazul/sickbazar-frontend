import { readEntity } from '../../services/entity';
import { Options, Image } from '../../components/bonik/elements';
import React, { useState } from 'react';
import { color_array, size_array } from '../../data';

export default function EntityDetail({ entity, object }) {
    function onAddToCart(colors, sizes) {
        console.log(colors, sizes);
    }
    return (
        <div className="bg-white">
            <div className="mx-auto w-1/2">
                <Image image={object.image} />
            </div>
            <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8">
                <div className="lg:pr-8 pb-4">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                        {object.title}
                    </h1>
                </div>
                {
                    entity == 'products' ? <div>
                        <div className="py-6 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <div>
                                <h3 className="sr-only">Description</h3>
                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{object.description}</p>
                                </div>
                            </div>
                        </div>
                        <Options options={{ color_array, size_array }} onClick={onAddToCart}></Options>
                    </div> : <div></div>
                }
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { entity, id } = context.query;
    const props = { entity }

    const param = {};
    if (entity == 'products') {
        param.extra_fields = 'groupID, categoryIDs';
    } else if (entity == 'attributes') {
        param.extra_fields = 'name, type, options{title, value, color, image}';
    }
    props.object = await readEntity(entity, id, param);

    return {
        props
    }
}

/*
<div className="">
    {
        entity == 'products' ? <div>
            <BreadCrumb></BreadCrumb>
            <ImageGallery></ImageGallery>
        </div> : <div></div>
    }


    <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8">
        <div className="lg:pr-8 pb-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {object.title}
            </h1>
        </div>

        {
            entity == 'products' ? <div>
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
            </div> : <div></div>
        }
        {
            entity == 'attributes' ? <div>
                <Table columns={[{ title: "Title" }, { title: "Value" }, { title: "Color" }, { title: "Image" }, { title: "" }]}>
                    {
                        object.options.map((option) => {
                            return (
                                <Row object={option} saveCallback={(object) => { console.log(option) }}></Row>
                            )
                        })
                    }
                </Table>
            </div> : <div></div>
        }

    </div>
</div>
*/