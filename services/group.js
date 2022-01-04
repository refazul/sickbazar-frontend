import { http_post } from "./helper";

const removeGroupQuery = `
mutation Mutation($groupId: ID!) {
    deleteGroup(groupID: $groupId) {
        success
    }
}  
`
const updateGroupQuery = `
mutation Mutation($groupId: ID!, $input: GroupInput) {
    updateGroup(groupID: $groupId, input: $input) {
        success
    }
}
`
const readGroupQuery = `
query ReadGroup($groupId: ID!) {
    readGroup(groupID: $groupId) {
        title
        description
        id
    }
}
`
const readGroupsQuery = `
query Query($title: String!) {
    readGroups(title: $title) {
        title
        description
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
export async function removeGroup(groupId) {
    const variables = {
        "groupId": groupId
    }
    const res = await http_post({ query: removeGroupQuery, variables })
    const result = await res.json()
    return result;
}
export async function updateGroup(groupId, input) {
    const variables = {
        "groupId": groupId,
        "input": input
    }
    const res = await http_post({ query: updateGroupQuery, variables })
    const result = await res.json()
    return result;
}
export async function readGroup(groupId) {
    const variables = {
        "groupId": groupId
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

export const fields = [
    { "title": "Title", "name": "title", "type": "text" },
    { "title": "Description", "name": "description", "type": "text" },
    { "title": "Image", "name": "image", "type": "file" },
]