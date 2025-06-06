import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import AnimatedListScreen from '@/app/modules/animated/screens/Home/HomeScreen';
import DetailScreen from '@/app/modules/animated/screens/Detail/DetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="AnimatedList"
      screenOptions={{
        headerStyle: { backgroundColor: '#B6FF00' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="AnimatedList" 
        component={AnimatedListScreen} 
        options={{ title: 'Personajes de Rick y Morty' }} 
      />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.item.title })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
