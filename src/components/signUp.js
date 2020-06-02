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

import {connect} from 'react-redux';
import {TextInput} from 'react-native';
import ActivityWaiter from '../components/activityWaiter';
import {register_User} from '../services/Authentication/action';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
      hideRepeatPassword: true,
      username: '',
      validatedUsername: true,
      password: '',
      validatedPassword: true,
      name: '',
      phoneNumber: '',
      repeatPassword: '',
      isLoading: false,
      selfie: require('../../assets/selfie.png'),
      viewPasswordImage: require('../../assets/viewPassword.png'),
      viewHidePasswordImage: require('../../assets/hidePassword.png'),
    };
  }
  componentDidMount() {}
  validateField(text, dataType) {
    var userNameRegex = /^\S{4,}$/;
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (dataType === 'username') {
      if (userNameRegex.test(text)) {
        this.setState({validatedUsername: true});
        this.setState({username: text});
      } else {
        this.setState({validatedUsername: false});
      }
    } else if (dataType === 'password') {
      if (passwordRegex.test(text)) {
        this.setState({validatedPassword: true});
        this.setState({password: text});
      } else {
        this.setState({validatedPassword: false});
      }
    }
  }
  createUser() {
    const {username, password, name, phoneNumber, repeatPassword} = this.state;

    if (password === repeatPassword) {
      this.props.register_User(username, password, name, phoneNumber).then(
        resolve => {
          if (resolve == 200) {
            alert('Registration Successfull');
            this.setState({isLoading: false});
            this.props.props.navigation.navigate('MyDrawer');
          }
        },
        reject => {
          if (reject == 'ERROR') {
            Alert.alert('Unsufficient Data', '', [
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
    } else {
      alert('Passwords do not match!');
      this.setState({isLoading: false});
    }
  }

  render() {
    const {isLoading, validatedPassword, validatedUsername} = this.state;
   
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
                    source={this.state.selfie}
                    style={style.addUserStyling}
                  />
                </View>
                <View style={style.usernameView}>
                  <TextInput
                    placeholder={'Enter name'}
                    placeholderTextColor={'#cdd0d4'}
                    onChangeText={text => {
                      this.setState({name: text});
                    }}
                    style={{
                      fontSize: 22,
                      paddingBottom: 10,
                      paddingTop: 1,
                      flex: 8,
                      paddingLeft: 3,
                    }}
                  />
                </View>
                <View style={style.usernameView}>
                  <TextInput
                    placeholder={'Enter Phone Number'}
                    placeholderTextColor={'#cdd0d4'}
                    onChangeText={text => {
                      this.setState({phoneNumber: text});
                    }}
                    style={style.inputStyling}
                  />
                </View>
                <View
                  style={
                    validatedUsername ? style.usernameView : style.ErrorView
                  }>
                  <TextInput
                    placeholder={'Username'}
                    autoCapitalize={'none'}
                    placeholderTextColor={'#cdd0d4'}
                    onChangeText={text => {
                      this.validateField(text, 'username');
                    }}
                    style={style.inputStyling}
                  />
                </View>

                <View
                  style={
                    validatedPassword ? style.passwordView : style.ErrorView
                  }>
                  <TextInput
                    placeholder={'Password'}
                    autoCapitalize={'none'}
                    placeholderTextColor={'#cdd0d4'}
                    onChangeText={text => {
                      this.validateField(text, 'password');
                    }}
                    style={style.inputStyling}
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
                  style={
                    this.state.password === this.state.repeatPassword
                      ? style.passwordView
                      : style.ErrorView
                  }>
                  <TextInput
                    placeholder={'Repeat Password'}
                    placeholderTextColor={'#cdd0d4'}
                    autoCapitalize={'none'}
                    onChangeText={text => {
                      this.setState({repeatPassword: text});
                    }}
                    style={style.inputStyling}
                    secureTextEntry={this.state.hideRepeatPassword}
                  />
                  <View style={{flex: 2, justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          hideRepeatPassword: !this.state.hideRepeatPassword,
                        });
                      }}>
                      <Image
                        source={
                          this.state.hideRepeatPassword
                            ? this.state.viewPasswordImage
                            : this.state.viewHidePasswordImage
                        }
                        style={style.viewPasswordImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={style.footer}>
              <View style={{marginVertical: 20}}>
                <View style={style.signInButtonView}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({isLoading: true}, () => {
                        this.createUser();
                      });
                    }}>
                    <View style={style.signInButton}>
                      <Text style={style.SignUpButtonTextStyling}>SIGN UP</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={style.footerText}>Terms of Service</Text>
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
  SignUpButtonTextStyling: {
    fontSize: 24,
    alignSelf: 'center',
    color: 'blue',
    paddingVertical: 13,
    fontWeight: '600',
  },

  socialLoginStyling: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  footerText: {
    alignSelf: 'center',
    fontSize: 19,
    color: '#a6a5a2',
    marginTop: 9,
  },
  signInButtonView: {
    marginVertical: 22,
  },
  inputStyling: {
    fontSize: 22,
    paddingBottom: 10,
    paddingTop: 15,
    flex: 8,
    paddingLeft: 3,
  },
  usernameView: {
    marginTop: 8,

    flexDirection: 'row',

    borderBottomColor: '#e3e2de',
    borderBottomWidth: 1,
  },
  ErrorView: {
    marginTop: 8,

    flexDirection: 'row',

    borderColor: 'red',
    borderBottomWidth: 2,
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

  passwordView: {
    marginTop: 8,

    flexDirection: 'row',

    borderBottomColor: '#e3e2de',
    borderBottomWidth: 1,
  },
  addUserViewStyling: {
    marginBottom: 20,
  },
  addUserStyling: {
    alignSelf: 'center',
    height: 135,
    width: 140,
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
    flex: 3,

    marginHorizontal: 24,
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
  register_User: register_User,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
