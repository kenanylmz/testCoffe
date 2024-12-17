import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminEkle from './AdminEkle';
import Adminler from './Adminler';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const SuperAdmin = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
        },
        tabBarActiveTintColor: '#4A3428',
        tabBarInactiveTintColor: '#999',
      }}>
      <Tab.Screen
        name="Admin Ekle"
        component={AdminEkle}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../styles/profile_icon.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#4A3428' : '#999',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Adminler"
        component={Adminler}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../styles/profile_icon.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#4A3428' : '#999',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SuperAdmin;
