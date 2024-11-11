import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContactProvider } from './src/contexts/ContactContext';
import { ContactsScreen } from './src/screens/ContactsScreen';
import { ContactFormScreen } from './src/screens/ContactFormScreen';
import { LocationScreen } from './src/screens/LocationScreen';
import { Home } from './src/screens/Home';
import { IContact } from './src/types/IContact';

export type RootStackParamList = {
  Home: undefined;
  Contacts: undefined;
  ContactForm: undefined;
  Location: { contact: IContact };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ContactProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{headerShown: false,}} component={Home} />
          <Stack.Screen name="Contacts" options={{title: "Contatos", headerLeft: () => null}} component={ContactsScreen} />
          <Stack.Screen name="ContactForm" options={{title: "Cadastro de contato"}} component={ContactFormScreen} />
          <Stack.Screen name="Location" options={{title: "Localização"}} component={LocationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
}
