import userReducer from './slices/userSlice'
import orderListSlice from './slices/orderListSlice'

const rootReducer = {
    user: userReducer,
    orderList: orderListSlice
}

export default rootReducer 