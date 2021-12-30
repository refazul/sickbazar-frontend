import { readProduct } from '../../services/product';

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
    const product = await readProduct(id);
    return {
        props: { product }
    }
}