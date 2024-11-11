import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useContacts } from '../hooks/useContacts';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { deleteContact } from '../services/contactService';

type ContactsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Contacts'>;

interface Props {
  navigation: ContactsScreenNavigationProp;
}

export const ContactsScreen: React.FC<Props> = ({ navigation }) => {
  const { contacts, loadContacts } = useContacts();

  useFocusEffect(
    useCallback(() => {
      loadContacts(); // Atualiza a lista de contatos quando a tela ganhar o foco
    }, [loadContacts])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          
          <TouchableOpacity
              onPress={() => navigation.navigate('Location', { contact: item })} style={styles.contactCard}// Navega para a tela 'Location' passando o contato
            >
           <Text style={styles.contactName}>{item.name}</Text>
           <Text style={styles.contactAddress}>{item.address}</Text>
           <TouchableOpacity style={styles.removeButton} onPress={() => deleteContact(item.id)}>
           <Ionicons name="trash" size={16} color="white" />
           </TouchableOpacity>
           </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ContactForm')}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    gap: 4
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactAddress: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  removeButton:{
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#fa0009',
    borderRadius: 30,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  }
});
