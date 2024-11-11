// useContacts.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ContactProvider, ContactContext } from '../../contexts/ContactContext';
import { getContacts } from '../../services/contactService';
import { IContact } from '../../types/IContact';

jest.mock('../../services/contactService');

describe('useContacts', () => {
  it('deve renderizar ContactProvider e fornecer contexto', async () => {
    const mockContacts: IContact[] = [
      { id: '1', name: 'John Doe', address: '123 Main St', latitude: 40.7128, longitude: -74.0060 }
    ];
    (getContacts as jest.Mock).mockResolvedValue(mockContacts);

    const TestComponent = () => (
      <ContactContext.Consumer>
        {({ contacts }) => (
          <div>
            {contacts.map(contact => (
              <div key={contact.id}>{contact.name}</div>
            ))}
          </div>
        )}
      </ContactContext.Consumer>
    );

    render(
      <ContactProvider>
        <TestComponent />
      </ContactProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
    });
  });

  it('deve chamar loadContacts no mount', async () => {
    const mockContacts: IContact[] = [
      { id: '1', name: 'John Doe', address: '123 Main St', latitude: 40.7128, longitude: -74.0060 }
    ];
    (getContacts as jest.Mock).mockResolvedValue(mockContacts);

    render(
      <ContactProvider>
        <div />
      </ContactProvider>
    );

    await waitFor(() => {
      expect(getContacts).toHaveBeenCalled();
    });
  });
});