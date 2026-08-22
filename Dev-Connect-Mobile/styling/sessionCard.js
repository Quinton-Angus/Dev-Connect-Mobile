import { width } from "@expo/ui/jetpack-compose/modifiers";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    cardWrapper: {
        width: '80%'
    },

    card: {
        width: '100%',
        height: 125,
        backgroundColor: '#101010',
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    id: {
        color: '#FFFFFF',
        fontFamily: 'SemiBold',
        fontSize: 15,
        marginBottom: 10
    },

    detail: {
        fontFamily: 'Light',
        fontSize: 8,
        color: '#FFFFFF',
        marginBottom: 5
    },

    statusBar: {
        width: '100%',
        height: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 20,
        backgroundColor: '#FFFFFF'
    },

    status: {
        fontFamily: 'SemiBold',
        fontSize: 8,
        color: '#101010'
    }
})