import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { FONTS, SIZES, COLORS } from '../../constants';
import { TextButton, OTPInput } from '../../components';
import AuthLayout from './AuthLayout'
import { useAuthQuery } from '../../redux/services/orderApi';
import { useSelector } from 'react-redux';
// import OTPInput from 'react-native-otp-forminput';


const OTP = ({ navigation }) => {
    const [timer, setTimer] = useState(60)
    const { authNumber, skipAuth } = useSelector(state => state.user)
    console.log("authn umber: ", authNumber, skipAuth);
    const { data, error, isLoading, isError } = useAuthQuery(`998${authNumber}`, { skip: skipAuth })
    const [fullCode, setFullCode] = useState(data?.code)
    console.log("data code: ", data?.code);
    console.log("data code error: ", error);
    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1
                } else {
                    return prevTimer
                }
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])


    return (
        <AuthLayout
            title="OTP Authentication"
            subtitle="An authentication code has been sent to your email"
        // titleContainerStyle={{ marginTop: SIZES.padding }}
        >
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View>
                    <View style={{ height: 100 }}>
                        <OTPInput
                            numberOfInputs={4}
                            // title="Enter OTP"
                            type="filled"
                            onFilledCode={code => {
                                console.log("code: ", code);
                                setFullCode(code)
                            }}
                            onSubmitEditing={() => {
                                if (fullCode && fullCode.length === 4) {
                                    navigation.navigate("Home")
                                }
                            }}
                            initialValue={data?.code ? Array.from(String(data?.code), String) : []}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: SIZES.padding }}>
                        <Text style={{ color: COLORS.darkgray, ...FONTS.body3 }}>Didn't recieve code?</Text>
                        <TextButton
                            label={`Resend (${timer}s)`}
                            disabled={timer == 0 ? false : true}
                            buttonContainerStyle={{
                                marginLeft: SIZES.base,
                                backgroundColor: 'transparent'
                            }}
                            labelStyle={{ color: COLORS.primary, ...FONTS.h3 }}
                            onPress={() => setTimer(60)}
                        />
                    </View>
                </View>
                <View>
                    <TextButton
                        label="Continue"
                        buttonContainerStyle={{
                            height: 40,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            backgroudColor: COLORS.primary,
                            marginBottom: SIZES.padding
                        }}
                        disabled={fullCode ? false : true}
                        onPress={() => {
                            console.log("fullCode: ", fullCode.length);
                            if (fullCode && fullCode.length === 4) {
                                navigation.navigate("Home")
                            }
                        }}
                    />
                    {/* <View style={{ marginTop: SIZES.padding, alignItems: "center" }}>
                        <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>
                            By signing up, you agree to our
                        </Text>
                        <TextButton
                            label="Terms and Conditions"
                            buttonContainerStyle={{ backgroundColor: "transparent" }}
                            labelStyle={{ color: COLORS.primary, ...FONTS.body4 }}
                            onPress={() => console.log("TnC")}
                        />
                    </View> */}

                </View>
            </View>
        </AuthLayout >
    )
}

export default OTP;

{
    byDay: {

    }
}