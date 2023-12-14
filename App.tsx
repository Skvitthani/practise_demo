import React from 'react';
import {LogBox} from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return <StackNavigation />;
};

export default App;
