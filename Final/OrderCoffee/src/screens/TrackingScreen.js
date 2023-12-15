import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Biker from '../assets/svg/Biker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {windowHeight, windowWidth} from '../utils/dimession';
import {colors} from '../assets/colors';
import StepIndicator from 'react-native-step-indicator';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

const TrackingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [doneSteps, setDoneSteps] = useState(false);

  const [region, setRegion] = useState({
    latitude: 12.240817,
    longitude: 109.196284,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  });

  const [secondMarkerCoordinate, setSecondMarkerCoordinate] = useState({
    latitude: 12.240817,
    longitude: 109.196284,
    // latitudeDelta: 0.06,
    // longitudeDelta: 0.06,
  });

  const [routeSegments, setRouteSegments] = useState([]);

  const [movingIconCoordinate, setMovingIconCoordinate] = useState({
    latitude: 12.240817,
    longitude: 109.196284,
    // latitudeDelta: 0.06,
    // longitudeDelta: 0.06,
  });

  const labels = [
    'Đang kiểm tra',
    'Đã xác nhận',
    'Đang giao hàng',
    'Đã nhận hàng',
  ];

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.mainColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.mainColor,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: colors.mainColor,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colors.mainColor,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 10,
    currentStepIndicatorLabelFontSize: 10,
    stepIndicatorLabelCurrentColor: colors.mainColor,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: colors.mainColor,
  };

  useEffect(() => {
    const jsonData = {
      type: 'FeatureCollection',
      metadata: {
        attribution: 'openrouteservice.org | OpenStreetMap contributors',
        service: 'routing',
        timestamp: 1702521426408,
        query: {
          coordinates: [
            [109.196284, 12.240817],
            [109.20131, 12.266775],
          ],
          profile: 'driving-car',
          format: 'json',
        },
        engine: {
          version: '7.1.0',
          build_date: '2023-12-10T05:30:50Z',
          graph_date: '2023-12-10T14:12:23Z',
        },
      },
      bbox: [109.194664, 12.239549, 109.20507, 12.268851],
      features: [
        {
          bbox: [109.194664, 12.239549, 109.20507, 12.268851],
          type: 'Feature',
          properties: {
            transfers: 0,
            fare: 0,
            segments: [
              {
                distance: 4734.4,
                duration: 530.2,
                steps: [
                  {
                    distance: 124.4,
                    duration: 12.8,
                    type: 11,
                    instruction: 'Head south on Đường Trần Phú',
                    name: 'Đường Trần Phú',
                    way_points: [0, 2],
                  },
                  {
                    distance: 166.9,
                    duration: 20,
                    type: 1,
                    instruction: 'Turn right onto Nguyễn Thi',
                    name: 'Nguyễn Thi',
                    way_points: [2, 3],
                  },
                  {
                    distance: 1564.9,
                    duration: 132.3,
                    type: 1,
                    instruction: 'Turn right onto Hùng Vương',
                    name: 'Hùng Vương',
                    way_points: [3, 22],
                  },
                  {
                    distance: 146.9,
                    duration: 13.2,
                    type: 13,
                    instruction: 'Keep right onto Pasteur',
                    name: 'Pasteur',
                    way_points: [22, 25],
                  },
                  {
                    distance: 84.5,
                    duration: 14.4,
                    type: 1,
                    instruction: 'Turn right onto Phan Chu Trinh',
                    name: 'Phan Chu Trinh',
                    way_points: [25, 27],
                  },
                  {
                    distance: 1808.5,
                    duration: 173,
                    type: 0,
                    instruction: 'Turn left onto Đường Trần Phú',
                    name: 'Đường Trần Phú',
                    way_points: [27, 55],
                  },
                  {
                    distance: 40.6,
                    duration: 5.3,
                    type: 6,
                    instruction: 'Continue straight onto Phạm Văn Đồng',
                    name: 'Phạm Văn Đồng',
                    way_points: [55, 57],
                  },
                  {
                    distance: 34.4,
                    duration: 8.2,
                    type: 1,
                    instruction: 'Turn right',
                    name: '-',
                    way_points: [57, 59],
                  },
                  {
                    distance: 348.8,
                    duration: 67.4,
                    type: 1,
                    instruction: 'Turn right',
                    name: '-',
                    way_points: [59, 81],
                  },
                  {
                    distance: 16.1,
                    duration: 2.9,
                    type: 3,
                    instruction: 'Turn sharp right',
                    name: '-',
                    way_points: [81, 82],
                  },
                  {
                    distance: 62.9,
                    duration: 11.3,
                    type: 12,
                    instruction: 'Keep left',
                    name: '-',
                    way_points: [82, 85],
                  },
                  {
                    distance: 111.3,
                    duration: 20,
                    type: 0,
                    instruction: 'Turn left',
                    name: '-',
                    way_points: [85, 87],
                  },
                  {
                    distance: 28.6,
                    duration: 5.2,
                    type: 1,
                    instruction: 'Turn right onto Đường Thanh Niên',
                    name: 'Đường Thanh Niên',
                    way_points: [87, 88],
                  },
                  {
                    distance: 12.4,
                    duration: 2.2,
                    type: 0,
                    instruction: 'Turn left',
                    name: '-',
                    way_points: [88, 89],
                  },
                  {
                    distance: 6.5,
                    duration: 1.2,
                    type: 1,
                    instruction: 'Turn right onto Đường Thanh Niên',
                    name: 'Đường Thanh Niên',
                    way_points: [89, 90],
                  },
                  {
                    distance: 117.2,
                    duration: 26.5,
                    type: 0,
                    instruction: 'Turn left',
                    name: '-',
                    way_points: [90, 97],
                  },
                  {
                    distance: 59.5,
                    duration: 14.3,
                    type: 1,
                    instruction: 'Turn right',
                    name: '-',
                    way_points: [97, 100],
                  },
                  {
                    distance: 0,
                    duration: 0,
                    type: 10,
                    instruction: 'Arrive at your destination, on the left',
                    name: '-',
                    way_points: [100, 100],
                  },
                ],
              },
            ],
            way_points: [0, 100],
            summary: {distance: 4734.4, duration: 530.2},
          },
          geometry: {
            coordinates: [
              [109.196442, 12.240835],
              [109.196465, 12.240636],
              [109.196585, 12.239725],
              [109.195059, 12.239549],
              [109.195016, 12.239881],
              [109.194989, 12.240093],
              [109.194937, 12.240464],
              [109.19486, 12.241062],
              [109.194701, 12.242316],
              [109.194688, 12.242415],
              [109.194664, 12.243243],
              [109.194707, 12.24577],
              [109.194745, 12.247628],
              [109.194776, 12.249357],
              [109.194829, 12.249698],
              [109.194942, 12.250214],
              [109.195098, 12.250808],
              [109.195173, 12.251126],
              [109.195223, 12.251395],
              [109.195286, 12.251741],
              [109.195504, 12.252652],
              [109.195665, 12.253361],
              [109.195673, 12.253504],
              [109.195751, 12.253657],
              [109.195931, 12.254325],
              [109.196039, 12.254772],
              [109.196706, 12.254619],
              [109.196795, 12.254593],
              [109.196842, 12.254731],
              [109.197034, 12.255316],
              [109.19723, 12.255915],
              [109.197516, 12.256748],
              [109.197524, 12.256769],
              [109.197626, 12.257024],
              [109.197846, 12.257542],
              [109.198081, 12.258226],
              [109.198556, 12.259674],
              [109.198565, 12.259702],
              [109.199884, 12.263674],
              [109.200116, 12.264356],
              [109.20022, 12.26461],
              [109.200344, 12.264832],
              [109.200482, 12.26503],
              [109.200707, 12.265295],
              [109.20096, 12.265511],
              [109.201136, 12.265634],
              [109.201599, 12.265894],
              [109.202006, 12.266035],
              [109.202395, 12.266132],
              [109.202984, 12.266256],
              [109.203946, 12.266416],
              [109.204205, 12.266492],
              [109.204351, 12.266566],
              [109.204649, 12.266793],
              [109.204788, 12.266932],
              [109.20507, 12.267297],
              [109.204996, 12.267344],
              [109.204815, 12.267128],
              [109.204708, 12.267209],
              [109.204587, 12.267341],
              [109.204608, 12.267363],
              [109.204608, 12.2674],
              [109.20457, 12.267649],
              [109.204548, 12.267894],
              [109.20451, 12.26806],
              [109.204454, 12.268208],
              [109.20437, 12.268312],
              [109.204302, 12.268365],
              [109.204099, 12.268532],
              [109.203904, 12.268667],
              [109.203771, 12.268724],
              [109.203461, 12.268835],
              [109.203094, 12.268851],
              [109.202919, 12.268846],
              [109.202742, 12.268815],
              [109.202694, 12.268787],
              [109.202671, 12.268789],
              [109.202607, 12.268831],
              [109.202565, 12.268826],
              [109.20251, 12.268794],
              [109.202494, 12.268718],
              [109.202505, 12.26869],
              [109.202357, 12.26869],
              [109.202294, 12.268641],
              [109.202036, 12.268632],
              [109.201796, 12.268624],
              [109.201831, 12.267713],
              [109.201832, 12.267624],
              [109.201568, 12.267615],
              [109.201586, 12.267505],
              [109.201526, 12.267503],
              [109.20153, 12.267255],
              [109.201536, 12.267045],
              [109.201552, 12.266999],
              [109.201639, 12.266927],
              [109.201933, 12.266894],
              [109.201999, 12.266866],
              [109.202015, 12.266791],
              [109.201828, 12.266783],
              [109.201653, 12.266811],
              [109.201488, 12.26689],
            ],
            type: 'LineString',
          },
        },
      ],
    };

    if (jsonData.features && jsonData.features.length > 0) {
      const segments = jsonData.features.map(feature => {
        return feature.geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
      });

      setRouteSegments(segments);
    }
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
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

  useEffect(() => {
    const totalTimeInSeconds = 30;
    const updatesPerSecond = 1;
    const totalUpdates = totalTimeInSeconds * updatesPerSecond;
    let updateCount = 0;

    const coordinates = [];
    routeSegments.forEach(segment => {
      segment.forEach(coord => {
        coordinates.push({
          latitude: coord.latitude,
          longitude: coord.longitude,
        });
      });
    });

    const totalSteps = routeSegments.length;

    const intervalId = setInterval(() => {
      const progress = updateCount / totalUpdates;

      const currentStepIndex = Math.floor(progress * totalSteps);
      setCurrentStep(currentStepIndex);

      const nextIndex = Math.floor(progress * coordinates.length);
      const nextCoordinate = coordinates[nextIndex];

      setMovingIconCoordinate(nextCoordinate);
    setCurrentStep(2);

      updateCount++;

      if (updateCount >= totalUpdates) {
        clearInterval(intervalId);
        setTimeout(() => {
          setDoneSteps(true);
          setCurrentStep(4);
        }, 5000);
      }
    }, 1000 / updatesPerSecond);

    return () => clearInterval(intervalId);
  }, [routeSegments]);

  //fetch TblBills, check field "status", if true then active step 2
  


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        zoomControlEnabled={true}
        mapType="satellite">
        {routeSegments.map((segment, index) => (
          <Polyline
            key={index}
            coordinates={segment}
            strokeWidth={3}
            strokeColor="orange"
          />
        ))}

        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
        <Marker coordinate={secondMarkerCoordinate}>
          <View
            style={{
              // width: 30,
              // height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Image
              source={require('../assets/images/tch.png')}
              style={{
                width: 25,
                height: 25,
                borderRadius: 50,
              }}
              resizeMode="contain"
            />
          </View>
        </Marker>

        <Marker coordinate={movingIconCoordinate}>
          <Biker />
        </Marker>
      </MapView>

      <View
        style={{
          position: 'absolute',
          width: windowWidth,
          height: 150,
          justifyContent: 'flex-end',
          paddingVertical: 10,
          backgroundColor: colors.white,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
          }}>
          Thông tin đơn hàng
        </Text>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentStep}
          labels={labels}
          stepCount={4}
        />
      </View>
    </ScrollView>
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
