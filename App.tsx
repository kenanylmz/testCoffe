import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Splash from './src/screens/Splash';
import SplashTwo from './src/screens/SplashTwo';
import Login from './src/screens/Login';
import Kafeler from './src/screens/Kafeler';
import Kayıt from './src/screens/Kayıt';
import Dogrulama from './src/screens/Dogrulama';
import Mudavim from './src/screens/Mudavim';
import Kuponlarım from './src/screens/Kuponlarım';
import Profil from './src/screens/Profil';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
        headerShown: false,
      }}>
      <Tab.Screen
        name="Anasayfa"
        component={Mudavim}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./src/styles/anasayfa_icon.png')}
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
        name="Kuponlarım"
        component={Kuponlarım}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./src/styles/kuponlarım_icon.png')}
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
        name="Profil"
        component={Profil}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./src/styles/profil_icon.png')}
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

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          // Auth screens
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="SplashTwo" component={SplashTwo} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Kayıt" component={Kayıt} />
            <Stack.Screen name="Dogrulama" component={Dogrulama} />
          </>
        ) : (
          // App screens
          <>
            <Stack.Screen name="Kafeler" component={Kafeler} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="Dogrulama" component={Dogrulama} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
