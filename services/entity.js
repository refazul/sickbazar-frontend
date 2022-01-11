import { http_post, capitalize, singularize } from "./helper";

export async function removeEntity(entity, entityID) {
    const removeEntityQuery = `
    mutation Mutation($entityID: ID!) {
        delete${capitalize(singularize(entity))}(entityID: $entityID) {
            success
        }
    }  
    `
    const variables = {
        "entityID": entityID
    }
    const res = await http_post({ query: removeEntityQuery, variables })
    const result = await res.json()
    return result;
}
export async function updateEntity(entity, entityID, input) {
    const updateEntityQuery = `
    mutation Mutation($entityID: ID!, $input: ${capitalize(singularize(entity))}Input) {
        update${capitalize(singularize(entity))}(entityID: $entityID, input: $input) {
            success
        }
    }
    `
    const variables = {
        "entityID": entityID,
        "input": input
    }
    const res = await http_post({ query: updateEntityQuery, variables })
    const result = await res.json()
    return result;
}
export async function readEntity(entity, entityID, { extra_fields = '' }) {
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
export async function readEntities(entity, title) {
    const readEntitiesQuery = `
    query readEntities($title: String!) {
        read${capitalize(entity)}(title: $title) {
            title
            description
            image
            id
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
export async function createEntity(entity, input) {
    const createEntityQuery = `
    mutation CreateEntity($input: ${capitalize(singularize(entity))}Input) {
        create${capitalize(singularize(entity))}(input: $input) {
            success
        }
    }
    `
    const variables = {
        "input": input
    }
    const res = await http_post({ query: createEntityQuery, variables })
    const result = await res.json()
    return result;
}