import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../utils/dimession'

const Advertisement = () => {
  const data = [
    {
      id: 1,
      image: require('../assets/images/ads/ad_1.jpg'),
    },
    {
      id: 2,
      image: require('../assets/images/ads/ad_2.jpg'),
    },
    {
      id: 3,
      image: require('../assets/images/ads/ad_3.jpg'),
    },
    {
      id: 4,
      image: require('../assets/images/ads/ad_4.jpg'),
    }
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <Image
            source={item.image}
            style={{ width: windowWidth * 0.94, height: windowHeight * 0.2, borderRadius: 10, objectFit: 'cover' }}
          />
        )}
      />
    </View>
  );
}

export default Advertisement

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: windowWidth * 0.94,
    height: windowHeight * 0.2,
    borderRadius: 10,
  }
})