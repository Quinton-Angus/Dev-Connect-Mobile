import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#080808",
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginBottom: 50,
        height: 41
    },

    exitIcon: {
        width: 21,
        height: 21

    },

    primaryLogo: {
        height: 21,
        width: 125
    },

    reloadIcon: {
        width: 21,
        height: 21
    },

    content: {
        flex: 1
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'none'
    },

    sessionContainer: {
        flex: 1
    },

    sessionScroll: {
        flex: 1,
        gap: 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    footer: {
        width: '100%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },

    copyright: {
        fontFamily: 'Light',
        fontSize: 8,
        color: '#FFFFFF'
    },

    nodeWrapper: {
        gap: 20,
        flexDirection: 'row'
    },

    loadingNode: {
        width: 25,
        height: 25,
        borderRadius: 5,
        backgroundColor: '#D9D9D9'
    }
})

export default styles