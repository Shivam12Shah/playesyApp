import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Axios from '../api/Axios';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import BookVenueScreen from '../screens/BookVenueScreen';
import CreateActivityScreen from '../screens/CreateActivityScreen';
import GamesScreen from '../screens/GamesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator  ();
const Tab = createBottomTabNavigator();



function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'home-outline';
          else if (route.name === 'Games') iconName = 'basketball-outline';
          else if (route.name === 'Create') iconName = 'add-circle-outline';
          else if (route.name === 'Book') iconName = 'calendar-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5B5BD6',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Games" component={GamesScreen} />
      <Tab.Screen name="Create" component={CreateActivityScreen} />
      <Tab.Screen name="Book" component={BookVenueScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {

  const [isLogin, setIslogin] = useState(false)

  const dashboard = async()=>{
    const response = await Axios.get('/api/user/dashboard')
    if(response.status === 200){
      console.log("reraasasdasd",response);
      await AsyncStorage.setItem("isLogin", "true");
      setIslogin(true)
    }else{
      await AsyncStorage.setItem("isLogin", "false");
      setIslogin(false)
    }
  }
  useEffect(()=>{
    dashboard()
  },[])
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isLogin ? "Main" : "Welcome"}>
          {!isLogin && (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )}
          <Stack.Screen name="Main" component={MainTabs} />
          </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
