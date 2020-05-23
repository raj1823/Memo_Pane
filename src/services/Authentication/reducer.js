import {
    
    AUTHENTICATION_SUCCESS,
   ADD_TOKEN
  } from './constant';

  const initialState = {
    success: false,
    token : ''
    
  
   
  
  
  };

  const authenticate_Reducer = (state = initialState, action) => {
    console.log("action called",action)
    switch (action.type) {
      
      case AUTHENTICATION_SUCCESS:
        return {
          ...state,
  
          success: true,
  
        };
        case ADD_TOKEN : return { ...state, token : action.token}
      
        default:
            return state;
        }
      };
      
      export default authenticate_Reducer;