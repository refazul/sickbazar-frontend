import { useRouter } from 'next/router';
export default function ProductList({ products }) {
    const router = useRouter();
    return (
        <div>
            {
                products.map((product) => {
                    return (
                        <div>
                            <div onClick={() => { router.push('/products/' + product.id) }}>
                                <div>{product.title}</div>
                                <div>{product.description}</div>
                            </div>
                            <div onClick={() => { router.push('/products/' + product.id + '/edit') }}>Edit</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export async function getServerSideProps() {
    const API_URL = 'https://graphql.crescentcoder.com/graphql'
    const query = `
        query Query($title: String!) {
            readProducts(title: $title) {
                title
                description
                id
            }
        }
    `;
    const variables = { "title": "" }
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    })

    const json = await res.json()

    return {
        props: {
            products: json.data.readProducts
        }
    }
}