import { http_post } from "./helper";

const removeProductQuery = `
mutation Mutation($entityID: ID!) {
    deleteProduct(entityID: $entityID) {
        success
    }
}  
`
const updateProductQuery = `
mutation Mutation($entityID: ID!, $input: ProductInput) {
    updateProduct(entityID: $entityID, input: $input) {
        success
    }
}
`
const readProductQuery = `
query ReadProduct($entityID: ID!) {
    readProduct(entityID: $entityID) {
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
export async function removeProduct(entityID) {
    const variables = {
        "entityID": entityID
    }
    const res = await http_post({ query: removeProductQuery, variables })
    const result = await res.json()
    return result;
}
export async function updateProduct(entityID, input) {
    const variables = {
        "entityID": entityID,
        "input": input
    }
    const res = await http_post({ query: updateProductQuery, variables })
    const result = await res.json()
    return result;
}
export async function readProduct(entityID) {
    const variables = {
        "entityID": entityID
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