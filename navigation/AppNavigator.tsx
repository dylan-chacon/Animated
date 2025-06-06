import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import AnimatedListScreen from '@/app/modules/animated/screens/Home/HomeScreen';
import DetailScreen from '@/app/modules/animated/screens/Detail/DetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007BFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="AnimatedList" 
          component={AnimatedListScreen} 
          options={{ title: 'Lista Animada' }} 
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={({ route }) => ({ title: route.params.item.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
