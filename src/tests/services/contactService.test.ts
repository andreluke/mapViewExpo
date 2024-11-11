// contactService.test.ts
import { getContacts, addContact, editContact, deleteContact } from '../../services/contactService';
import api from '../../services/api';

jest.mock('../../services/api');

describe('contactService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve buscar todos os contatos', async () => {
    const mockData = [{ id: '1', name: 'John Doe', email: 'john@example.com' }];
    (api.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getContacts();
    expect(api.get).toHaveBeenCalledWith('/');
    expect(result).toEqual(mockData);
  });

  it('Deve adicionar um novo contato', async () => {
    const newContact = { name: 'Jane Doe', address: '123 Main St', latitude: 0, longitude: 0 };
    const mockData = { id: '2', ...newContact };
    (api.post as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await addContact(newContact);
    expect(api.post).toHaveBeenCalledWith('/', newContact);
    expect(result).toEqual(mockData);
  });

  it('Deve editar um contato', async () => {
    const updatedContact = { id: '1', name: 'John Smith', address: '123 Main St', latitude: 0, longitude: 0 };
    const mockData = updatedContact;
    (api.put as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await editContact(updatedContact);
    expect(api.put).toHaveBeenCalledWith('/', updatedContact);
    expect(result).toEqual(mockData);
  });

  it('Deve deletar um contato', async () => {
    const id = '1';
    const mockData = { success: true };
    (api.delete as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await deleteContact(id);
    expect(api.delete).toHaveBeenCalledWith(`/?id=${id}`);
    expect(result).toEqual(mockData);
  });
});