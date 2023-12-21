import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import CreateAccountScreen from '../CreateAccountScreen';

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: jest.fn(key => key),
  }),
}));

const component = (
  <CreateAccountScreen
    navigation={
      {navigate: jest.fn(), goBack: jest.fn(), canGoBack: jest.fn()} as any
    }
    route={undefined as any}
  />
);

describe('CreateAccountscreen', () => {
  test('renders snap', () => {
    const {toJSON} = render(component);
    expect(toJSON()).toMatchSnapshot();
  });
  it('name text input', () => {
    const {getByTestId} = render(component);
    const container = getByTestId('name_text_input');
    fireEvent.changeText(container);
  });
  it('password text input', () => {
    const {getByTestId} = render(component);
    const container = getByTestId('password_text_input');
    fireEvent.changeText(container);
  });
  it('email text input', () => {
    const {getByTestId} = render(component);
    const container = getByTestId('email_text_input');
    fireEvent.changeText(container);
  });
  it('sign up button', () => {
    const {getByTestId} = render(component);
    const container = getByTestId('sign_up_button');
    fireEvent.press(container);
  });
});
