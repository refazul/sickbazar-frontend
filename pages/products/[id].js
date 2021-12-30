import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

export default function ProductDetail({ product }) {
    console.log(product);
    return (
        <div>
            <div>{product.id}</div>
            <div>{product.title}</div>
            <div>{product.description}</div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    const API_URL = 'https://graphql.crescentcoder.com/graphql'
    const query = `
        query ReadProduct($productId: ID!) {
            readProduct(productID: $productId) {
                title
                description
                id
            }
        }
    `;
    const variables = { "productId": id }
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
    
    /*
    const json = [
        { "title": "RTX 3080", "description": "non LHR" },
    ]
    */

    return {
        props: {
            product: json.data.readProduct
        }
    }
}