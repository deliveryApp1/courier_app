import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderList: [],
    simpleOrder: {},
    orderListLoading: false,
    tabIndex: 0
}

const orderListSlice = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
        setSimpleOrder: (state, action) => {
            state.simpleOrder = action.payload
        },
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        changeTabIndex: (state, actions) => {
            state.tabIndex = actions.payload
        }
    }
})

export const { setSimpleOrder, setOrderList, changeTabIndex } = orderListSlice.actions
export default orderListSlice.reducer