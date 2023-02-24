import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IAuthor} from "../user.types";
import authHeader from "../services/headerService";
import {RootState} from "../store";

export const authorApi = createApi({
    reducerPath: 'author',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8081/api/author',
        prepareHeaders: (headers, { getState }) => {
            const auth = (getState() as RootState).auth;
            if(auth && auth.user) {
                const token = auth.user.token;
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        }
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