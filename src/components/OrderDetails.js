import { StyleSheet, Text, View, FlatList, Image, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { ListItem, Divider } from "@rneui/themed";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BASE_API_URL } from '@env'
import { useSelector } from 'react-redux';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import i18n from '../../i18n';

const OrderInfo = () => {
    // console.log('orderInfo: ', orderInfo);
    const orderInfo = useSelector(state => state.orderList.simpleOrder)
    const [expanded, setExpanded] = useState(false)
    const totalQuantity = orderInfo?.data?.products?.reduce((accumulator, value) => {
        return accumulator + value.quantity;
    }, 0);
    // console.log("totalQuantity: ", totalQuantity);
    return (

        <View style={styles.container}>
            <Text style={styles.textStyle}>{i18n.t('address')}: {orderInfo?.data?.location?.address?.substring(orderInfo.data?.location?.address?.indexOf(',') + 1)}</Text>
            <Text style={styles.textStyle}>{i18n.t('total_summ')}: {orderInfo?.total} (RUB)</Text>
            <Text style={styles.textStyle}>{i18n.t('total_products_quantity')}: {totalQuantity}</Text>
            <Text style={styles.textStyle}>{i18n.t('payment_type')}: {orderInfo?.paymentType}</Text>
            <Text style={styles.textStyle}>{i18n.t('payment_status')}: {orderInfo?.paymentStatus}</Text>
            <ListItem.Accordion
                content={
                    <>
                        <Feather name="package" size={24} color={COLORS.primary} style={{ marginRight: SIZES.padding }} />
                        <ListItem.Content>
                            <ListItem.Subtitle style={{ ...FONTS.h4 }}>{i18n.t('products')}</ListItem.Subtitle>
                        </ListItem.Content>
                    </>
                }
                icon={<Ionicons name={'chevron-down'} size={25} type="material-community" />}
                isExpanded={expanded}
                bottomDivider={true}
                onPress={() => {
                    setExpanded(!expanded);
                }}
            >
                {orderInfo?.data?.products?.map((item, i) => {
                    return (
                        <React.Fragment key={i}>
                            <View key={i} style={{ flexDirection: 'row', padding: SIZES.padding }} >
                                <Image
                                    source={{ uri: `${BASE_API_URL}${item.product?.image}` }}
                                    resizeMode='contain'
                                    style={{
                                        width: 50,
                                        height: 50,
                                        marginRight: SIZES.padding
                                    }}
                                />
                                <View>
                                    <Text>{i18n.t('name')}: {item.product?.name}</Text>
                                    <Text>{i18n.t('price')}: {item.price} (RUB)</Text>
                                    <Text>{i18n.t('quantity')}: {item.quantity}</Text>
                                </View>
                            </View>
                            <Divider />
                        </React.Fragment>
                    )
                })}
                {/* <FlatList
                        data={orderInfo?.data?.products}
                        ItemSeparatorComponent={<View
                            style={{ height: 1, backgroundColor: "#d9d9d9", borderRadius: 400 }}
                        />}
                        ListFooterComponent={<View style={{ height: 20 }} />}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={{ uri: `${BASE_API_URL}${item.product?.image}` }}
                                        resizeMode='contain'
                                        style={{
                                            width: 50,
                                            height: 50,
                                            marginRight: SIZES.padding
                                        }}
                                    />
                                    <View>
                                        {console.log("item: ", item)}
                                        <Text>Name: {item.product?.name}</Text>
                                        <Text>Price: {item.price} (RUB)</Text>
                                        <Text>Quantity: {item.quantity}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    /> */}
            </ListItem.Accordion >
        </View >
    )
}

export default OrderInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: COLORS.black,
        // marginBottom: 20
        // backgroundColor: COLORS.darkgray
    },
    textStyle: {
        fontSize: 16,
        // borderWidth: 1,
        // borderColor: COLORS.secondary,
        // marginVertical: SIZES.padding,
        padding: SIZES.padding
    }
})