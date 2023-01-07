import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    user: {
        isAllowed: false,
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
        setUser: (state, action) => {
            state.user = action.payload
            state.skipAuth = false
            // console.log('action.payload: ', action.payload);
            // storeData(token, action.payload.token)
            AsyncStorage.setItem('token', action.payload.token)
        },
        changeuserLang: (state, action) => {
            state.user.lang = action.payload
            // storeData(lang, action.payload)
            AsyncStorage.setItem('lang', action.payload)
        }
    }
})

export const { setAuthNumber, changeuserLang, setUser } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer