import { StyleSheet, Text, View, FlatList, Image, Switch, StatusBar, ActivityIndicator, Platform } from 'react-native'
// import { Header } from '@rneui/themed';
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { COLORS, icons, SIZES } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { OrderDetails, TextButton } from '../../components'
import { useGetOrdersQuery, useUpdateOrderMutation, orderApi } from '../../redux/services/orderApi'
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useSelector, useDispatch } from 'react-redux'
import { setSimpleOrder } from '../../redux/slices/orderListSlice'
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment/moment'
import i18n from '../../../i18n'

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const orderInfo = useSelector(state => state.orderList)
    const lang = useSelector(state => state.user.user.lang)
    const { data, error, isLoading, isError } = useGetOrdersQuery("INPROGRESS", { pollingInterval: 5000 })
    const [updateOrder] = useUpdateOrderMutation()
    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ['50%'], []);
    const [isOpenSheet, setIsOpenSheet] = useState(false)
    // console.log('orderList: ', data?.data[0]);
    // console.log('isLoading: ', isLoading);
    // const [isEnabled, setIsEnabled] = useState(false);
    // const [orderList, setOrderList] = useState(data?.data)
    const SPACING = 20;
    const AVATAR_SIZE = 80;
    // const toggleSwitch = switchValue => {
    //     setIsEnabled(previousState => !previousState);
    //     if (switchValue) {
    //         setOrderList(data?.data)
    //     } else {
    //         setOrderList([])
    //     }
    // }
    // const handleSheetChanges = useCallback((index) => {
    //     console.log('handleSheetChanges', index);
    // }, []);

    const handleSnapPress = useCallback(index => {
        bottomSheetRef.current?.snapToIndex(index)
        setIsOpenSheet(true)
    },)
    // if (isError) {
    //     return (<View style={{ flex: 1, justifyContent: 'center' }}>
    //         <Text>{error}</Text>
    //     </View>)
    // }
    // if (isLoading) {
    //     return (<View style={{ flex: 1, justifyContent: 'center' }}>
    //         <ActivityIndicator size="large" color={COLORS.primary} />
    //     </View>)
    // }

    const acceptOrder = () => {
        if (orderInfo.simpleOrder) {
            bottomSheetRef.current.close()
            dispatch(orderApi.endpoints.getActiveOrders.initiate(1, { forceRefetch: true }))
            navigation.navigate('recievedOrder', orderInfo.simpleOrder)
            updateOrder({ id: orderInfo.simpleOrder.id, status: "ONTHEWAY" })
        }
    }
    // console.log('data: ', data);

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            < StatusBar barStyle="dark-content" backgroundColor="#ed8f4c" />
            <View style={{ flex: 1, backgroundColor: '#fff', opacity: isOpenSheet ? 0.5 : 1 }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{i18n.t('titles.new_orders')}</Text>
                </View>
                {isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                    :
                    <>
                        {data && data.data ?
                            <FlatList
                                data={data?.data}
                                // ItemSeparatorComponent={<View style={{ height: 1, backgroundColor: "#d9d9d9", borderRadius: 400 }} />}
                                ItemSeparatorComponent={
                                    Platform.OS === 'android' &&
                                    (({ highlighted }) => (
                                        <View
                                            // style={[style.separator, highlighted && { marginLeft: 0 }]}
                                            style={{ height: 1, backgroundColor: "#d9d9d9", borderRadius: 400 }}
                                        />
                                    ))
                                }
                                keyExtractor={item => item.id}
                                contentContainerStyle={{
                                    // marginBottom: 200
                                }}
                                ListEmptyComponent={
                                    <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                        <Text style={{ padding: 20, marginTop: 5, fontSize: 15 }}>Empty list</Text>
                                    </View>
                                }
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleSnapPress(0)
                                                dispatch(setSimpleOrder(item))
                                            }}
                                        >
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
                                                        {/* <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    source={icons.location}
                                                    style={{
                                                        width: 16,
                                                        height: 16,
                                                        tintColor: COLORS.primary,
                                                        marginRight: 2,

                                                    }}
                                                />
                                                <Text style={{ color: COLORS.black }}>12 km</Text>
                                            </View> */}
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
                            />
                            : <Text>No orders</Text>}
                    </>
                }
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                // onChange={handleSheetChanges}
                enablePanDownToClose
                onClose={() => setIsOpenSheet(false)}
            // backgroundComponent={<View style={{ flex: 1, backgroundColor: COLORS.darkgray }} />}
            // footerComponent={<View style={{ height: 20 }}><TouchableOpacity>Footer</TouchableOpacity></View>}
            >
                <BottomSheetScrollView>
                    <OrderDetails orderDetails={orderInfo.simpleOrder} />
                </BottomSheetScrollView>
                <TextButton
                    label={i18n.t("actions.take_order")}
                    onPress={acceptOrder}
                    buttonContainerStyle={styles.footerButton}
                />
            </BottomSheet>
        </SafeAreaView >
    )
}

export default Home

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
    bottomSheetContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: COLORS.darkgray,
    },
    bottomSheetContentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    footerButton: {
        height: 40,
        alignItems: 'center',
        // borderRadius: SIZES.radius,
        backgroudColor: COLORS.primary,
        // marginBottom: 25,
        // position: 'absolute',
        // bottom: 0
    }
})