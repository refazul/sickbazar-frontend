import { PencilIcon, XIcon } from '@heroicons/react/solid';

export function Card({ entity, object, onClick, onEditClick, onDeleteClick }) {
    return (
        <div className="group relative" >
            <XIcon className="absolute right-0 z-20 hidden group-hover:block cursor-pointer w-5 h-5 hover:text-red-500" onClick={() => { onDeleteClick(entity, object) }} />
            <PencilIcon className="absolute right-5 z-20 hidden group-hover:block cursor-pointer w-5 h-5 hover:text-yellow-500" onClick={() => { onEditClick(entity, object) }} />
            <a onClick={(e) => { e.preventDefault(); onClick(entity, object) }} href={'/' + entity + '/' + object.id}>
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src={object.image} alt={object.title} className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            {object.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{object.description}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">$35</p>
                </div>
            </a>
        </div>
    )
}