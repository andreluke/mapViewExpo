import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getContacts } from '../services/contactService';
import { IContact } from '../types/IContact';

interface ContactContextData {
  contacts: IContact[];
  loadContacts: () => Promise<void>;
}

export const ContactContext = createContext<ContactContextData>({} as ContactContextData);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  const loadContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, loadContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
