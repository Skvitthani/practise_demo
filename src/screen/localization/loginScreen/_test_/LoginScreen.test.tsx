import React from 'react';
import LoginScreen from '../LoginScreen';
import {fireEvent, render} from '@testing-library/react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

const component = (
  <LoginScreen
    navigation={{navigate: jest.fn()} as any}
    route={undefined as any}
  />
);

describe('LoginScreen', () => {
  test('renders correctly', () => {
    const {toJSON} = render(component);
    expect(toJSON()).toMatchSnapshot();
  });
  it('name text input', () => {
    const {getByTestId} = render(component);
    const container = getByTestId('name_input_text');
    fireEvent.changeText(container);
  });
  it('password text input', () => {
    const {getByTestId} = render(component);
    const container = getByTestId('password_input_text');
    fireEvent.changeText(container);
  });
  it('select language button', () => {
    const {getByTestId} = render(component);
    const container = getByTestId('select_language_button');
    fireEvent.press(container);
  });
  it('create account screen press', () => {
    const {getByTestId} = render(component);
    const container = getByTestId('create_account_screen_press');
    fireEvent.press(container);
  });
  it('select language', () => {
    const {getByTestId} = render(component);
    const container = getByTestId('select_language_button');
    fireEvent.press(container);
  });
});
