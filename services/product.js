import { http_post } from "./helper";

const removeProductQuery = `
mutation Mutation($productId: ID!) {
    deleteProduct(productID: $productId) {
        success
    }
}  
`
const updateProductQuery = `
mutation Mutation($productId: ID!, $input: ProductInput) {
    updateProduct(productID: $productId, input: $input) {
        success
    }
}
`
const readProductQuery = `
query ReadProduct($productId: ID!) {
    readProduct(entityID: $productId) {
        title
        description
        image
        id
    }
}
`
const readProductsQuery = `
query Query($title: String!) {
    readProducts(title: $title) {
        title
        description
        image
        id
    }
}
`
const createProductQuery = `
mutation CreateProduct($input: ProductInput) {
    createProduct(input: $input) {
        success
    }
}
`
export async function removeProduct(productId) {
    const variables = {
        "productId": productId
    }
    const res = await http_post({ query: removeProductQuery, variables })
    const result = await res.json()
    return result;
}
export async function updateProduct(productId, input) {
    const variables = {
        "productId": productId,
        "input": input
    }
    const res = await http_post({ query: updateProductQuery, variables })
    const result = await res.json()
    return result;
}
export async function readProduct(productId) {
    const variables = {
        "productId": productId
    }
    const res = await http_post({ query: readProductQuery, variables })
    const result = await res.json()
    return result.data.readProduct;
}
export async function readProducts(title) {
    const variables = {
        "title": title
    }
    const res = await http_post({ query: readProductsQuery, variables })
    const result = await res.json()
    return result.data.readProducts;
}
export async function createProduct(input) {
    const variables = {
        "input": input
    }
    const res = await http_post({ query: createProductQuery, variables })
    const result = await res.json()
    return result;
}

export const fields = [
    { "title": "Title", "name": "title", "type": "text" },
    { "title": "Description", "name": "description", "type": "text" },
    { "title": "Image", "name": "image", "type": "file" },
]