import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const NewsExpand = () => {
  const navigation = useNavigation();
  
  return (
    <View>
      <Text>NewsExpand</Text>
    </View>
  )
}

export default NewsExpand