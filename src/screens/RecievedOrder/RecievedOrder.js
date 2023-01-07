import { StyleSheet, Text, View, StatusBar, Linking, Platform, ScrollView, BackHandler, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES } from '../../constants'
import { OrderDetails, TextButton, IconButton } from '../../components'
import { useGetClientByIdQuery, useUpdateOrderMutation, orderApi } from '../../redux/services/orderApi'
import Ionicons from '@expo/vector-icons/Ionicons';
import { changeTabIndex } from '../../redux/slices/orderListSlice'
import { useDispatch } from 'react-redux'
import i18n from '../../../i18n'

const RecievedOrder = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { data } = route.params
    const [updateOrder] = useUpdateOrderMutation()
    // console.log("data: ", route.params);
    const { data: clientData, error, isLoading } = useGetClientByIdQuery(route.params.clientId)
    // console.log("clientData: ", clientData?.data?.phone);
    useEffect(() => {
        const backAction = () => {
            navigation.navigate('FulfilledOrders')
            return true
        }

        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Pressable style={{ borderWidth: 2, borderColor: COLORS.white, width: 40, borderRadius: 30, padding: 5, backgroundColor: COLORS.primary2 }} onPress={() => navigation.navigate('FulfilledOrders')}><Ionicons name="arrow-back" size={24} color={COLORS.white} /></Pressable>
            <ScrollView>
                <OrderDetails />
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TextButton
                    label={i18n.t('call')}
                    labelStyle={{ color: COLORS.primary }}
                    onPress={() => {
                        Linking.openURL(`tel:${clientData?.data?.phone}`)
                    }}
                    buttonContainerStyle={styles.contactButtons}
                />
                <TextButton
                    label={i18n.t('on_map')}
                    labelStyle={{ color: COLORS.primary }}
                    onPress={() => {
                        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                        const latLng = `${data?.location?.latitude},${data?.location?.longitude}`;
                        const label = data?.location?.address;
                        const url = Platform.select({
                            ios: `${scheme}${label}@${latLng}`,
                            android: `${scheme}${latLng}(${label})`
                        });
                        Linking.openURL(url);
                    }}
                    buttonContainerStyle={styles.contactButtons}
                />
            </View>
            <TextButton
                label={i18n.t('actions.complete_order')}
                onPress={() => {
                    dispatch(changeTabIndex(1))
                    navigation.navigate('FulfilledOrders')
                    // updateOrder({ id: route.params.id, status: "DELIVERED" })
                }}
                buttonContainerStyle={styles.footerButton}
            />
        </View>
    )
}

export default RecievedOrder

const styles = StyleSheet.create({
    footerButton: {
        height: 50,
        alignItems: 'center',
        // borderRadius: SIZES.radius,
        backgroudColor: COLORS.primary,
        // marginBottom: 25,
        // position: 'absolute',
        // bottom: 0
    },
    contactButtons: {
        height: 40,
        width: '40%',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        margin: SIZES.padding,
        borderRadius: 30
    }
})