import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import CasesPage from './pages/CasesPage';
import EvidencePage from './pages/EvidencePage';
import UploadPage from './pages/UploadPage';
import BOLO from './pages/BOLO';
import ContactHistory from './pages/ContactHistory';
import TrespassRecords from './pages/TrespassRecords';
import WantedRecords from './pages/WantedRecords';
import SearchCasePage from './pages/SearchCasePage';
import CreateCasePage from './pages/CreateCasePage';
import CriminalDetails from './pages/CriminalDetails';
import CategoryCases from './pages/CategoryCases';
import LogoutButton from './pages/LogoutButton';
import AddEvidencePage from './pages/AddEvidencePage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Main') {
            iconName = 'home';
          } else if (route.name === 'Cases') {
            iconName = 'briefcase';
          } else if (route.name === 'Evidence') {
            iconName = 'folder';
          } else if (route.name === 'Upload') {
            iconName = 'upload';
          } else if (route.name === 'Logout') {
            iconName = 'sign-out';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: '#94ADC7',
        tabBarStyle: {
          backgroundColor: '',
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
      <Tab.Screen name="Cases" component={CasesPage} options={{ headerShown: false }} />
      <Tab.Screen name="Evidence" component={EvidencePage} options={{ headerShown: false }} />
      <Tab.Screen name="Upload" component={UploadPage} options={{ headerShown: false }} />
      <Tab.Screen name="Logout" component={LogoutButton} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="BOLO" component={BOLO} options={{ headerShown: false }} />
          <Stack.Screen name="ContactHistory" component={ContactHistory} options={{ headerShown: false }} />
          <Stack.Screen name="TrespassRecords" component={TrespassRecords} options={{ headerShown: false }} />
          <Stack.Screen name="WantedRecords" component={WantedRecords} options={{ headerShown: false }} />
          <Stack.Screen name="SearchCasePage" component={SearchCasePage} options={{ headerShown: false }} />
          <Stack.Screen name="CreateCasePage" component={CreateCasePage} options={{ headerShown: false }} />
          <Stack.Screen name="CriminalDetails" component={CriminalDetails} options={{ headerShown: false }} />
          <Stack.Screen name="CategoryCases" component={CategoryCases} options={{ headerShown: false }} />
          <Stack.Screen name="AddEvidencePage" component={AddEvidencePage} options={{ headerShown: false }} />
          <Stack.Screen name="UploadPage" component={UploadPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
