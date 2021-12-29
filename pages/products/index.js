import { useRouter } from 'next/router';
export default function ProductList({ products }) {
    const router = useRouter();
    return (
        <div>
            {
                products.map((product) => {
                    return (
                        <div onClick={() => {router.push('/products/' + product.id)}}>
                            <div>{product.title}</div>
                            <div>{product.description}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export async function getServerSideProps() {
    const json = [
        { "title": "RTX 3080", "description": "non LHR", "id": 1 },
        { "title": "RTX 3090", "description": "LHR doesn't matter", "id": 2 },
    ]

    return {
        props: {
            products: json
        }
    }
}