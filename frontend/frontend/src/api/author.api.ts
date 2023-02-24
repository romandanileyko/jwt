import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IAuthor} from "../user.types";

export const authorApi = createApi({
    reducerPath: 'author',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8081/api/author',
    }),
    tagTypes:['Author'],
    endpoints: build => ({
        getAllAuthors: build.query<IAuthor[], void>({
            query: () => ({
                url: ''
            })
        })
    })

})

export const {useGetAllAuthorsQuery} = authorApi;