import React from 'react';
import TicTokScreen from '../TicTokScreen';
import {render} from '@testing-library/react-native';

jest.mock('react-native-video', () => jest.fn());
jest.mock('react-native-linear-gradient', () => jest.fn());

const component = <TicTokScreen />;

describe('TikTokScreen', () => {
  test('renders correctly', () => {
    const {toJSON} = render(component);
    expect(toJSON()).toMatchSnapshot();
  });
  test('FlatList render list', () => {
    const {getByTestId} = render(component);
    const container = getByTestId('List_Data_FlatList');
    expect(container).toBeDefined();
  });
});
