import API from '../../config/env';
import {AUTHENTICATION_SUCCESS, ADD_TOKEN, SET_USERNAME,SET_SOCIAL_ID} from './constant';

export function authenticate_User(username, password) {
  let loginAPI = API.apiConfig.authenticationApi.loginUserHandle;
  console.log('login Api:', loginAPI);
  return dispatch => {
    return new Promise(function(resolve, reject) {
      try {
        console.log('------------------', username, password);

        fetch(loginAPI, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
          .then(res => {
            console.log('status', res.status);

            if (res.status >= 200 && res.status <= 300) {
              return res.json();
            } else reject('API_ERROR');
          })
          .then(response => {
            console.log('response in:', response);

            if (response.status == true) {
              console.log('lololololololo', username);
              dispatch({type: ADD_TOKEN, token: response.id});
              dispatch({type: SET_USERNAME, username: username});
              //dispatch({type:AUTHENTICATION_SUCCESS})
              resolve(200);
            } else {
              reject('ERROR');
            }
          })
          .catch(error => {
            reject('API_ERROR');
          });
      } catch (error) {
        reject('API_ERROR');
      }
    });
  };
}
export const setSocialId = token => dispatch => {
  dispatch({type: ADD_SOCIAL_ID, token: token});
};
export const setUserToken = token => dispatch => {
  dispatch({type: ADD_TOKEN, token: token});
};

export const setUserName = username => dispatch =>{
  dispatch({type: SET_USERNAME,username: username})
}

export function register_User(username, password, name, phoneNumber) {
  let registerUserAPI = API.apiConfig.createApi.createUser;
  console.log('login Api:', registerUserAPI);
  return dispatch => {
    return new Promise(function(resolve, reject) {
      try {
        console.log('------------------', username, password);

        fetch(registerUserAPI, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
            name: name,
            phoneNumber: phoneNumber,
          }),
        })
          .then(res => {
            console.log('status', res.status);

            if (res.status >= 200 && res.status <= 300) {
              return res.json();
            } else if(res.status==400){
                      return res.json()
                      }
                      else reject("API_ERROR")
          })
          .then(response => {
            console.log('response in:', response);

            if (response.status == true) {
              resolve(200);
              dispatch({type: ADD_TOKEN, token: response.body.id});
              dispatch({type: SET_USERNAME, username: username});
            } else {
              reject('ERROR');
            }
          })
          
      } catch (error) {
        reject('API_ERROR');
      }
    });
  };
}



export function register_SocialUser(username, password, name, phoneNumber,token) {
  let registerUserAPI = API.apiConfig.createApi.createUser;
  console.log('register Api:', registerUserAPI);
  return dispatch => {
    return new Promise(function(resolve, reject) {
      try {
        console.log('------------------', username, password,name);

        fetch(registerUserAPI, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
            //name: name,
            phoneNumber: phoneNumber,
            socialId : token
          }),
        })
          .then(res => {
            console.log('status', res.status);

            if (res.status >= 200 && res.status <= 300) {
              return res.json();
            } else if(res.status==400){
              return res.json()
              }
              else reject("API_ERROR")
          })
          .then(response => {
            console.log('response in:', response);

            if (response.status == true) {
              resolve(200);
              dispatch({type: ADD_TOKEN, token: response.body.id});
              dispatch({type: SET_USERNAME, username: username});
            } else if(response.message==="User Already Exists"){
              reject('USERNAME_ERROR');
            }
          
          })
          
      } catch (error) {
        reject('API_ERROR');
      }
    });
  };
}
