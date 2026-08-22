import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useRef } from 'react'

export default function DevAlert({ visible, title, message, buttons = [] }) {
  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0.96)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 160,
        useNativeDriver: true
      }),
      Animated.spring(scale, {
        toValue: visible ? 1 : 0.96,
        useNativeDriver: true,
        damping: 18,
        stiffness: 220
      })
    ]).start()
  }, [visible, opacity, scale])

  if (!visible) return null

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Animated.View style={[styles.backdrop, { opacity }]} />
      <Animated.View style={[styles.dialog, { opacity, transform: [{ scale }] }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.actions}>
          {buttons.map((button, index) => (
            <Pressable
              key={`${button.text}-${index}`}
              onPress={button.onPress}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
              <Text style={[styles.buttonText, button.primary !== false && styles.primaryButtonText]}>
                {button.text}
              </Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000'
  },
  dialog: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#101010',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    padding: 22,
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'SemiBold',
    fontSize: 18,
    marginBottom: 10
  },
  message: {
    color: '#BDBDBD',
    fontFamily: 'Light',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 20
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10
  },
  button: {
    minHeight: 38,
    paddingHorizontal: 16,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#161616',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPressed: {
    opacity: 0.75
  },
  buttonText: {
    color: '#BDBDBD',
    fontFamily: 'SemiBold',
    fontSize: 11
  },
  primaryButtonText: {
    color: '#FFFFFF'
  }
})
