import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import i18n from '../../../i18n'
import { useDispatch, useSelector } from 'react-redux';
import { changeuserLang } from '../../redux/slices/userSlice';
import { COLORS, SIZES } from '../../constants'
import RadioGroup from 'react-native-radio-buttons-group';



const Languages = ({ navigation }) => {
    console.log("lang: ", i18n.defaultLocale);
    const lang = useSelector(state => state.user.user.lang)
    const dispatch = useDispatch()
    const [radioValue, setRadioValue] = useState(i18n.locale)
    const radioButtonsData = [{
        id: 'ru', // acts as primary key, should be unique and non-empty string
        label: 'Russian',
        value: 'ru',
        labelStyle: {
            color: 'ru' === radioValue ? COLORS.primary : COLORS.black,
            fontSize: 26
        },
        selected: radioValue === 'ru',
        size: 26,
        color: radioValue === 'ru' ? COLORS.primary : COLORS.black,
        onPress: value => { setRadioValue(value); i18n.locale = 'ru'; dispatch(changeuserLang('ru')) }
    }, {
        id: 'uz',
        label: "O'zbekcha",
        value: 'uz',
        labelStyle: {
            color: 'uz' === radioValue ? COLORS.primary : COLORS.black,
            fontSize: 26
        },
        size: 26,
        selected: radioValue === 'uz',
        color: radioValue === 'uz' ? COLORS.primary : COLORS.black,
        onPress: value => { setRadioValue(value); i18n.locale = 'uz'; dispatch(changeuserLang('uz')) }
    }]
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            < StatusBar barStyle="dark-content" backgroundColor="#ed8f4c" />
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.header}>
                    <Pressable style={{ justifyContent: 'center' }} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={28} color={COLORS.white} /></Pressable>
                    <Text style={styles.headerText}>{i18n.t('languages')}</Text>
                </View>
                <RadioGroup
                    radioButtons={radioButtonsData}
                    containerStyle={styles.containerStyle}
                // onPress={onPressRadioButton}
                />
            </View>
        </SafeAreaView >
    )
}

export default Languages

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: COLORS.secondary,
        // justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding
    },
    headerText: {
        fontSize: SIZES.h3,
        justifyContent: 'center',
        alignSelf: 'center',
        color: COLORS.black,
        fontWeight: '500',
        position: 'absolute',
        left: '50%',
    },
    containerStyle: {
        flex: 1,
        // justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'baseline',
        marginTop: 60
    }
})