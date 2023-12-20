/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {it} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react-native';

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: 'mocked-Navigator',
    Screen: 'mocked-Screen',
  }),
}));

jest.mock('react-native-video', () => jest.fn());
jest.mock('react-native-vision-camera', () => jest.fn());
jest.mock('@react-native-camera-roll/camera-roll', () => jest.fn());
jest.mock('react-native-linear-gradient', () => jest.fn());
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const component = <App />;

describe('App describe', () => {
  it('renders correctly', () => {
    const container = render(component);
    expect(container.toJSON()).toMatchSnapshot();
  });
});
