import { useRouter } from 'next/router';
import { readProducts } from '../../services/product';
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
    const products = await readProducts('')
    return {
        props: { products }
    }
}