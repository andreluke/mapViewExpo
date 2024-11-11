import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createApi, getBackendUrl } from '../../services/api';

describe('Testes de Configuração da API', () => {
  let mock: MockAdapter;
  let api: any;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    api = createApi(getBackendUrl());
  });

  afterEach(() => {
    mock.restore();
  });

  it('deve criar uma instância do axios com a URL base correta', async () => {
    const baseUrl = getBackendUrl();
    mock.onGet(`${baseUrl}/test-endpoint`).reply(200, { message: 'Success' });
    const response = await api.get('/test-endpoint');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'Success' });
    expect(mock.history.get.length).toBe(1);
  });

  it('deve usar a URL base padrão quando nenhuma variável de ambiente estiver configurada', () => {
    delete process.env.EXPO_PUBLIC_BACKEND_URL;
    const defaultUrl = getBackendUrl();
    expect(defaultUrl).toBe('http://localhost:3000');
  });

  it('deve lidar corretamente com requisições GET com respostas válidas', async () => {
    const baseUrl = getBackendUrl();
    mock.onGet(`${baseUrl}/data`).reply(200, { data: 'Test data' });
    const response = await api.get('/data');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ data: 'Test data' });
  });

  it('deve lidar com erros 404 de forma apropriada', async () => {
    const baseUrl = getBackendUrl();
    mock.onGet(`${baseUrl}/not-found`).reply(404, { error: 'Not found' });
    try {
      await api.get('/not-found');
    } catch (error) {
      const typedError = error as any;
      expect(typedError.response.status).toBe(404);
      expect(typedError.response.data).toEqual({ error: 'Not found' });
    }
  });

  it('deve lidar corretamente com requisições POST', async () => {
    const baseUrl = getBackendUrl();
    mock.onPost(`${baseUrl}/submit`).reply(201, { success: true });
    const response = await api.post('/submit', { data: 'Test' });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({ success: true });
  });

  it('deve lidar com respostas de erro em requisições POST', async () => {
    const baseUrl = getBackendUrl();
    mock.onPost(`${baseUrl}/submit`).reply(400, { error: 'Bad request' });
    try {
      await api.post('/submit', { data: 'Test' });
    } catch (error) {
      const typedError = error as any;
      expect(typedError.response.status).toBe(400);
      expect(typedError.response.data).toEqual({ error: 'Bad request' });
    }
  });
});
