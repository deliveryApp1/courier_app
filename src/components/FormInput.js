import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { SIZES, COLORS, FONTS } from '../constants'

const FormInput = ({ containerStyle, label, placeholder, prependComponent, appendComponent, secureTextEntry, onChange, keyboardType = 'default', autoComplete = 'off', autoCapitalize = "none", errorMsg = "", prefix, value, onSubmitEditing }) => {
    return (
        <View style={{ ...containerStyle }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.primary, marginLeft: 10 }}>{label}</Text>
                <Text style={{ color: "red", marginRight: 15 }}>{errorMsg}</Text>
            </View>
            <View style={styles.inputContainer}>
                {prependComponent}
                {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
                <TextInput
                    style={{ flex: 1 }}
                    value={value}
                    // maxLength={12}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoComplete={autoComplete}
                    autoCapitalize={autoCapitalize}
                    onChangeText={(text) => onChange(text)}
                    onSubmitEditing={onSubmitEditing}
                />
                {appendComponent}
            </View>
        </View >
    )
}

export default FormInput

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray2,
        marginHorizontal: 10,
        borderRadius: 10,
        padding: SIZES.padding
    },
    prefix: {
        paddingHorizontal: 10,
        fontWeight: 'bold',
        color: 'black'
    }

})