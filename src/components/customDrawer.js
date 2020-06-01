import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
//import { Avatar } from "react-native-elements";
import {isLoggedOut} from '../services/Data/action';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {imageConstants, colorConstants} from '../config/constants';

import ActivityWaiter from '../components/activityWaiter';

class CustomDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkTheme: false,
      loader: false,
      currentUser: null,
    };
  }

  toggleTheme = () => {
    this.setState({isDarkTheme: true});
  };
  getCurrentUser = async () => {
    console.log('inside current user');
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({currentUser: currentUser});
    //this.props.setCurrenSocialUser()
  };
  logoutfromGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('************User signed out from google **************');
      this.props.navigation.navigate('SignIn_SignUp');
      this.props.logoutUser();
      this.clearAsync();
    } catch (error) {
      console.error(error);
    }
  };
  clearAsync = async () => {
    await AsyncStorage.clear();
  };
  logout = async () => {
    this.getCurrentUser();
    setTimeout(() => {
      console.log('current user', this.state.currentUser);
      if (this.state.currentUser) {
        this.logoutfromGoogle();
      } else {
        this.props.logoutUser();
        setTimeout(() => {
          this.setState({loader: false});
          this.clearAsync();
          this.props.navigation.navigate('SignIn_SignUp');
          //alert('You have been Logged Out Successfully');
        }, 1000);
      }
    }, 1000);
  };

  render() {
    console.log('USERNAME ::::', this.props.username);

    return (
      <View style={{flex: 1}}>
        {this.state.loader ? (
          <ActivityWaiter />
        ) : (
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            locations={[0.3, 0.5, 0.6]}
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.linearGradient}>
            <View style={{flex: 1}}>
              <DrawerContentScrollView {...this.props}>
                <View style={styles.drawerContent}>
                  <View style={styles.userInfoSection}>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                      <Avatar.Image
                        source={imageConstants.userImage}
                        size={50}
                      />

                      <View style={{marginLeft: 15, flexDirection: 'column'}}>
                        <Title style={styles.title}>Hello User</Title>
                        <Caption style={styles.caption}>
                          {'@' + this.props.username}
                        </Caption>
                      </View>
                    </View>
                  </View>

                  <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                      activeTintColor={colorConstants.fontColourLight}
                      inactiveTintColor={colorConstants.fontColourLight}
                      //   icon={({color, size}) => (
                      //     <Image
                      //       source={imageConstants.homeLight}
                      //       color={color}
                      //       size={size}
                      //     />
                      //   )
                      // }
                      label="Home"
                    />
                  </Drawer.Section>
                  <Drawer.Section title="Preferences">
                    <TouchableRipple
                      onPress={() => {
                        this.toggleTheme();
                      }}>
                      <View style={styles.preference}>
                        <Text style={{color: '#fff'}}>Dark Theme</Text>
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
                    this.setState({loader: true});
                    this.logout();
                  }}
                />
              </Drawer.Section>
            </View>
          </LinearGradient>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#fff',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#fff',
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

const mapStateToProps = state => ({
  username: state.authenticate_Reducer.username,
  //darkMode: state.data_Reducer.darkMode,
});

const mapDispatchToProps = {
  logoutUser: isLoggedOut,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawer);
