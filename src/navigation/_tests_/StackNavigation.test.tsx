import React from 'react';
import StackNavigation from '../StackNavigation';
import {render} from '@testing-library/react-native';

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: 'mocked-Navigator',
    Screen: 'mocked-Screen',
  }),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: jest.fn(),
}));
jest.mock('react-native-vision-camera', () => jest.fn());
jest.mock('@react-native-camera-roll/camera-roll', () => jest.fn());
jest.mock('react-native-video', () => jest.fn());
jest.mock('react-native-linear-gradient', () => jest.fn());
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('StackNavigation', () => {
  test('renders correctly', () => {
    const {toJSON} = render(<StackNavigation />);
    expect(toJSON()).toMatchSnapshot();
  });
});
