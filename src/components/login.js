import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {loadUserNotes, setCountsView} from '../services/Data/action';
import {TextInput} from 'react-native';
import ActivityWaiter from '../components/activityWaiter';
import {
  authenticate_User,
  setSocialId,
  setUserToken,
  setUserName,
  register_SocialUser,
} from '../services/Authentication/action';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {concat} from 'react-native-reanimated';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      hidePassword: true,
      username: 'raj123',
      password: 'raj@123',
      isLoading: false,
      imagePath: require('../../assets/addUser.png'),
      viewPasswordImage: require('../../assets/viewPassword.png'),
      image2path: require('../../assets/pokeball.png'),
      facebookIcon: require('../../assets/facebook.png'),
      googlePlusIcon: require('../../assets/googlePlus.png'),
      twitterIcon: require('../../assets/twitter.png'),
      githubIcon: require('../../assets/github.png'),
      viewHidePasswordImage: require('../../assets/hidePassword.png'),
      socialId: '',
    };
  }
  isUserLoggedIn = () => {
    console.log('Props before rendering: ', this.props);

    AsyncStorage.getItem('token').then(value => {
      console.log('token isUserLOggedIn is', value);

      if (value != null) {
        this.props.setToken(value);
        AsyncStorage.getItem('username').then(value => {
          console.log('username in ASYNC', value);
          this.props.setUserName(value);
        });
        this.props.props.navigation.navigate('MyDrawer');
        alert('Welcome Back User!');
      } else {
      }
    });
  };
  isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    console.log('8888888888');
    if (isSignedIn) {
      console.log('user already signed in');
      AsyncStorage.getItem('token').then(value => {
        console.log('token isUserLOggedIn is', value);

        if (value != null) {
          this.props.setToken(value);

          this.props.props.navigation.navigate('MyDrawer');
        } else {
        }
      });
    }
  };
  componentDidMount() {
    this.isUserLoggedIn();
    GoogleSignin.configure();
    this.isSignedIn();
  }
  googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo});
      let name = this.state.userInfo.user.name;
      let token = this.state.userInfo.user.id;
      let username = this.state.userInfo.user.email;

      console.log('social id', token);
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', name, username);

      this.props.register_SocialUser(username, ' ', name, '0', token).then(
        resolve => {
          if (resolve == 200) {
            this.props.props.navigation.navigate('MyDrawer');
          }
        },
        reject => {
          if (reject == 'API_ERROR')
            alert('Cannot process your request. Please try again later!');
          else if (reject == 'USERNAME_ERROR') {
            this.setState({isLoading: true});
            this.props.authenticate_User(username, ' ').then(
              resolve => {
                if (resolve == 200) {
                  this.setState({isLoading: false});

                  this.props.props.navigation.navigate('MyDrawer');
                }
              },
              reject => {
                if (reject == 'ERROR') {
                  Alert.alert('Wrong Credentials', '', [
                    {
                      text: 'OK',
                      onPress: () => this.setState({isLoading: false}),
                    },
                  ]);
                } else {
                  Alert.alert(
                    'Cannot process your request. Please try again later!',
                    '',
                    [
                      {
                        text: 'OK',
                        onPress: () => this.setState({isLoading: false}),
                      },
                    ],
                  );
                }
              },
            );
          }
        },
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //alert("operation cancelled")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        <ActivityWaiter />;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  loginUser(username, password) {
    this.props.authenticate_User(username, password).then(
      resolve => {
        if (resolve == 200) {
          this.setState({isLoading: false});

          this.props.props.navigation.navigate('MyDrawer');
        }
      },
      reject => {
        if (reject == 'ERROR') {
          Alert.alert('Wrong Credentials', '', [
            {text: 'OK', onPress: () => this.setState({isLoading: false})},
          ]);
        } else {
          Alert.alert(
            'Cannot process your request. Please try again later!',
            '',
            [{text: 'OK', onPress: () => this.setState({isLoading: false})}],
          );
        }
      },
    );
  }
  _responseInfoCallback(error, result) {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log('Success fetching data: ' + result.toString());
    }
  }
  initiateLogin() {
    const infoRequest = new GraphRequest(
      '/me?fields=name,email',
      null,
      this._responseInfoCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }
  facebookLogin() {
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ])
      .then(function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' + result.grantedPermissions,
          );

          AccessToken.getCurrentAccessToken().then(data => {
            var token = data.accessToken.toString();
            console.log('facebook initialLogin');
            console.log(token);
            //this.initiateLogin()
          });
          //this.props.props.navigation.navigate('MyDrawer');
        }
      })
      .catch(error => {
        console.log('Login fail with error: ' + error);
      });
  }

  initUSer() {
    console.log('Init user called');
  }

  render() {
    console.log('User info google', this.state.userInfo);
    const {username, password, isLoading} = this.state;
    console.log('props', this.props);

    return (
      <SafeAreaView style={style.container}>
        {isLoading ? (
          <ActivityWaiter />
        ) : (
          <View style={{flex: 1}}>
            <View style={style.middleSection}>
              <View style={style.middleSectionStyling}>
                <View style={style.addUserViewStyling}>
                  <Image
                    source={this.state.imagePath}
                    style={style.addUserStyling}
                  />
                </View>
                <View style={style.userNameView}>
                  <TextInput
                    placeholder={'Username or email address'}
                    //defaultValue={'raj1234'}
                    placeholderTextColor={'#cdd0d4'}
                    autoCapitalize={'none'}
                    onChangeText={text => {
                      this.setState({username: text});
                    }}
                    style={{
                      fontSize: 26,
                      paddingBottom: 10,
                      borderBottomColor: 'grey',
                      borderBottomWidth: 1,
                      paddingLeft: 3,
                    }}
                  />
                </View>

                <View style={style.passwordView}>
                  <TextInput
                    placeholder={'Password'}
                    autoCapitalize={'none'}
                    //defaultValue={'raj@1234'}
                    placeholderTextColor={'#cdd0d4'}
                    onChangeText={text => {
                      this.setState({password: text});
                    }}
                    style={{
                      fontSize: 24,
                      paddingBottom: 10,
                      paddingTop: 15,
                      flex: 8,
                      paddingLeft: 3,
                    }}
                    secureTextEntry={this.state.hidePassword}
                  />
                  <View style={{flex: 2, justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({hidePassword: !this.state.hidePassword});
                      }}>
                      <Image
                        source={
                          this.state.hidePassword
                            ? this.state.viewPasswordImage
                            : this.state.viewHidePasswordImage
                        }
                        style={style.viewPasswordImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'flex-end',
                  }}>
                  <Image
                    source={this.state.image2path}
                    style={style.image2pathstyling}
                  />
                </View>

                <View style={{marginVertical: 20}}>
                  <View style={style.signInButtonView}>
                    <TouchableOpacity
                      onPress={() => {
                        this.loginUser(username, password);
                        this.setState({isLoading: true});
                      }}>
                      <View style={style.signInButton}>
                        <Text
                          style={{
                            fontSize: 24,
                            alignSelf: 'center',
                            color: 'blue',
                            paddingVertical: 13,
                            fontWeight: '600',
                          }}>
                          LOG IN
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={style.footer}>
              <Text style={style.footerText}>Login with</Text>

              <View style={style.socialLoginStyling}>
                <TouchableOpacity
                  onPress={() => {
                    this.googleSignIn();
                  }}>
                  <Image
                    source={this.state.googlePlusIcon}
                    style={style.socialIconStyling}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={this.state.githubIcon}
                    style={style.socialIconStyling}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={this.state.twitterIcon}
                    style={style.socialIconStyling}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.facebookLogin(),
                      setTimeout(() => {
                        this.initUSer();
                      }, 10000);
                  }}>
                  <Image
                    source={this.state.facebookIcon}
                    style={style.socialIconStyling}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  socialIconStyling: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },

  socialLoginStyling: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  footerText: {
    alignSelf: 'center',
    fontSize: 19,
    color: 'grey',
    marginTop: 9,
  },
  signInButtonView: {
    marginVertical: 22,
  },
  signInButton: {
    borderRadius: 30,
    backgroundColor: 'white',
    shadowOffset: {
      height: 10,
      width: 4,
    },
    shadowOpacity: 0.2,
    shadowColor: 'grey',
    marginVertical: 6,
  },
  image2pathstyling: {
    height: 35,
    width: 30,
    resizeMode: 'contain',
  },
  viewPasswordImage: {
    height: 40,
    width: 35,
    resizeMode: 'contain',
    alignSelf: 'flex-end',

    marginBottom: 7,
  },

  userNameView: {
    marginTop: 20,
  },

  passwordView: {
    marginTop: 20,
    marginBottom: 14,
    flexDirection: 'row',

    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  addUserViewStyling: {
    marginBottom: 20,
  },
  addUserStyling: {
    alignSelf: 'center',
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
  middleSectionStyling: {
    marginHorizontal: 22,
  },
  upperHeading: {
    flex: 2,
    justifyContent: 'center',
  },
  middleSection: {
    flex: 6,
    marginHorizontal: 22,
  },
  footer: {
    flex: 2,

    marginHorizontal: 20,
  },

  topSection: {
    flex: 1,
    justifyContent: 'center',
  },
  SignUpTextStyling: {
    fontSize: 24,
    alignSelf: 'center',
  },
  loginTextStyling: {
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: '700',
  },
});

const mapStateToProps = state => ({
  token: state.authenticate_Reducer.token,
  userNotes: state.data_Reducer.userNotes,
  darkMode: state.data_Reducer.darkMode,
});
const mapDispatchToProps = {
  authenticate_User: authenticate_User,
  setToken: setUserToken,
  loadUserNotes: loadUserNotes,
  setCountsView: setCountsView,
  setUserName: setUserName,
  register_SocialUser: register_SocialUser,
  setSocialId: setSocialId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
