import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_document_service,
  });

export const docApiSlice = createApi({
    reducerPath: 'docApiSlice',
    baseQuery,
    tagTypes: ['DocumentData'], 
    endpoints: (builder) => ({
        getSingleData: builder.query({
      // Custom queryFn to include token manually
      async queryFn(documentId) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        const result = await baseQuery(
          {
            url: `/api/document/${documentId}`,
            credentials: 'include',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          },
          {}, // `api` arg from RTK Query (not needed here)
          {}  // `extraOptions`
        );

        return result;
      },
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