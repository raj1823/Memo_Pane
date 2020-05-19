import API from '../../config/env';
import {AUTHENTICATION_SUCCESS} from './constant'



export function authenticate_User(username,password) {
  let loginAPI = API.apiConfig.authenticationApi.loginUserHandle;
  console.log('login Api:', loginAPI);
  return dispatch => {

    return new Promise(function(resolve, reject) {

        
      try {
        console.log("------------------",username,password)
        

        fetch(loginAPI,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
              },
            body : JSON.stringify({
                username : username,
                password : password
            })
        }).then(res=>{

            console.log("status",res.status)

            
            if(res.status>=200 && res.status<=300)
            {
                return res.json()
                

            }
         
            else 
            reject("API_ERROR")
        }).then(response=>{

            console.log("response in:",response)

            if(response.status==true)
            {    
                resolve(200)
                dispatch({type:AUTHENTICATION_SUCCESS})

            }
            else{
                reject("ERROR")
            }

        })
      } catch (error) {
          reject("API_ERROR")
      }
    });
  };
}
