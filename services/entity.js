import { http_post, capitalize, singularize } from "./helper";

export async function removeEntity(entity, entityID) {
    const removeEntityQuery = `
    mutation Mutation($entityID: ID!) {
        delete${capitalize(singularize(entity))}(entityID: $entityID)
    }  
    `
    const variables = {
        "entityID": entityID
    }
    const res = await http_post({ query: removeEntityQuery, variables })
    const result = await res.json()
    return result.data['delete' + capitalize(singularize(entity))];
}
export async function updateEntity(entity, entityID, input) {
    const updateEntityQuery = `
    mutation Mutation($entityID: ID!, $input: ${capitalize(singularize(entity))}Input) {
        update${capitalize(singularize(entity))}(entityID: $entityID, input: $input) {
            title
            description
            image
            id
        }
    }
    `
    const variables = {
        "entityID": entityID,
        "input": input
    }
    const res = await http_post({ query: updateEntityQuery, variables })
    const result = await res.json()
    return result.data['update' + capitalize(singularize(entity))];
}
export async function readEntity() {
    const entity = arguments[0];
    const entityID = arguments[1];
    const { extra_fields = '' } = arguments[2];
    const readEntityQuery = `
    query ReadEntity($entityID: ID!) {
        read${capitalize(singularize(entity))}(entityID: $entityID) {
            title
            description
            image
            id
            ${extra_fields}
        }
    }
    `
    const variables = {
        "entityID": entityID
    }
    const res = await http_post({ query: readEntityQuery, variables })
    const result = await res.json()
    return result.data['read' + capitalize(singularize(entity))];
}
export async function readEntities(entity, title, { extra_fields = '' } = {}) {
    const readEntitiesQuery = `
    query readEntities($title: String!) {
        read${capitalize(entity)}(title: $title) {
            title
            description
            image
            id
            ${extra_fields}
        }
    }
    `
    const variables = {
        "title": title
    }
    const res = await http_post({ query: readEntitiesQuery, variables })
    const result = await res.json()
    return result.data['read' + capitalize(entity)];
}
export async function createEntity() {
    const entity = arguments[0];
    const input = arguments[1];
    const createEntityQuery = `
    mutation CreateEntity($input: ${capitalize(singularize(entity))}Input) {
        create${capitalize(singularize(entity))}(input: $input) {
            title
            description
            image
            id
        }
    }
    `
    const variables = {
        "input": input
    }
    const res = await http_post({ query: createEntityQuery, variables })
    const result = await res.json()
    return result.data['create' + capitalize(singularize(entity))];
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}