import { API_URL } from "./api";

import { createApi } from '@reduxjs/toolkit/query'
import { gql } from 'graphql-request'
import { graphqlBaseQuery } from "./graphql";

export const product_api = createApi({
    baseQuery: graphqlBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (title = '') => ({
                query: gql`
                    query ReadEntity($title: String!) {
                        readProducts(title: $title) {
                            title
                            description
                            image
                            id
                            ${extra_fields}
                        }
                    }`,
                variables: {
                    "title": title
                }
            }),
            transformResponse: (response) => response.data.readProducts,
        }),
        getProduct: builder.query({
            query: (id, extra_fields = '') => ({
                query: gql`
                    query ReadEntity($entityID: ID!) {
                        readProduct(entityID: $entityID) {
                            title
                            description
                            image
                            id
                            ${extra_fields}
                        }
                    }`,
                variables: {
                    "entityID": id
                },
            }),
            transformResponse: (response) => response.data.readProduct,
        }),
    }),
})