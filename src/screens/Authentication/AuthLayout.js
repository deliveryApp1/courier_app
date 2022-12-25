import { StyleSheet, Text, View, Image } from 'react-native'
import React, { Children } from 'react'
import { COLORS, images, FONTS, SIZES } from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AuthLayout = ({ title, subtitle, titleContainerStyle, children }) => {
    return (
        <View style={{
            flex: 1,
            // paddingVertical: SIZES.padding,
            backgroundColor: COLORS.white,
        }}>
            <KeyboardAwareScrollView
                keyboardDismissMode='on-drag'
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding
                }}
            >
                <View
                    style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}
                >
                    <Image
                        source={images.hot_delivery}
                        resizeMode='contain'
                        style={{
                            height: 100,
                            width: 100,
                            // borderColor: 'red',
                            // borderWidth: 1
                        }}
                    />
                    <Text style={{ fontSize: SIZES.h1, color: COLORS.primary, fontWeight: '500' }}>Courier</Text>
                </View>
                <View
                    style={{
                        marginTop: SIZES.padding,
                        ...titleContainerStyle
                    }}
                >
                    <Text style={{ textAlign: 'center', ...FONTS.h2 }}>{title}</Text>
                </View>
                {children}
            </KeyboardAwareScrollView>
        </View>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})