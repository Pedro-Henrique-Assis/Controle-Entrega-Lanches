import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; // Importação da biblioteca de ícones do Expo

import StudentScreen from './src/screens/StudentScreen';
import AuthScreen from './src/screens/AuthScreen';
import ReportScreen from './src/screens/ReportScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          // A propriedade tabBarIcon permite definir uma função que retorna o ícone
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Definimos o ícone com base na rota atual e no estado de foco
            if (route.name === 'Alunos') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Autorizações') {
              // Ícone de fast-food para combinar com o contexto de "lanches"
              iconName = focused ? 'fast-food' : 'fast-food-outline';
            } else if (route.name === 'Relatórios') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            }

            // Retorna o componente do ícone com as cores definidas no tema
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0F172A', // Slate 900 (Cinza escuro para item ativo)
          tabBarInactiveTintColor: '#94A3B8', // Slate 400 (Cinza claro para inativo)
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E2E8F0',
            elevation: 0, // Visual mais clean no Android
            height: 65, // Altura ligeiramente aumentada para acomodar confortavelmente o ícone e o texto
            paddingBottom: 8,
            paddingTop: 8,
          },
          headerStyle: { 
            backgroundColor: '#FFFFFF',
            shadowOpacity: 0, 
            elevation: 0, 
            borderBottomWidth: 1,
            borderBottomColor: '#F1F5F9',
          },
          headerTitleStyle: { 
            fontWeight: '700',
            color: '#1E293B',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen name="Alunos" component={StudentScreen} />
        <Tab.Screen name="Autorizações" component={AuthScreen} />
        <Tab.Screen name="Relatórios" component={ReportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}