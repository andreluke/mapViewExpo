// Home.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Home } from '../../screens/Home';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

describe('Home', () => {
  it('deve renderizar corretamente', () => {
    const { getByText } = render(<Home />);
    
    expect(getByText('Bem-vindo ao App!')).toBeTruthy();
    expect(getByText('Iniciar')).toBeTruthy();
  });

  it('deve navegar para a tela Contacts quando o botão Iniciar é pressionado', () => {
    const navigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate });

    const { getByText } = render(<Home />);
    fireEvent.press(getByText('Iniciar'));

    expect(navigate).toHaveBeenCalledWith('Contacts');
  });
});