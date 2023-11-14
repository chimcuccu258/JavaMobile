import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { windowHeight } from '../utils/dimession'

const BottomTabs = () => {
  return (
    <View style={styles.container}>
      <Text>BottomTabs</Text>
    </View>
  )
}

export default BottomTabs

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    padding: windowHeight * 0.04,
  }
})