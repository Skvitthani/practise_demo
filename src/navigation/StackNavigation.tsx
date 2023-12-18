import React from 'react';
import {NavigationType} from '.';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import TicTokScreen from '../screen/TicTokView/TicTokScreen';
import LoginScreen from '../screen/localization/LoginScreen';
import CameraScreen from '../screen/visionCamera/CameraScreen';
import CreateAccountScreen from '../screen/localization/CreateAccountScreen';
import ZustandScreen from '../screen/zustand/ZustandScreen';

const Stack = createNativeStackNavigator<NavigationType>();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ZustandScreen" component={ZustandScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreen}
        />
        <Stack.Screen name="TicTokScreen" component={TicTokScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
