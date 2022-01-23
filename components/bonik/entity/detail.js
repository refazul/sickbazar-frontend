import { Image, Options } from "../elements";
import { color_array, size_array } from "../../../data";

export function EntityDetail({ entity, object }) {
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
                        <Options options={{ color_array, size_array }} ></Options>
                    </div> : <div></div>
                }
            </div>
        </div>
    )
}