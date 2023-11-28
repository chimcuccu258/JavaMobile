import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../utils/dimession';

const MemberCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.memberName}>MemberCard</Text>
      <Text style={styles.memberRank}>Ranking</Text>
    </View>
  );
}

export default MemberCard

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.94,
    height: windowHeight * 0.17,
    backgroundColor: 'pink',
    borderRadius: 10,
    padding: 15,
  },
  memberName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  memberRank: {
    fontSize: 13,
    fontWeight: 'thin',
  },
});