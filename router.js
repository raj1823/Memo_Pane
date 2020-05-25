import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './src/components/home';
import {ToggleSignIn_SignUp} from './src/components/toggleLoginSignup';
import {NavigationContainer} from '@react-navigation/native';
import Logout from './src/components/logout';
import ViewNotes from './src/components/viewNotes'
import NoteEditor from './src/components/noteEditor'

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function myDrawer() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen
        //options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

function myApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator >

      
       
        <Stack.Screen
          options={{headerShown: false}}
          name="SignIn_SignUp"
          component={ToggleSignIn_SignUp}
        />
         <Stack.Screen
          options={{headerShown: false}}
          name="MyDrawer"
          component={myDrawer}
        />
        
        <Stack.Screen
           options={{headerShown:false}}
          name="My Note"
          component={NoteEditor}
        />

       <Stack.Screen
           //options={{headerShown:false}}
          name="viewNotes"
          component={ViewNotes}
        />
         
        
        

       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default myApp;
