import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BookList from './screens/BookList';
import BookDetail from './screens/BookDetail';
import BarcodeScanner from './screens/BarcodeScanner';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BookList">
          <Stack.Screen 
            name="BookList" 
            component={BookList}
            options={{ title: 'My Books' }}
          />
          <Stack.Screen 
            name="BookDetail" 
            component={BookDetail}
            options={{ title: 'Book Details' }}
          />
          <Stack.Screen 
            name="BarcodeScanner" 
            component={BarcodeScanner}
            options={{ title: 'Scan Barcode' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App; 