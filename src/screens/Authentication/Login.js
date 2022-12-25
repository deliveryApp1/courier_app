import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, Pressable } from 'react-native';
import AuthLayout from './AuthLayout'
import { SIZES, FONTS, COLORS, icons } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthNumber } from '../../redux/slices/userSlice';
import { FormInput, CustomSwitch, TextButton, TextIconButton } from '../../components';


const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    // const [password, setPassword] = useState("")
    const [number, setNumber] = useState("")
    const { authNumber } = useSelector(state => state.user)
    const [numberError, setNumberError] = useState("")
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
    return (
        <AuthLayout
            title="Let's Sign In"
            subtitle="Welcome back, you've been missed"
        >
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ marginTop: 10 }}>
                    <FormInput
                        label='Login'
                        keyboardType='numeric'
                        autoComplete='tel-country-code'
                        onChange={value => {
                            setNumber(value.replace(/[^0-9]/g, ''))
                        }}
                        value={number}
                        secureTextEntry={false}
                        prefix={"+7"}
                        errorMsg={numberError}
                        onSubmitEditing={() => {
                            console.log("number: ", number);
                            if (number.length === 9) {
                                dispatch(setAuthNumber(number))
                                navigation.navigate("OTP")
                            } else {
                                setNumberError("Number should be 9 characters")
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
                    disabled={number ? false : true}
                    onPress={() => {
                        console.log("number: ", number);
                        if (number.length === 9) {
                            dispatch(setAuthNumber(number))
                            navigation.navigate("OTP")
                        } else {
                            setNumberError("Number should be 9 characters")
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