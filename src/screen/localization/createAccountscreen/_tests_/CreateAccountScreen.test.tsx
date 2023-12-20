import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import CreateAccountScreen from '../CreateAccountScreen';

const component = (
  <CreateAccountScreen
    navigation={
      {navigate: jest.fn(), goBack: jest.fn(), canGoBack: jest.fn()} as any
    }
    // navigation={{navigate: jest.fn() goBack} as any}
    route={undefined as any}
  />
);

describe('CreateAccountscreen', () => {
  test('renders correctly', () => {
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
