import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IBook, IBookOut} from "../user.types";
import {RootState} from "../store";

export const bookApi = createApi({
    reducerPath: 'book',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8081/api/book',
        prepareHeaders: (headers, { getState }) => {
            const auth = (getState() as RootState).auth;
            if (auth && auth.user) {
                const token = auth.user.token;
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        }
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
        addBook: build.mutation<IBook, IBookOut>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body
            }),
            invalidatesTags:  [{ type: 'Books', id: 'LIST'}]
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

export const {useGetAllBooksQuery, useDeleteBookByIdMutation, useAddBookMutation} = bookApi