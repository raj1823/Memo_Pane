
  
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {isLoggedOut} from '../services/Data/action'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {imageConstants, colorConstants} from '../config/constants';

import ActivityWaiter from '../components/activityWaiter';


 class CustomDrawer extends React.Component {

    constructor(props){
        super(props)
        this.state={
            isDarkTheme: false,
            loader: false,
        }
    }
  
   toggleTheme = () => {
       this.setState({isDarkTheme:true})

  };

  logout = async () => {
    this.props.logoutUser();
    await AsyncStorage.clear();

    setTimeout(() => {
      this.setState({loader: false});
      this.props.navigation.navigate('SignIn_SignUp');
      //alert('You have been Logged Out Successfully');
    }, 1000);
  };

  render(){
  console.log("USERNAME ::::",this.props.username)
  
  return (

    <View style={{flex: 1}}> 
    {this.state.loader? <ActivityWaiter/>:
    <View style={{flex:1}}> 
      <DrawerContentScrollView {...this.props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image source={imageConstants.homeLight} size={50} />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Hello User</Title>
                <Caption style={styles.caption}>{"@"+this.props.username}</Caption>
              </View>
            </View>

         
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              activeTintColor={colorConstants.fontColourLight}
              inactiveTintColor={colorConstants.fontColourLight}
              icon={({color, size}) => (
                <Image
                  source={imageConstants.homeLight}
                  color={color}
                  size={size}
                />
              )}
              label="Home"
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={this.state.isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          activeTintColor={colorConstants.fontColourLight}
          inactiveTintColor={colorConstants.fontColourLight}
          icon={({color, size}) => (
            <Image
              source={imageConstants.logoutLight}
              color={color}
              size={size}
            />
          )}
          label="Log Out"
          onPress={() => {
              this.setState({loader:true})
            this.logout();
          }}
        />
      </Drawer.Section>
      </View>}
    </View>
  );
        }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});


const mapStateToProps=state=>({

    username: state.authenticate_Reducer.username,
})

const mapDispatchToProps={
    logoutUser: isLoggedOut,

}
export default connect(
mapStateToProps,
mapDispatchToProps
)(CustomDrawer)