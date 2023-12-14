import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import MyStore from './src/redux/store/Store';
import StackNavigation from './src/navigation/StackNavigation';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <Provider store={MyStore}>
        <StackNavigation />
      </Provider>
    </>
  );
};

export default App;
