import * as notifications from 'expo-notifications';
import { Alert } from 'react-native'
import constants from 'expo-constants'
import { platform } from 'react-native'

export default async function notificationHnadler() {
    if (platform === 'android') {
        notifications.setNotificationChannelAsync('default', {
            name: "defualt",
            importance: notifications.AndroidImportance.MAX
        })

        const { status: existingStatus } = await notifications.getPermissionsAsync()

        let finalStatus = existingStatus

        if (existingStatus !== 'granted') {
            const { status } = await notifications.requestPermissionsAsync()

            let finalStatus = status
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Notification permission denied', 'Permission denied, you will not receive session notifications from dev connect')
            return
        }

        const token = await notifications.getExpoPushTokenAsync({projectId: '62b5faa0-585a-43e6-a37e-af3aaa4725d9'})

        const registar = await fetch('https://api.quintondev.com/connect/notification', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                token: token
            })
        })

        const data = await registar.json()

        if (data.error) {
            Alert.alert(`Notification error', 'Dev connect encountered an error while atempting to registar this device for notifications, error: ${data.error}`)
            return
        } else {
            return
        }

        
    }
}