import React from 'react';
import {NavigationType} from '.';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens

import TicTokScreen from '../screen/TicTokView/TicTokScreen';
import CameraScreen from '../screen/visionCamera/CameraScreen';
import LoginScreen from '../screen/localization/loginScreen/LoginScreen';
import CreateAccountScreen from '../screen/localization/createAccountscreen/CreateAccountScreen';
import RecoliDeailScreen from '../screen/recoli/recoliDeailScreen/RecoliDeailScreen';
import RecoliScreen from '../screen/recoli/recoliScreen/RecoliScreen';

const Stack = createNativeStackNavigator<NavigationType>();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="RecoliScreen" component={RecoliScreen} />
        <Stack.Screen name="RecoliDeailScreen" component={RecoliDeailScreen} />
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
