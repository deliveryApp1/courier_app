import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SIZES, COLORS } from '../../constants'
import { TextButton } from '../../components'
import i18n from '../../../i18n'
import { useSelector } from 'react-redux'

const Courier = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const lang = useSelector(state => state.user.user.lang)
    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>John Doe</Text>
                        <Text style={styles.info}>UX Designer / Mobile developer</Text>
                        <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                    </View>
                    <TouchableOpacity style={[styles.buttonContainer, { marginBottom: 20 }]} onPress={() => navigation.navigate("language")}>
                        <Text style={{ color: COLORS.white }}>{i18n.t("languages")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalVisible(true)}>
                        <Text style={{ color: COLORS.white }}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure, you want to logout?</Text>
                        <View style={{ flexDirection: 'row', marginTop: SIZES.padding }}>
                            <TextButton label="No" onPress={() => setModalVisible(false)} buttonContainerStyle={{ width: 60, backgroundColor: COLORS.secondary, borderRadius: 10, padding: 8, marginRight: 60 }} />
                            <TextButton label="Yes" buttonContainerStyle={{ width: 60, borderRadius: 10, padding: 8 }} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default Courier


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: "#ed8f4c",
        height: 150,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 80
    },
    name: {
        fontSize: 22,
        color: COLORS.darkgray,
        fontWeight: '600',
    },
    body: {
        // flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
        marginTop: 40,
        justifyContent: 'space-between'
    },
    bodyContent: {
        // flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        borderRadius: 30,
        backgroundColor: "#ed8f4c",
        alignSelf: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        // margin: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        justifyContent: 'space-between',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalText: {
        marginBottom: 20,
        textAlign: "center"
    }
});