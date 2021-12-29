import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

const query = gql`
query Query($productId: ID!) {
    readProduct(productID: $productId) {
      title
      description
    }
  }
`

export default function ProductDetail({ product }) {
    const router = useRouter();
    const { id } = router.query;
    if (!product) {
        const { loading, error, data } = useQuery(query, { variables: { "productId": "61c1648d8c07fed19f5a9ac5" } })

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
    }
    return (
        <div>
            <div>{id}</div>
            <div>{product.title}</div>
            <div>{product.description}</div>
        </div>
    )
}

export async function getServerSideProps() {
    const json = [
        { "title": "RTX 3080", "description": "non LHR" },
    ]

    return {
        props: {
            product: json[0]
        }
    }
}