import { http_post } from "./helper";

const removeCategoryQuery = `
mutation Mutation($entityID: ID!) {
    deleteCategory(entityID: $entityID) {
        success
    }
}  
`
const updateCategoryQuery = `
mutation Mutation($entityID: ID!, $input: CategoryInput) {
    updateCategory(entityID: $entityID, input: $input) {
        success
    }
}
`
const readCategoryQuery = `
query ReadCategory($entityID: ID!) {
    readCategory(entityID: $entityID) {
        title
        description
        image
        id
    }
}
`
const readCategoriesQuery = `
query Query($title: String!) {
    readCategories(title: $title) {
        title
        description
        image
        id
    }
}
`
const createCategoryQuery = `
mutation CreateCategory($input: CategoryInput) {
    createCategory(input: $input) {
        success
    }
}
`
export async function removeCategory(entityID) {
    const variables = {
        "entityID": entityID
    }
    const res = await http_post({ query: removeCategoryQuery, variables })
    const result = await res.json()
    return result;
}
export async function updateCategory(entityID, input) {
    const variables = {
        "entityID": entityID,
        "input": input
    }
    const res = await http_post({ query: updateCategoryQuery, variables })
    const result = await res.json()
    return result;
}
export async function readCategory(entityID) {
    const variables = {
        "entityID": entityID
    }
    const res = await http_post({ query: readCategoryQuery, variables })
    const result = await res.json()
    return result.data.readCategory;
}
export async function readCategories(title) {
    const variables = {
        "title": title
    }
    const res = await http_post({ query: readCategoriesQuery, variables })
    const result = await res.json()
    return result.data.readCategories;
}
export async function createCategory(input) {
    const variables = {
        "input": input
    }
    const res = await http_post({ query: createCategoryQuery, variables })
    const result = await res.json()
    return result;
}