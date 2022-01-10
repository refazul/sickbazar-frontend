import { useRouter } from 'next/router';
import { readEntities, removeEntity } from '../../services/entity';
import { singularize, capitalize } from '../../services/helper';
import globalstyles from '../../components/bonik/global.module.css';

export default function EntityList({ entity, objects }) {
    const router = useRouter();
    const onDeleteClick = async (entity, object) => {
        removeEntity(entity, object.id)
    }
    if (!objects) return <div></div>
    return (
        <div>
            <div className={globalstyles.formheader_head_container}>
                <div className={globalstyles.formheader_head_wrapper}>
                    <div className={globalstyles.formheader_title_wrapper}>
                        <h2 className={globalstyles.formheader_title}>{capitalize(singularize(entity)) + " List"}</h2>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {
                            objects.map((object) => {
                                return (
                                    <div className="group relative">
                                        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                                            <img src={object.image} alt={object.title} className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <a href={'/' + entity + '/' + object.id}>
                                                        {/*<span aria-hidden="true" className="absolute inset-0"></span>*/}
                                                        {object.title}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{object.description}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">$35</p>
                                        </div>
                                        <div onClick={() => { onDeleteClick(entity, object) }} className="text-sm font-medium text-gray-900">Delete</div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { entity } = context.query;
    const props = { entity }

    props.objects = await readEntities(entity, '');
    
    return {
        props
    }
}

/*
<div key={(Math.random() + 1).toString(36).substring(7)}>
    <div onClick={() => { router.push('/' + entity +'/' + object.id) }}>
        <div>{object.title}</div>
        <div>{object.description}</div>
    </div>
    <button onClick={() => { router.push('/' + entity +'/' + object.id + '/edit') }}>Edit</button>
    <button onClick={() => { onDeleteClick(entity, object) }}>Delete</button>
</div>
*/