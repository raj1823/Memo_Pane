
import {
  ADD_PERSONAL_COUNT,
  ADD_IDEAS_COUNT,
  ADD_LIST_COUNT,
  ADD_WORK_COUNT,
} from './constant';

import API from '../../config/env'

export function updateHome(category) {
  console.log(category, 'category');
  return dispatch => {
    switch (category) {
      case 'Personal':
        dispatch({type: ADD_PERSONAL_COUNT});
        break;

      case 'Ideas': {
        dispatch({type: ADD_IDEAS_COUNT});
        break;
      }
      case 'Work':
        dispatch({type: ADD_WORK_COUNT});
        break;
      case 'Lists':
        dispatch({type: ADD_LIST_COUNT});
        break;
    }
  };
}

export function addMyNote(myNote) {
    let createNoteAPI = API.apiConfig.createApi.createNotes;
    console.log('login Api:', createNoteAPI);
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
  
          }).catch(error=>{
              reject("API_ERROR")
          })
        } catch (error) {
            reject("API_ERROR")
        }
      });
    };
    
}
