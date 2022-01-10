import { http_post } from "./helper";

const removeGroupQuery = `
mutation Mutation($entityID: ID!) {
    deleteGroup(entityID: $entityID) {
        success
    }
}  
`
const updateGroupQuery = `
mutation Mutation($entityID: ID!, $input: GroupInput) {
    updateGroup(entityID: $entityID, input: $input) {
        success
    }
}
`
const readGroupQuery = `
query ReadGroup($entityID: ID!) {
    readGroup(entityID: $entityID) {
        title
        description
        image
        id
    }
}
`
const readGroupsQuery = `
query Query($title: String!) {
    readGroups(title: $title) {
        title
        description
        image
        id
    }
}
`
const createGroupQuery = `
mutation CreateGroup($input: GroupInput) {
    createGroup(input: $input) {
        success
    }
}
`
export async function removeGroup(entityID) {
    const variables = {
        "entityID": entityID
    }
    const res = await http_post({ query: removeGroupQuery, variables })
    const result = await res.json()
    return result;
}
export async function updateGroup(entityID, input) {
    const variables = {
        "entityID": entityID,
        "input": input
    }
    const res = await http_post({ query: updateGroupQuery, variables })
    const result = await res.json()
    return result;
}
export async function readGroup(entityID) {
    const variables = {
        "entityID": entityID
    }
    const res = await http_post({ query: readGroupQuery, variables })
    const result = await res.json()
    return result.data.readGroup;
}
export async function readGroups(title) {
    const variables = {
        "title": title
    }
    const res = await http_post({ query: readGroupsQuery, variables })
    const result = await res.json()
    return result.data.readGroups;
}
export async function createGroup(input) {
    const variables = {
        "input": input
    }
    const res = await http_post({ query: createGroupQuery, variables })
    const result = await res.json()
    return result;
}