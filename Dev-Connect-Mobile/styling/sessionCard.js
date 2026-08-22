import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    cardWrapper: {
        width: '100%',
        paddingHorizontal: 18,
        marginBottom: 14
    },

    card: {
        width: '100%',
        minHeight: 125,
        backgroundColor: '#101010',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2A2A2A',
        padding: 18,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden'
    },

    id: {
        color: '#FFFFFF',
        fontFamily: 'SemiBold',
        fontSize: 18,
        marginBottom: 10
    },

    detail: {
        fontFamily: 'Light',
        fontSize: 10,
        color: '#BDBDBD',
        marginBottom: 12
    },

    statusBar: {
        width: '100%',
        minHeight: 28,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF'
    },

    status: {
        fontFamily: 'SemiBold',
        fontSize: 9,
        color: '#101010'
    }
})