import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../utils/dimession';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Image} from 'react-native-svg';

const MemberCard = ({userData}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['rgba(122,122,122,1)', 'rgba(12,12,14,1)', 'rgba(8,8,8,1)']}
      useAngle={true}
      angle={129}
      angleCenter={{x: 0.3, y: 0.5}}
      style={styles.container}>
      <ImageBackground
        source={require('../assets/images/vector2.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 15}}>
            <Text style={styles.memberName}>{userData.firstName} </Text>
            <Text style={styles.memberName}>{userData.lastName}</Text>
          </View>
          <Text style={styles.memberRank}>Ranking</Text>
        </View>
        <View style={styles.memberCode}>
          <Text>Point</Text>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default MemberCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.03,
    width: windowWidth * 0.94,
    height: windowHeight * 0.2,
    backgroundColor: '#242424',
    borderRadius: 16,
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
    marginLeft: 15,
  },
  memberCode: {
    backgroundColor: 'white',
    height: windowHeight * 0.09,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 15,
  },
});
