import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const docApiSlice = createApi({
    reducerPath: 'docApiSlice',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_document_service}),
    tagTypes: ['DocumentData'], 
    endpoints: (builder) => ({
        getAllData: builder.query({
            query: () => "/api/document",
            providesTags: ['DocumentData']
        }),
        getSingleData: builder.query({
            query: (documentId) => `/api/document/${documentId}`,
            providesTags: ['DocumentData']
        }),
        addData: builder.mutation({
            query: (newDocumentData) => ({
                url: `/api/document`,
                method: 'POST',
                body: newDocumentData
            }),
            invalidatesTags: ['DocumentData']
        }),
        updateData: builder.mutation({
            query: ({documentId, updatedData}) => ({
                url: `/api/document/${documentId}`,
                method: 'PUT',
                body: {documentId, updatedData}
            }),
            providesTags: ['DocumentData']
        }),
        deleteData: builder.mutation({
            query: (documentId) => ({
                url: `/api/document/${documentId}`,
                method: 'DELETE'
            }),
            providesTags: ['DocumentData']
        }),
    }),
});

export const {
    useGetAllDataQuery,
    useGetSingleDataQuery,
    useAddDataMutation,
    useUpdateDataMutation,
    useDeleteDataMutation
} = docApiSlice;