import {
    
    AUTHENTICATION_SUCCESS,
   ADD_TOKEN,
   SET_USERNAME
  } from './constant';

  const initialState = {
    success: false,
    token : '',
    username: ''
    
  
   
  
  
  };

  const authenticate_Reducer = (state = initialState, action) => {
    console.log("authentication action called",action)
    switch (action.type) {
      
      case SET_USERNAME:
        return {
          ...state,
  
          username: action.username
  
        };
        case ADD_TOKEN : return { ...state, token : action.token}
      
        default:
            return state;
        }
      };
      
      export default authenticate_Reducer;