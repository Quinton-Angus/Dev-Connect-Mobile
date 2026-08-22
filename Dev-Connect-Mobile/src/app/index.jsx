import { Text, View, Pressable, Image, ScrollView, Animated, Easing, BackHandler } from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import mainStyles from "../../styling/main.js"
import sessionCardStyles from "../../styling/sessionCard.js"
import getSessionData from "../scripts/getSessionData.js"
import notificationHnadler from '../scripts/notification.js'
import DevAlert from "../components/DevAlert.jsx"

import logo from "../../assets/logo.png"
import reloadIcon from "../../assets/reloadIcon.png"
import exitIcon from "../../assets/exitIcon.png"

function formatDateTime(value) {
  if (!value) return 'N/A'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'N/A'
  return date.toLocaleString()
}

function formatDuration(session) {
  if (session.status === 'EXPIRED') return '5mins'

  const start = new Date(session.createdAt)
  const end = session.endedAt ? new Date(session.endedAt) : new Date()
  const milliseconds = end - start

  if (Number.isNaN(milliseconds) || milliseconds < 0) return 'N/A'

  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}min ${seconds}s`
}

export default function Index() {

  const nodeAnimation = useRef(new Animated.Value(0)).current

  const [ loading, setLoading ] = useState(false)
  const [ sessionData, setSessionData ] = useState([])
  const [ alertData, setAlertData ] = useState({ visible: false, title: '', message: '', buttons: [] })

  const getStatusColour = (status) => {
    switch (String(status).toUpperCase()) {
      case 'PENDING':
        return '#D8C7A3'
      case 'EXPIRED':
        return '#E0A6A6'
      case 'TERMINATED':
        return '#A9C9B8'
      default:
        return '#C4C4C4'
    }
  }

  function showAlert(title, message, buttons = [{ text: 'Dismiss' }]) {
    setAlertData({ visible: true, title, message, buttons: buttons.map(button => ({ ...button, onPress: () => { setAlertData(current => ({ ...current, visible: false })); button.onPress?.() } })) })
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
          Animated.timing(nodeAnimation, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: false
          }),
          Animated.timing(nodeAnimation, {
              toValue: 0,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: false
          })
      ])
    ).start()
  }, [])

  async function mountSessions() {
    setLoading(true)

    try {
      const sessions = await getSessionData()

      if (sessions.error) {
        showAlert("Failed to load sessions", String(sessions.error), [
          { text: 'Dismiss', primary: false },
          { text: 'Retry', onPress: mountSessions }
        ])
        return
      }

      const JSX = sessions.data.map(session => (
        <View style={sessionCardStyles.cardWrapper} key={session.id}>
          <View style={sessionCardStyles.card}>
            <Text style={sessionCardStyles.id}>#{session.id}</Text>
            <Text style={sessionCardStyles.detail}>Started: {formatDateTime(session.createdAt)}</Text>
            <Text style={sessionCardStyles.detail}>Ended: {formatDateTime(session.endedAt)}</Text>
            <Text style={sessionCardStyles.detail}>Duration: {formatDuration(session)}</Text>
            <View style={[sessionCardStyles.statusBar, { backgroundColor: getStatusColour(session.status) }]}><Text style={sessionCardStyles.status}>{session.status}</Text></View>
          </View>
        </View>
      ))

      setSessionData(JSX)
    } catch (error) {
      showAlert("Unexpected error", String(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    notificationHnadler(showAlert)
    mountSessions()
  }, [])

  return (
    <SafeAreaView style={mainStyles.container}>
      <View style={mainStyles.header}>
        <Pressable onPress={() => BackHandler.exitApp()} hitSlop={10}>
          <Image style={mainStyles.exitIcon} source={exitIcon} />
        </Pressable>
        <Image style={mainStyles.primaryLogo} source={logo} />
        <Pressable onPress={mountSessions} hitSlop={10}>
          <Image style={mainStyles.reloadIcon} source={reloadIcon} />
        </Pressable>
      </View>
      <View style={mainStyles.content}>
        <View style={[mainStyles.loadingContainer, {display: loading ? 'flex' : 'none'}]}>
          <View style={mainStyles.nodeWrapper}>
            <Animated.View style={[mainStyles.loadingNode, {backgroundColor: nodeAnimation.interpolate({inputRange:[0,1], outputRange: ['#0B0B0B','#FFFFFF']})}]} />
            <Animated.View style={[mainStyles.loadingNode, {backgroundColor: nodeAnimation.interpolate({inputRange:[0,1], outputRange: ['#0B0B0B','#FFFFFF']})}]} />
            <Animated.View style={[mainStyles.loadingNode, {backgroundColor: nodeAnimation.interpolate({inputRange:[0,1], outputRange: ['#0B0B0B','#FFFFFF']})}]} />
          </View>
        </View>
        <View style={[mainStyles.sessionContainer, {display: loading ? 'none' : 'flex'}]}>
          <ScrollView
            style={mainStyles.sessionScroll}
            contentContainerStyle={mainStyles.sessionScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {sessionData}
          </ScrollView>
        </View>
      </View>
      <View style={mainStyles.footer}><Text style={mainStyles.copyright}>Dev Connect, © Quinton DEV 2026</Text></View>
      <DevAlert
        visible={alertData.visible}
        title={alertData.title}
        message={alertData.message}
        buttons={alertData.buttons}
      />
    </SafeAreaView>
  );
}