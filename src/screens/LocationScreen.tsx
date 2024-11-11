import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Importe o tipo RootStackParamList
import { RouteProp } from '@react-navigation/native';

// Defina o tipo de navegação para a tela
type LocationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Location'>;
type LocationScreenRouteProp = RouteProp<RootStackParamList, 'Location'>;

interface Props {
  navigation: LocationScreenNavigationProp;
  route: LocationScreenRouteProp;
}

export const LocationScreen:React.FC<Props> =({ navigation, route }) => {
  const { contact } = route.params;
  const [userLocation, setUserLocation] =  useState<Location.LocationObjectCoords | null>(null);;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da permissão de localização para exibir o mapa.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: contact.latitude,
          longitude: contact.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: contact.latitude, longitude: contact.longitude }}
          title={contact.name}
        />
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Você está aqui"
            pinColor="blue"
          />
        )}
      </MapView>
    </View>
  );
};
