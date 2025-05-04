import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const docApiSlice = createApi({
    reducerPath: 'docApiSlice',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_document_service}),
    tagTypes: ['DocumentData'], 
    endpoints: (builder) => ({
        getSingleData: builder.query({
            query: (documentId) => ({ 
                url: `/api/document/${documentId}`,
                credentials: 'include'
             }),
            keepUnusedDataFor: 0, // Disable caching
            refetchOnMountOrArgChange: true, // Ensure fresh data on mount
            refetchOnFocus: true, // Refetch when the tab gains focus
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
        deleteData: builder.mutation({
            query: (documentId) => ({
                url: `/api/document/${documentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['DocumentData']
        }),
    }),
});

export const {
    useGetSingleDataQuery,
    useAddDataMutation,
    useDeleteDataMutation
} = docApiSlice;