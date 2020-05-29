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
import {register_User} from '../services/Authentication/action';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
      hideRepeatPassword: true,
      username: 'raj1234',
      password: 'raj@1234',
      name:'Raj',
      phoneNumber:'9399239243',
      repeatPassword:'raj@1234',
      isLoading: false,
      selfie: require('../../assets/selfie.png'),
      viewPasswordImage: require('../../assets/viewPassword.png'),
      viewHidePasswordImage: require('../../assets/hidePassword.png'),
      
    };
  }
  componentDidMount() {}
  createUser() {
    const {username,password,name,phoneNumber,repeatPassword}=this.state

    if(password===repeatPassword){
      this.props.register_User(username, password,name,phoneNumber).then(
        resolve => {
          if (resolve == 200) {
            alert('Registration Successfull');
            this.setState({isLoading: false});
            this.props.props.navigation.navigate('MyDrawer');
          }
        },
        reject => {
          if (reject == 'ERROR') alert('Wrong Credentials');
          else alert('Cannot process your request. Please try again later!');
          this.setState({isLoading: false});
        },
      );

    }
    else{
      alert("Passwords do not match!")
      this.setState({isLoading: false});
    }
  
  }

  render() {
    const { isLoading} = this.state;
    console.log("props in sign Up",this.props)
    console.log("isLoading",isLoading)

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
                    onChangeText={text => {
                      this.setState({phoneNumber: text});
                    }}
                    style={style.inputStyling}
                  />
                </View>
                <View style={style.usernameView}>
                  <TextInput
                    placeholder={'Username'}
                    onChangeText={text => {
                      this.setState({username: text});
                    }}
                    style={style.inputStyling}
                  />
                </View>

                <View style={style.passwordView}>
                  <TextInput
                    placeholder={'Password'}
                    onChangeText={text => {
                      this.setState({password: text});
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

                <View style={style.passwordView}>
                  <TextInput
                    placeholder={'Repeat Password'}
                    onChangeText={text => {
                      this.setState({repeatPassword: text});
                    }}
                    style={style.inputStyling}
                    secureTextEntry={this.state.hideRepeatPassword}
                  />
                  <View style={{flex: 2, justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({hideRepeatPassword: !this.state.hideRepeatPassword});
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
                      
                      this.setState({isLoading: true},()=>{this.createUser()});
                    }}>
                    <View style={style.signInButton}>
                      <Text
                        style={style.SignUpButtonTextStyling}>
                        SIGN UP
                      </Text>
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
  SignUpButtonTextStyling:{
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
  inputStyling:{
    fontSize: 22,
    paddingBottom: 10,
    paddingTop: 15,
    flex: 8,
    paddingLeft: 3,
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

 
  usernameView:{
    marginTop: 8,

    flexDirection: 'row',

    borderBottomColor: '#e3e2de',
    borderBottomWidth: 1,
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
  
  register_User: register_User
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
