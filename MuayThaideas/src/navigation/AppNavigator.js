import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UIStyle } from '../utils/styles';

import HomeScreen from '../screens/HomeScreen';
import ComboListScreen from '../screens/ComboList';
import FighterDetailsScreen from '../screens/FighterDetails';
import WorkoutSetupScreen from '../screens/WorkoutSetup';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} 
                      options = {{title: "",
                      headerStyle: UIStyle.headerStyle}}/>

        <Stack.Screen name="ComboList" component={ComboListScreen} options = {{title: "",
                                                                    headerStyle: UIStyle.headerStyle}}/>
        
        <Stack.Screen name="FighterDetails" component={FighterDetailsScreen} options = {{title: "", headerStyle: UIStyle.headerStyle}}/>
        <Stack.Screen name="Workout" component={WorkoutSetupScreen} options = {{title: "", headerStyle: UIStyle.headerStyle}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
