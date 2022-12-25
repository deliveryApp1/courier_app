import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    user: {
        isAllowed: true,
        token: null,
        lang: 'ru'
    },
    loading: false,
    authNumber: "",
    skipAuth: true
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setAuthNumber: (state, action) => {
            state.authNumber = action.payload
            state.skipAuth = false
        },
        changeuserLang: (state, action) => {
            state.user.lang = action.payload
            AsyncStorage.setItem('lang', action.payload)
        }
    }
})

export const { setAuthNumber, changeuserLang } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer