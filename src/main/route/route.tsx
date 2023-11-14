import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../ui/screens/home/home';
import AnalysisScreen from '../../ui/screens/analysis/analysis';

const Route = createNativeStackNavigator();

type RouteNavigation = {
  Home: undefined
  Analysis: undefined
}

export type RouteType = NativeStackNavigationProp<RouteNavigation>

export default function RouteComponent(): JSX.Element {
  return (
    <NavigationContainer>
      <Route.Navigator>
        <Route.Screen name="Home" component={HomeScreen} />
        <Route.Screen name="Analysis" component={AnalysisScreen} />
      </Route.Navigator>  
    </NavigationContainer>
  );
}