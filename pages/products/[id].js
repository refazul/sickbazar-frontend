import { useRouter } from 'next/router';

export default function ProductDetail({ product }) {
    const router = useRouter();
    const { id } = router.query;
    // useQuery here
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