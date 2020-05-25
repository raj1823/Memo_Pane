import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {connect} from 'react-redux';
import {TextInput} from 'react-native';
import ActivityWaiter from '../components/activityWaiter';
import {authenticate_User} from '../services/Authentication/action';

class Login extends React.Component {
  constructor(props) {
    //console.log("props in const",props)
    super(props)
    this.state = {
      hidePassword: true,
      username: 'Raj1823',
      password: '11111111',
      isLoading: false,
      imagePath: require('../../assets/addUser.png'),
      viewPasswordImage: require('../../assets/viewPassword.png'),
      image2path: require('../../assets/pokeball.png'),
      facebookIcon: require('../../assets/facebook.png'),
      googlePlusIcon: require('../../assets/googlePlus.png'),
      twitterIcon: require('../../assets/twitter.png'),
      githubIcon: require('../../assets/github.png'),
      viewHidePasswordImage: require('../../assets/hidePassword.png'),
    };
  }
  componentDidMount() {}
  loginUser(username, password) {
    this.props.authenticate_User(username, password).then(
      resolve => {
        if (resolve == 200) {
           
          this.setState({ isLoading : false})
          this.props.props.navigation.navigate("MyDrawer")
        }
      },
      reject => {
        if (reject == 'ERROR') alert('Wrong Credentials');
        else alert('Cannot process your request. Please try again later!');
          this.setState({ isLoading : false});
      },
    );
  }
  

  render() {
    const {username, password, isLoading} = this.state;
    console.log("props",this.props)

    return (
      <SafeAreaView style={style.container}>
        { isLoading ? (
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
                    defaultValue={'Raj1823'}
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
                    defaultValue={'11111111'}
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
                            fontWeight:"600"
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
                <TouchableOpacity>
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
                <TouchableOpacity>
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
    justifyContent:"center"

   
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

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  authenticate_User: authenticate_User,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
