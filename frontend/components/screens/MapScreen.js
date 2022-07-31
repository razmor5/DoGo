import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import firebase from 'firebase';
import url from '../../BaseURL'
import axios from 'axios';


const MapScreen = (props) => {

  const [mapRegion, setmapRegion] = useState(null);
  const [user, setUser] = useState(null);
  const [myLocationButton, setMyLocationButton] = useState(false);
  const [status, setStatus] = useState('')
  const [location, setLocation] = useState(null);
  const [gardens, setGardens] = useState([]);
  const [filteredGardens, setFilteredGardens] = useState([]);
  const [splitScreen, setSplitScreen] = useState(false);
  const [autocomplete, setAutocomplete] = useState(false);
  const [searchBar, setSearchBar] = useState("")
  // firebase.auth().signOut()

  const fetchGardens = async () => {
    const res = require('../../db.json')
    const data = res.gardens
    return data
  }

  useEffect(() => {
    const getGardens = async () => {
      axios.get(`${url}/gardens`)
        .then(response => {
          // console.log("maps", response.data.gardens)
          setGardens(response.data.gardens)
        }
        )
        .catch(err => console.log("mapsError", err.message))
      // const gardensFromServer = await fetchGardens()
    }
    getGardens()

  }, [])

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
    Keyboard.dismiss()
    setAutocomplete(false)
    setSplitScreen(true)
    setGardens(prevState => prevState.map(garden => garden._id === gardenId ? { ...garden, pressed: true } : { ...garden, pressed: false }))
  }

  const closeById = (gardenId) => {
    setSplitScreen(false)
    setGardens(prevState => prevState.map(garden => garden._id === gardenId ? { ...garden, pressed: false } : garden))
  }

  const closeAllGardens = () => {
    setSplitScreen(false)
    setGardens(prevState => prevState.map(garden => { return { ...garden, pressed: false } }))

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
          new Promise((resolve) => setTimeout(resolve, 1000))
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
          // console.log("this is value", value);
          // Both resolve, but promise2 is faster
        });
        // console.log("working")
        // setLocation(location);
        // setmapRegion({
        //   latitude: location.coords.latitude,
        //   longitude: location.coords.longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // })
      }

    })();
    (async () => {
      let uid = firebase.auth().currentUser.uid
      setTimeout(() => {

        let data = JSON.stringify({
          userID: uid,
        })
        let config =
        {
          method: 'post',
          url: `${url}/users/sign-in`,
          headers: {
            "Content-Type": "application/json"
          },
          data: data
        }
        // let config =
        // {
        //   method: "post",
        //   url: `${url}/users/sign-up`,
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   data: JSON.stringify({
        //     email: "eeeee@j.com",
        //     name: "name",
        //     dogsName: "dogName",
        //     dogsBreed: "dogBreed",
        //     dogsGender: "gender",
        //     userID: "userCredential.user.uid"
        //   })
        // }
        // console.log(config)
        axios(config)
          .then(response => {
            setUser({
              name: response.data.user.name,
              id: response.data.user.id,
              email: response.data.user.email,
              dogs: response.data.user.dogs
            })
          })
          .catch(error => {
            console.log(error, error.message)
          })
      }, 2000)
    })()
    // watch_location()
  }, []);
  if (mapRegion && user) {

    return (
      <View style={styles.container}>

        <View style={styles.lineWrapper}>
          <Header contrast fontSize={windowHeight * 0.05}>Search</Header>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                closeAllGardens()
                props.navigation.navigate('Check Out', { user: user, setUser: setUser, setGardens: setGardens })
              }} contrast
              borderRadius={50}
              title="Check Out"
              width={windowWidth * 0.23} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                closeAllGardens()
                props.navigation.navigate('My Dogs', { user: user, setUser: setUser, setGardens: setGardens })
              }}
              borderRadius={50}
              title="My Dogs"
              width={windowWidth * 0.2} />
          </View>
        </View>
        <View style={styles.wrapper}>
          {/* <View style={styles.inputContainer}>
            <Input
              labelValue={searchBar}
              onChangeText={input => {
                setSearchBar(input)
              }}
              // unvalid={!nameValid}
              placeholderText="Search"
              width={windowWidth * 0.9}
            />
          </View> */}

          {gardens.map((garden) => {
            if (garden.pressed) {
              return <GardenInformation
                closeAll={closeAllGardens}
                markerPressed={markerPressed}
                user={user}
                setUser={setUser}
                // gardens={gardens}
                setGardens={setGardens}
                id={garden._id}
                key={garden._id}
                closeById={() => { closeById(garden._id) }}
                title={garden.name}
                users={garden.users}
                amount={garden.users.length}
              />
            }
          })}

          <MapView
            provider={PROVIDER_GOOGLE}
            Region={mapRegion}
            initialRegion={mapRegion}
            followsUserLocation={myLocationButton}
            showsUserLocation={myLocationButton}
            showsMyLocationButton={myLocationButton}
            showsCompass={true}
            toolbarEnabled={true}
            zoomEnabled={true}
            rotateEnabled={true}
            style={{
              ...styles.map,
              height: splitScreen ? '28%' : '80%'
            }}
          >

            {gardens.map((garden) => {
              return (<MapView.Marker
                key={garden._id}
                // title={garden.address}
                // description={garden.description}
                coordinate={{ latitude: parseFloat(garden.coords.latitude), longitude: parseFloat(garden.coords.longitude) }}
                onPress={() => {
                  markerPressed(garden._id)
                }}
              // onSelect={() => { console.log("pressed") }}
              >
                <CustomMarker />
              </MapView.Marker>)
            })}
          </MapView>
        </View>
        <View style={{
          ...styles.autocomplete,
          // maxHeight: autocomplete ? (windowHeight * 0.075) * 3 : windowHeight * 0.075,
          maxHeight: (windowHeight * 0.075) * 3,
          // borderBottomWidth: 1.5,
        }}>
          <Input
            labelValue={searchBar}
            onChangeText={input => {
              if (input.length >= 2) {
                setAutocomplete(true)
                setFilteredGardens(gardens.filter(garden => garden.name.includes(input)))
              }
              else {
                setAutocomplete(false)
                setFilteredGardens([])
              }
              setSearchBar(input)
            }}
            // unvalid={!nameValid}
            placeholderText="Search"
            width="100%"
            containerStyle={{
              borderWidth: 0,
              marginTop: 0,
              borderBottomWidth: autocomplete ? 1 : 0,
            }}
          />
          {
            autocomplete &&
            <ScrollView>
              {filteredGardens.map(garden =>
                <Button
                  onPress={() => {
                    markerPressed(garden._id)
                  }}
                  // contrast
                  key={garden._id}
                  title={garden.name}
                  width="100%"
                  style={{
                    // justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginTop: 0,
                    borderRadius: 0,
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderColor: "rgba(50,50,50,0.3)",

                  }}
                  textStyle={{
                    paddingRight: 10,
                    paddingLeft: 10,
                  }}
                />
              )}
            </ScrollView>
          }
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
  },
  wrapper: {
    alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    alignItems: 'center',
    marginTop: windowHeight * 0.12,
    width: '90%',
    height: '80%',
  },
  lineWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    paddingTop: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10
    // borderWidth: 1.5,
    // borderRadius: 3,
    // borderColor: 'black',
  },
  autocomplete: {
    width: windowWidth * 0.9,
    backgroundColor: 'white',
    position: 'absolute',
    top: (windowHeight * 0.15),
    borderWidth: 1.5,
    borderRadius: 3,
    borderColor: 'black',
    // top: 100,
    right: (windowWidth - (windowWidth * 0.9)) / 2
  }
})

export default MapScreen