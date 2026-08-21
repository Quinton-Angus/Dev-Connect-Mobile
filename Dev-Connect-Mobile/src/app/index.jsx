import { Text, View, Pressable, Image, ScrollView, Animated, Easing, Alert } from "react-native";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import mainStyles from "../../styling/main.js"
import sessionCardStyles from "../../styling/sessionCard.js"  
import getSessionData from "../scripts/getSessionData.js"

import logo from "../../assets/logo.png"
import reloadIcon from "../../assets/reloadIcon.png"
import exitIcon from "../../assets/exitIcon.png"


export default function Index() {

  const nodeAnimation = useRef(new Animated.Value(0)).current

  const [ loading, setLoading ] = useState(false)

  const [ sessionData, setSessionData ] = useState([])

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
        Alert.alert(
          "Failed to load sessions",
          String(sessions.error)
        )
        return
      }

      const JSX = sessions.data.map(session => (
        <View style={sessionCardStyles.cardWrapper} key={session.id}>
          <View style={sessionCardStyles.card}>
            <Text style={sessionCardStyles.id}>#{session.id}</Text>
            <Text style={sessionCardStyles.detail}>Started: {session.createdAt}</Text>
            <View style={sessionCardStyles.statusBar}><Text style={sessionCardStyles.status}>{session.status}</Text></View>
          </View>
        </View>
      ))

      setSessionData(JSX)
    } catch (error) {
      Alert.alert(
        "Unexpected error",
        String(error)
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    mountSessions()
  }, [])

  return (
    <SafeAreaView style={mainStyles.container}>
      <View style={mainStyles.header}>
        <Pressable><Image style={mainStyles.exitIcon} source={exitIcon} /></Pressable>
        <Image style={mainStyles.primaryLogo} source={logo} />
        <Pressable onPress={mountSessions}><Image style={mainStyles.reloadIcon} source={reloadIcon} /></Pressable>
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
          <ScrollView style={mainStyles.sessionScroll}>{sessionData}</ScrollView>
        </View>
      </View>
      <View style={mainStyles.footer}><Text style={mainStyles.copyright}>Dev Connect, © Quinton DEV 2026</Text></View>
    </SafeAreaView>
  );
}