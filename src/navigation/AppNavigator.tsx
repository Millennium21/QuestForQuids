import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import CreditScoreScreen from '../screens/CreditScoreScreen';
import SavingsScreen from '../screens/SavingsScreen';
import QuidSaverChatScreen from '../screens/QuidSaverChatScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const screens = {
    Home: HomeScreen,
    Quiz: QuizScreen,
    Credit: CreditScoreScreen,
    Savings: SavingsScreen,
    QuidSaver: QuidSaverChatScreen,
    Leaderboard: LeaderboardScreen
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Quiz':
                iconName = 'head-question';
                break;
              case 'Credit':
                iconName = 'chart-line';
                break;
              case 'Savings':
                iconName = 'piggy-bank';
                break;
              case 'QuidSaver':
                iconName = 'robot';
                break;
              case 'Leaderboard':
                iconName = 'trophy';
                break;
              default:
                iconName = 'circle';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6C63FF',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#6C63FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={screens.Home}
          options={{ title: 'QuestForQuid' }}
        />
        <Tab.Screen 
          name="Quiz" 
          component={screens.Quiz}
          options={{ title: 'Learn & Earn' }}
        />
        <Tab.Screen 
          name="Credit" 
          component={screens.Credit}
          options={{ title: 'Credit Score' }}
        />
        <Tab.Screen 
          name="Savings" 
          component={screens.Savings}
          options={{ title: 'Savings' }}
        />
        <Tab.Screen 
          name="QuidSaver" 
          component={screens.QuidSaver}
          options={{ title: 'QuidSaver' }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={screens.Leaderboard}
          options={{title: 'Leaderboard'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;