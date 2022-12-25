import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTS, COLORS } from '../constants'

const TextButton = ({ buttonContainerStyle, disabled, label, labelStyle, onPress }) => {
    return (
        <TouchableOpacity style={[styles.tOpacity, { ...buttonContainerStyle }]} disabled={disabled} onPress={onPress}>
            <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TextButton

const styles = StyleSheet.create({
    tOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary
    }
})