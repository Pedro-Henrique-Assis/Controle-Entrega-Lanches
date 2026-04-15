import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import StudentScreen from './src/screens/StudentScreen';
import AuthScreen from './src/screens/AuthScreen';
import ReportScreen from './src/screens/ReportScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator screenOptions={{ 
        tabBarActiveTintColor: '#0F172A', // Slate 900
        tabBarInactiveTintColor: '#94A3B8', // Slate 400
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          elevation: 0, // Remove sombra no Android para um visual mais flat
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: { 
          backgroundColor: '#FFFFFF',
          shadowOpacity: 0, // Remove a linha sob o header no iOS
          elevation: 0, // Remove a sombra no Android
          borderBottomWidth: 1,
          borderBottomColor: '#F1F5F9',
        },
        headerTitleStyle: { 
          fontWeight: '700',
          color: '#1E293B',
          fontSize: 18,
        },
        headerTitleAlign: 'center',
      }}>
        <Tab.Screen name="Alunos" component={StudentScreen} />
        <Tab.Screen name="Autorizações" component={AuthScreen} />
        <Tab.Screen name="Relatórios" component={ReportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}