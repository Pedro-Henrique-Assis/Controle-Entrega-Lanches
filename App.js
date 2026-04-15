import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentScreen from './src/screens/StudentScreen';
import AuthScreen from './src/screens/AuthScreen';
import ReportScreen from './src/screens/ReportScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ 
        tabBarActiveTintColor: '#000', 
        headerStyle: { backgroundColor: '#FAFAFA' },
        headerTitleStyle: { fontWeight: '600' }
      }}>
        <Tab.Screen name="Alunos" component={StudentScreen} />
        <Tab.Screen name="Autorizações" component={AuthScreen} />
        <Tab.Screen name="Relatórios" component={ReportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}