import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@env'

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API_URL}` }),
    tagTypes: ['Orders'],
    endpoints: (build) => ({
        getOrders: build.query({
            query: (query) => {
                // console.log('api query: ', query)
                return `order?status=${query}`
            },
            providesTags: ['Orders']
        }),
        auth: build.query({
            query: (query) => {
                console.log('auth query: ', query)
                return `auth/${query}`
            }
        }),
        addOrder: build.mutation({
            query: (body) => ({
                url: `order`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
        }),
        getActiveOrders: build.query({
            query: (clientId) => {
                console.log("getActiveOrders: ", clientId);
                return `order?status=ONTHEWAY&clientId=${clientId}`
            },
            providesTags: ['Orders']
        }),
        getDeliveredOrders: build.query({
            query: (clientId) => {
                console.log("getDeliveredOrders: ", clientId);
                return `order?status=DELIVERED&clientId=${clientId}`
            },
            providesTags: ['Orders']
        }),
        getOrderById: build.query({
            query: (id) => id ? `order/${id}` : false,
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),
        getClientById: build.query({
            query: (id) => `user/${id}`,
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),
        updateOrder: build.mutation({
            query: ({ id, ...patch }) => {
                return ({
                    url: `order/${id}`,
                    method: 'PUT',
                    body: patch,
                })
            },
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    orderApi.util.updateQueryData('getOrders')
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: (result, error) => [{ type: 'Orders' }],
        }),
        deleteOrder: build.mutation({
            query(id) {
                return {
                    url: `order/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'orders', id }],
        }),
    }),
})

export const {
    useGetActiveOrdersQuery,
    useGetDeliveredOrdersQuery,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useAuthQuery,
    useGetClientByIdQuery,
    useAddOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = orderApi
