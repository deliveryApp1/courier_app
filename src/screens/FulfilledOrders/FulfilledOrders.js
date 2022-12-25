import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SIZES, icons } from '../../constants'
import { Tab, TabView } from '@rneui/themed';
import { setSimpleOrder, changeTabIndex } from '../../redux/slices/orderListSlice';
import moment from 'moment';
import i18n from '../../../i18n';
import { useGetActiveOrdersQuery, useGetDeliveredOrdersQuery } from '../../redux/services/orderApi';

const FulfilledOrders = ({ navigation }) => {
    const { tabIndex } = useSelector(state => state.orderList)
    const dispatch = useDispatch()
    const lang = useSelector(state => state.user.user.lang)
    const activeOrders = useGetActiveOrdersQuery(1)
    const deliveredOrders = useGetDeliveredOrdersQuery(1)
    const SPACING = 20;
    const AVATAR_SIZE = 80;
    const onChangeTab = index => {
        dispatch(changeTabIndex(index))
    }
    // console.log("deliveredOrders: ", deliveredOrders.data?.data);
    const activeTab = <View style={{ flex: 1 }}>{activeOrders?.data?.data ? <FlatList
        data={activeOrders?.data?.data}
        ItemSeparatorComponent={<View
            style={{ height: 1, backgroundColor: "#d9d9d9", borderRadius: 400 }}
        />}
        keyExtractor={item => item.id}
        contentContainerStyle={{
            // marginBottom: 200
        }}
        ListEmptyComponent={
            <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                <Text style={{ padding: 20, marginTop: 5, fontSize: 15 }}>No active orders</Text>
            </View>
        }
        renderItem={({ item }) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        dispatch(setSimpleOrder(item))
                        navigation.navigate('recievedOrder', item)
                    }}
                >
                    <View>
                        <View style={{
                            flexDirection: 'row', padding: SPACING / 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 8,
                            shadowOffset: {
                                width: 0,
                                height: 10
                            },
                            shadowRadius: 20,
                            shadowColor: "#000",
                            shadowOpacity: 0.5
                        }}>
                            <Image
                                source={icons.destination}
                                style={{ width: AVATAR_SIZE / 2, height: AVATAR_SIZE / 2, marginRight: SPACING / 2 }}
                            />
                            <View style={{ flexDirection: 'column', paddingRight: SIZES.padding, marginRight: SIZES.padding }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.black }}>{item.data?.location?.address?.substring(item.data?.location?.address?.indexOf(',') + 1)}</Text>
                                {/* <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.secondary }}>Location1</Text> */}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SPACING / 2 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "47%" }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        source={icons.clock}
                                        style={{
                                            width: 16,
                                            height: 16,
                                            // tintColor: COLORS.primary,
                                            marginRight: 2,
                                            alignSelf: 'center'
                                        }}
                                    />
                                    <Text style={{ color: COLORS.black }}>{item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY HH:mm") : "-"}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', width: '47%', justifyContent: 'flex-end' }}>
                                {/* <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={icons.clock}
                                        style={{
                                            width: 16,
                                            height: 16,
                                            // tintColor: COLORS.primary,
                                            marginRight: 2,
                                            alignSelf: 'center'
                                        }}
                                    />
                                    <Text style={{ color: COLORS.black }}>{item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY HH:mm") : "-"}</Text>
                                </View> */}
                                <Image
                                    source={item.paymentType === 'CASH' ? icons.cash : icons.credit_card}
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }}
    /> : <Text>No active orders</Text>}</View>

    const deliveredOrdersList = <View style={{ flex: 1 }}>{deliveredOrders?.data?.data ? <FlatList
        data={deliveredOrders?.data?.data}
        ItemSeparatorComponent={<View
            style={{ height: 1, backgroundColor: "#d9d9d9", borderRadius: 400 }}
        />}
        keyExtractor={item => item.id}
        contentContainerStyle={{
            // marginBottom: 200
        }}
        ListEmptyComponent={
            <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                <Text style={{ padding: 20, marginTop: 5, fontSize: 15 }}>No completed orders yet</Text>
            </View>
        }
        renderItem={({ item }) => {
            return (
                <View>
                    <View style={{
                        flexDirection: 'row', padding: SPACING / 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 8,
                        // elevation: 5,
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        shadowRadius: 20,
                        shadowColor: "#000",
                        shadowOpacity: 0.5
                    }}>
                        <Image
                            source={icons.destination}
                            style={{ width: AVATAR_SIZE / 2, height: AVATAR_SIZE / 2, marginRight: SPACING / 2 }}
                        />
                        <View style={{ flexDirection: 'column', paddingRight: SIZES.padding, marginRight: SIZES.padding }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.black }}>{item.data?.location?.address?.substring(item.data?.location?.address?.indexOf(',') + 1)}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SPACING / 2 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "47%" }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={icons.clock}
                                    style={{
                                        width: 16,
                                        height: 16,
                                        // tintColor: COLORS.primary,
                                        marginRight: 2,
                                        alignSelf: 'center'
                                    }}
                                />
                                <Text style={{ color: COLORS.black }}>{item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY HH:mm") : "-"}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', width: '47%', justifyContent: 'flex-end' }}>
                            <Image
                                source={item.paymentType === 'CASH' ? icons.cash : icons.credit_card}
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                        </View>
                    </View>
                </View>
            )
        }}
    /> : <Text>No orders yet</Text>}</View>

    return (
        <>
            <Tab value={tabIndex} onChange={onChangeTab} dense>
                <Tab.Item titleStyle={{ color: COLORS.black }}
                    containerStyle={(active) => ({
                        backgroundColor: active ? COLORS.secondary : "#ed8f4c",
                    })}>{i18n.t("titles.active_orders")}</Tab.Item>
                <Tab.Item titleStyle={{ color: COLORS.black }}
                    containerStyle={(active) => ({
                        backgroundColor: active ? COLORS.secondary : "#ed8f4c",
                    })}
                >{i18n.t("titles.delivered_orders")}</Tab.Item>
            </Tab>
            <TabView value={tabIndex} onChange={onChangeTab} animationType="spring">
                <TabView.Item style={{ flex: 1, justifyContent: 'center' }}>
                    {activeOrders.isLoading ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        </View>
                        : <View style={{ flex: 1, backgroundColor: '#fff', }}>{activeTab}</View>
                    }
                </TabView.Item>
                <TabView.Item style={{ flex: 1, justifyContent: 'center' }}>
                    {deliveredOrders.isLoading ?
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        </View>
                        : <View style={{ flex: 1, backgroundColor: '#fff', }}>{deliveredOrdersList}</View>
                    }
                </TabView.Item>
            </TabView>
        </>
    )
}

export default FulfilledOrders

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding
    },
    headerText: {
        fontSize: SIZES.h3,
        alignSelf: 'center',
        color: COLORS.black,
        fontWeight: '500'
    },
})