import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { windowHeight, windowWidth } from '../../Dimensions'
import Header from '../UI/Header';
import Input from '../UI/Input'
import Button from '../UI/Button'
import Loading from './Loading'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import CustomMarker from '../UI/CustomMarker';
import GardenInformation from '../UI/GardenInformation';

const MapScreen = () => {

  const [mapRegion, setmapRegion] = useState(null);
  const [myLocationButton, setMyLocationButton] = useState(false);
  const [status, setStatus] = useState('')
  const [location, setLocation] = useState(null);
  const [gardens, setGardens] = useState([
    {
      id: 0,
      address: 'ד"ר ראובן הכט 37-11, באר שבע',
      coords: {
        latitude: 31.274989,
        longitude: 34.818367
      },
      description: "גינה יפה ומטופחת, יש ספסלים וברזייה קרובה ונקי שם מאוד",
      pressed: false,
      amount: 21,
    }
  ]);

  // const watch_location = async () => {
  //   if (status === 'granted') {
  //     let location = await Location.watchPositionAsync({
  //       accuracy: Location.Accuracy.High,
  //       timeInterval: 1000,
  //       distanceInterval: 0,
  //     },
  //       false
  //       , (location_update) => {
  //         console.log('update location!', location_update.coords)
  //       }
  //     )
  //   }
  // }

  const markerPressed = (gardenId) => {
    setGardens(prevState => prevState.map(garden => garden.id === gardenId ? { ...garden, pressed: true } : { ...garden, pressed: false }))
  }

  const closeById = (gardenId) => {
    setGardens(prevState => prevState.map(garden => garden.id === gardenId ? { ...garden, pressed: false } : garden))
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('Permission to access location was denied');
        return;
      } else {
        console.log('Access granted!!')
        setStatus(status)
        let location
        Promise.race([
          Location.getCurrentPositionAsync({}),
          new Promise((resolve) => setTimeout(resolve, 5000))
        ]).then((value) => {
          if (value === undefined) {
            location = {
              coords: {
                latitude: 31.274989,
                longitude: 34.818367
              },
            }
          }
          else {
            setMyLocationButton(true)
            location = value
          }
          setLocation(location);
          setmapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
          console.log("this is value", value);
          // Both resolve, but promise2 is faster
        });
        console.log("working")
        // setLocation(location);
        // setmapRegion({
        //   latitude: location.coords.latitude,
        //   longitude: location.coords.longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // })
      }

    })();
    // watch_location()
  }, []);
  if (mapRegion) {

    return (
      <View style={styles.container}>
        <View style={styles.lineWrapper}>
          <Header contrast fontSize={windowHeight * 0.05}>Search</Header>
          <View style={styles.buttonContainer}>
            <Button
              // onPress={onPressHandler} 
              contrast
              borderRadius={50}
              title="Check Out"
              width={windowWidth * 0.23} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              // onPress={onPressHandler} 
              borderRadius={50}
              title="My Dogs"
              width={windowWidth * 0.2} />
          </View>
        </View>
        <View style={styles.wrapper}>
          {/* <TouchableOpacity onPress={() => { console.log(location) }}>
            <Text>pressssss</Text>
          </TouchableOpacity> */}
          <Input
            // labelValue={name}
            // onChangeText={input => {
            //   setName(input)
            //   setNameValid(true)
            // }}
            // unvalid={!nameValid}
            placeholderText="Search"
            width={windowWidth * 0.9}
          />
          {gardens.map((garden, i) => {
            if (garden.pressed) {
              return <GardenInformation
                closeById={() => { closeById(garden.id) }}
                title={garden.address}
                description={garden.description}
                amount={garden.amount}
              />
            }
          })}

          <MapView
            provider={PROVIDER_GOOGLE}
            Region={mapRegion}
            initialRegion={mapRegion}
            // initialRegion={
            //   {
            //     latitude: 31.274989,
            //     longitude: 34.818367,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            //   }
            // }
            followsUserLocation={myLocationButton}
            showsUserLocation={myLocationButton}
            showsMyLocationButton={myLocationButton}
            showsCompass={true}
            toolbarEnabled={true}
            zoomEnabled={true}
            rotateEnabled={true}
            style={styles.map}
          >
            {gardens.map((garden, i) => {
              return (<MapView.Marker
                key={i}
                // title={garden.address}
                // description={garden.description}
                coordinate={{ latitude: garden.coords.latitude, longitude: garden.coords.longitude }}
                onPress={() => { markerPressed(garden.id) }}
              // onSelect={() => { console.log("pressed") }}
              >
                <CustomMarker />
              </MapView.Marker>)
            })}
          </MapView>
        </View>
      </View >
    )
  }
  return <Loading />
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: windowHeight,
    width: windowWidth,
    padding: 10,
    // justifyContent: 'center',
  },
  wrapper: {
    alignItems: 'center'
    // justifyContent: 'center',
  },
  map: {
    // backgroundColor: 'green',
    // justifyContent: 'center',
    // flex: 1,
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    height: '80%',
    // zIndex: 1,
  },
  lineWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    paddingTop: 12,
  }
})

export default MapScreen