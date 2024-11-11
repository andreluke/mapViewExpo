// ContactContext.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ContactProvider, ContactContext } from '../../contexts/ContactContext';
import { getContacts } from '../../services/contactService';
import { IContact } from '../../types/IContact';

jest.mock('../../services/contactService');

describe('ContactContext', () => {
  it('should render ContactProvider and provide context', async () => {
    const mockContacts: IContact[] = [{ id: '1', name: 'John Doe', address: '123 Main St', latitude: 0, longitude: 0 }];
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

    const { getByText } = render(
      <ContactProvider>
        <TestComponent />
      </ContactProvider>
    );

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
    });
  });

  it('should call loadContacts on mount', async () => {
    const mockContacts: IContact[] = [{ id: '1', name: 'John Doe', address: '123 Main St', latitude: 0, longitude: 0 }];
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