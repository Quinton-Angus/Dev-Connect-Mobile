import * as Notifications from 'expo-notifications'
import { Alert, Platform } from 'react-native'

export default async function notificationHandler() {
    try {
        if (Platform.OS !== 'android') {
            return
        }

        await Notifications.setNotificationChannelAsync('default', {
            name: 'Default',
            importance: Notifications.AndroidImportance.MAX
        })

        const { status: existingStatus } = await Notifications.getPermissionsAsync()

        let finalStatus = existingStatus

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }

        if (finalStatus !== 'granted') {
            Alert.alert(
                'Notification permission denied',
                'Permission denied, you will not receive session notifications from Dev Connect.'
            )
            return
        }

        const token = (await Notifications.getExpoPushTokenAsync({
            projectId: '62b5faa0-585a-43e6-a37e-af3aaa4725d9'
        })).data

        if (!token) {
            Alert.alert(
                'Notification error',
                'Dev Connect could not obtain an Expo push token for this device.'
            )
            return
        }

        const registrar = await fetch(
            'https://api.quintondev.com/connect/notifications/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            }
        )

        let data = null
        try {
            data = await registrar.json()
        } catch {
            // Registration may legitimately return an empty 200 response.
        }

        if (!registrar.ok) {
            const error = data?.error ?? `HTTP ${registrar.status}`
            Alert.alert(
                'Notification error',
                `Dev Connect encountered an error while attempting to register this device for notifications.\n\n${error}`
            )
        }
    } catch (error) {
        Alert.alert(
            'Notification error',
            `Dev Connect could not set up notifications.\n\n${error instanceof Error ? error.message : String(error)}`
        )
    }
}