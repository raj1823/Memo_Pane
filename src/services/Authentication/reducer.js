import {
    
    AUTHENTICATION_SUCCESS,
   ADD_TOKEN,
   SET_USERNAME,
   SET_SOCIAL_ID
  } from './constant';

  const initialState = {
    success: false,
    token : '',
    username: '',
    socialId: ''
    
  
   
  
  
  };

  const authenticate_Reducer = (state = initialState, action) => {
    console.log("authentication action called",action)
    switch (action.type) {
      
      case SET_USERNAME:
        return {
          ...state,
  
          username: action.username
  
        };
        case SET_SOCIAL_ID:
          return{
            ...state,
            socialId: action.token
          }
        case ADD_TOKEN : return { ...state, token : action.token}
      
        default:
            return state;
        }
      };
      
      export default authenticate_Reducer;