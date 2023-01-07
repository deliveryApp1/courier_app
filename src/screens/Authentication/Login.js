import React, { useState } from 'react';
import { View, Image, StyleSheet, Button, Pressable, ActivityIndicator, Alert } from 'react-native';
import AuthLayout from './AuthLayout'
import { SIZES, COLORS, icons } from '../../constants';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useAuthMutation } from '../../redux/services/orderApi';
import { FormInput, CustomSwitch, TextButton, TextIconButton } from '../../components';

const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [password, setPassword] = useState("")
    const [number, setNumber] = useState("")
    const [numberError, setNumberError] = useState("")
    const [passError, setPassError] = useState("")
    const [auth, { isLoading }] = useAuthMutation();
    // const [showPass, setShowPass] = useState(false)
    // const [saveMe, setSaveMe] = useState(false)

    // const isEnableSignIn = () => number != ""

    // const signInUser = () => {
    //     signInWithnumberAndPassword(auth, number, password)
    //         .then(res => {
    //             dispatch(addUser(res._tokenResponse))
    //             navigation.replace("Home")
    //         })
    //         .catch(err => {
    //             Alert.alert(
    //                 "Error",
    //                 err.message,
    //                 [
    //                     // { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: 'cancel' },
    //                     { text: "Ok", onPress: () => console.log("OK Pressed") }
    //                 ],
    //                 {
    //                     cancelable: true
    //                 }
    //             )
    //         })
    // }
    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
    }
    return (
        <AuthLayout
            title="Let's Sign In"
            subtitle="Welcome back, you've been missed"
        >
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>

                    <FormInput
                        label='Login'
                        // keyboardType='numeric'
                        // autoComplete='tel-country-code'

                        onChange={value => {
                            // setNumber(value.replace(/[^0-9]/g, ''))
                            setNumber(value)
                            if (value.length) {
                                setNumberError("")
                            } else {
                                setNumberError("Enter login")
                            }
                        }}
                        containerStyle={{ marginVertical: 20 }}
                        value={number}
                        secureTextEntry={false}
                        // prefix={"+7"}
                        errorMsg={numberError}
                        onSubmitEditing={async () => {
                            if (number.length) {
                                if (password.length) {
                                    try {
                                        const formState = { phoneNumber: `998${password}`, password: number }
                                        const result = await auth(formState);
                                        if (result.data && result.data.token) {
                                            const userPayload = {
                                                isAllowed: true,
                                                token: result.data.token,
                                                lang: 'ru'
                                            }
                                            dispatch(setUser(userPayload));
                                            navigation.navigate("Home");
                                        } else if (result.error) {
                                            Alert.alert("Error", result.error.data.error)
                                        }
                                    } catch (err) {
                                        console.log(err);
                                    }
                                    // dispatch(setAuthNumber(number))
                                    // navigation.navigate("OTP")
                                } else {
                                    setPassError('Enter password')
                                }
                            } else {
                                if (!password.length) {
                                    setPassError('Enter password')
                                }
                                setNumberError("Enter login")
                            }
                        }}
                        appendComponent={
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={number == "" || (number != "" && numberError == "") ? icons.correct : icons.cancel}
                                    style={{ height: 20, width: 20, tintColor: number == "" ? COLORS.gray : (number != "" && numberError == "") ? COLORS.green : COLORS.red }}
                                />
                            </View>
                        }
                    />
                    <FormInput
                        label='Password'
                        // keyboardType='numeric'
                        // autoComplete='tel-country-code'
                        onChange={value => {
                            if (value.length) {
                                setPassError("")
                            } else {
                                setPassError("Enter password")
                            }
                            setPassword(value)
                        }}

                        // prefix={"+7"}
                        value={password}
                        secureTextEntry={false}
                        errorMsg={passError}
                        onSubmitEditing={async () => {
                            if (number.length) {
                                if (password.length) {
                                    try {
                                        const formState = { phoneNumber: `998${password}`, password: number }
                                        const result = await auth(formState);
                                        if (result.data && result.data.token) {
                                            const userPayload = {
                                                isAllowed: true,
                                                token: result.data.token,
                                                lang: 'ru'
                                            }
                                            dispatch(setUser(userPayload));
                                            navigation.navigate("Home");
                                        } else if (result.error) {
                                            Alert.alert("Error", result.error.data.error)
                                        }
                                    } catch (err) {
                                        console.log(err);
                                    }
                                    // dispatch(setAuthNumber(number))
                                    // navigation.navigate("OTP")
                                } else {
                                    setPassError('Enter password')
                                }
                            } else {
                                if (!password.length) {
                                    setPassError('Enter password')
                                }
                                setNumberError("Enter login")
                            }
                        }}
                        appendComponent={
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={password == "" || (password != "" && passError == "") ? icons.correct : icons.cancel}
                                    style={{ height: 20, width: 20, tintColor: password == "" ? COLORS.gray : (password != "" && passError == "") ? COLORS.green : COLORS.red }}
                                />
                            </View>
                        }
                    />

                    {/* <View style={{ flexDirection: 'row', marginTop: SIZES.radius, justifyContent: 'center' }}>
                        <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>Don't have an account?</Text>
                        <TextButton
                            label='Sign Up'
                            buttonContainerStyle={{ backgroundColor: 'transparent', marginLeft: 3 }}
                            labelStyle={{ color: COLORS.primary, ...FONTS.h3 }}
                        // onPress={() => navigation.navigate('SignUp')}
                        />
                    </View> */}
                </View>
                <TextButton
                    label="Login"
                    buttonContainerStyle={{
                        height: 40,
                        alignItems: 'center',
                        borderRadius: SIZES.radius,
                        backgroudColor: COLORS.primary,
                        marginBottom: SIZES.padding
                    }}
                    // disabled={number ? false : true}
                    onPress={async () => {
                        if (number.length) {
                            if (password.length) {
                                try {
                                    const formState = { phoneNumber: `998${password}`, password: number }
                                    const result = await auth(formState);
                                    if (result.data && result.data.token) {
                                        const userPayload = {
                                            isAllowed: true,
                                            token: result.data.token,
                                            lang: 'ru'
                                        }
                                        dispatch(setUser(userPayload));
                                        navigation.navigate("Home");
                                    } else if (result.error) {
                                        Alert.alert("Error", result.error.data.error)
                                    }
                                } catch (err) {
                                    console.log(err);
                                }
                                // dispatch(setAuthNumber(number))
                                // navigation.navigate("OTP")
                            } else {
                                setPassError('Enter password')
                            }
                        } else {
                            if (!password.length) {
                                setPassError('Enter password')
                            }
                            setNumberError("Enter login")
                        }
                    }}
                />
                {/* <TouchableOpacity
                    disabled={number ? false : true}
                    style={styles.loginButtonContainer}
                    onPress={() => navigation.navigate("OTP")}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity> */}
            </View>
        </AuthLayout>
    )
}

export default Login;

const styles = StyleSheet.create({
    loginButtonContainer: {
        elevation: 8,
        marginBottom: SIZES.padding,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    loginButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})