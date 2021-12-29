export default function ProductList({ products }) {
    return (
        <div>
            {
                products.map((product) => {
                    console.log(product);
                    return (
                        <div>
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