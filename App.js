import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, FlatList, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailsScreen from './screens/DetailsScreen';


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Vin" component={ListScreen} />
        <Stack.Screen name="Détails" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}