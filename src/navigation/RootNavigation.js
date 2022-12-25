import React, { useState, useEffect } from 'react'
// import auth from '@react-native-firebase/auth';
// import { AuthContext } from './AuthProvider'
import Tabs from './tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { Login, OTP, RecievedOrder, Languages } from '../screens'
import i18n from '../../i18n'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator()

const RootNavigation = () => {
    const { user } = useSelector(state => state.user)
    const lang = useSelector(state => state.user.user.lang)
    console.log("user: ", user);
    // const [user, setUser] = useState(AuthContext)
    // const [initializing, setInitializing] = useState(true)
    // const onAuthStateChanged = (user) => {
    //     setUser(user);
    //     if (initializing) setInitializing(false);
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber;
    // }, [])
    const dispatch = useDispatch()
    useEffect(() => {
        const getData = async () => {
            try {
                const lang = await AsyncStorage.getItem('lang')
                if (lang) {
                    // value previously stored
                    console.log('sss: ', lang);
                    dispatch(changeuserLang(lang))
                    i18n.locale = lang
                } else {
                    console.log('lll: ', lang);
                    dispatch(changeuserLang('ru'))
                    i18n.locale = 'ru'
                }
            } catch (e) {
                console.log('Language error: ', e);
            }
        }
        getData()
    }, [])

    // if (initializing) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={user.isAllowed ? "Home" : "Login"}
            >
                {user.isAllowed ? <><Stack.Screen name='Home' component={Tabs} />
                    <Stack.Screen name='recievedOrder' component={RecievedOrder} />
                    <Stack.Screen
                        name='language'
                        component={Languages}
                        options={{
                            title: 'My home',
                            headerStyle: {
                                backgroundColor: '#f4511e',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </>
                    : <><Stack.Screen name='Login' component={Login} />
                        <Stack.Screen name='OTP' component={OTP} /></>}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation