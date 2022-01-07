import { http_post } from "./helper";

const removeCategoryQuery = `
mutation Mutation($categoryId: ID!) {
    deleteCategory(categoryID: $categoryId) {
        success
    }
}  
`
const updateCategoryQuery = `
mutation Mutation($categoryId: ID!, $input: CategoryInput) {
    updateCategory(categoryID: $categoryId, input: $input) {
        success
    }
}
`
const readCategoryQuery = `
query ReadCategory($categoryId: ID!) {
    readCategory(categoryID: $categoryId) {
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
export async function removeCategory(categoryId) {
    const variables = {
        "categoryId": categoryId
    }
    const res = await http_post({ query: removeCategoryQuery, variables })
    const result = await res.json()
    return result;
}
export async function updateCategory(categoryId, input) {
    const variables = {
        "categoryId": categoryId,
        "input": input
    }
    const res = await http_post({ query: updateCategoryQuery, variables })
    const result = await res.json()
    return result;
}
export async function readCategory(categoryId) {
    const variables = {
        "categoryId": categoryId
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

export const fields = [
    { "title": "Title", "name": "title", "type": "text" },
    { "title": "Description", "name": "description", "type": "text" },
    { "title": "Image", "name": "image", "type": "file" },
]