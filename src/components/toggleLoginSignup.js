import React, {useState} from 'react';
import SignUp from './signUp';
import Login from './login';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {set} from 'react-native-reanimated';

const style = StyleSheet.create({
  upperHeading: {
    flexDirection: 'row',
    flex: 2,
    backgroundColor: '#fff',
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

export function ToggleSignIn_SignUp(props) {
  //console.log("login props",props)
  const [toggle, setToggle] = useState(1);
  console.log('toggle', toggle);
  const [activeText, setActiveText] = useState('Login');
  const [inActiveText, setInActiveText] = useState('Sign Up');
  return (
    <View style={{flex: 1}}>
      <View style={style.upperHeading}>
        <View style={style.topSection}>
          <TouchableOpacity
            onPress={() => {
              if (activeText == 'Login') {
                setActiveText('Login');
                setInActiveText('Sign Up');
                setToggle(1);
              }
              if (activeText == 'Sign Up') {
                setActiveText('Sign Up');
                setInActiveText('Login');
              }
            }}>
            <Text style={style.loginTextStyling}> {activeText}</Text>
          </TouchableOpacity>
        </View>

        <View style={style.topSection}>
          <TouchableOpacity
            onPress={() => {
              if (inActiveText == 'Sign Up') {
                setActiveText('Sign Up');
                setInActiveText('Login');
                setToggle(0);
              }
              if (inActiveText == 'Login') {
                setActiveText('Login');
                setInActiveText('Sign Up');
                setToggle(1);
              }
            }}>
            <Text style={style.SignUpTextStyling}>{inActiveText}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 8}}>{toggle ? <Login props={props} /> : <SignUp props={props} />}</View>
    </View>
  );
}
