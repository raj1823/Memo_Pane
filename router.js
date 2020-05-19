import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Login from './src/components/login';
import Home from './src/components/home';




import { NavigationContainer } from '@react-navigation/native';
import Logout from './src/components/logout';

const Drawer=createDrawerNavigator();


const Stack= createStackNavigator();

function myDrawer()
{  return(
    <Drawer.Navigator>
        <Drawer.Screen name="Logout" component={Logout}  />

       
    </Drawer.Navigator>
)
}

function myApp(){
    
return(

<NavigationContainer>                            


    
    <Stack.Navigator>
    <Stack.Screen  options={{headerShown:false}} name="Login" component={Login}/>
    <Stack.Screen  options={{headerShown:false}} name="MyDrawer" component ={myDrawer} />
    <Stack.Screen  options={{headerShown:false}} name="Home" component={Home}/>
   
    </Stack.Navigator>
    
   

</NavigationContainer>
)
}

export default myApp;