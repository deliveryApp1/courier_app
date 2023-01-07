import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

var token = null
export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: `${BASE_API_URL}`,
        baseUrl: `http://54.243.4.145/`,
        prepareHeaders: (headers, { getState }) => {
            // try {
            // By default, if we have a token in the store, let's use that for authenticated requests
            token = getState()?.user?.user?.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
            // } catch (error) {
            //     console.log('prepareHeader error: ', error);
            // }
        }
    }),
    tagTypes: ['Orders'],
    endpoints: (build) => ({
        getOrders: build.query({
            query: query => ({
                url: `order?status=${query}`,
                // headers: { "Authorization": `Bearer ${token}` }
            }),
            providesTags: ['Orders']
        }),
        auth: build.mutation({
            query: (credentials) => {
                return ({
                    url: "auth/login",
                    method: "POST",
                    body: credentials
                })
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
    useAuthMutation,
    useGetClientByIdQuery,
    useAddOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = orderApi
