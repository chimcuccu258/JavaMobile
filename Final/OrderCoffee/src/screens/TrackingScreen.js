import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const TrackingScreen = ({route, navigation}) => {
  const [region, setRegion] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [secondMarkerCoordinate, setSecondMarkerCoordinate] = useState({
    latitude: 12.240746,
    longitude: 109.19629,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        zoomControlEnabled={true}
        mapType="satellite">
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
        <Marker
          coordinate={secondMarkerCoordinate}
          pinColor="red"
          title="Second Marker"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default TrackingScreen;
