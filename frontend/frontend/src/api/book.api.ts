import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IBook} from "../user.types";
import * as url from "url";

export const bookApi = createApi({
    reducerPath: 'book',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8081/api/book'
    }),
    tagTypes:['Books'],
    endpoints: build =>  ({
        getAllBooks: build.query<IBook[], void>({
            query: () => ({
                url: ''
            }),
            providesTags: (result) =>
                result
                    ?
                    [
                        ...result.map(({ id }) => ({ type: 'Books', id } as const)),
                        { type: 'Books', id: 'LIST' },
                    ]
                    :
                    [{ type: 'Books', id: 'LIST' }]
        }),
        deleteBookById: build.mutation<{ success: boolean; id: number }, number>({
            query:(id:number) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags:  [{ type: 'Books', id: 'LIST'}]
        })
    })
})

export const {useGetAllBooksQuery, useDeleteBookByIdMutation} = bookApi