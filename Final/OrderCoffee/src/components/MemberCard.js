import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../utils/dimession';

const MemberCard = ({userData}) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.memberName}>{userData.firstName} </Text>
          <Text style={styles.memberName}>{userData.lastName}</Text>
        </View>
        <Text style={styles.memberRank}>Ranking</Text>
      </View>
      <View style={styles.memberCode}>
        <Text>Point</Text>
      </View>
    </View>
  );
};

export default MemberCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.94,
    height: windowHeight * 0.18,
    backgroundColor: 'black',
    borderRadius: 16,
    padding: 15,
    justifyContent: 'space-between',
  },
  memberName: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  memberRank: {
    fontSize: 13,
    fontWeight: 'thin',
    color: 'white',
  },
  memberCode: {
    backgroundColor: 'white',
    height: windowHeight * 0.09,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
