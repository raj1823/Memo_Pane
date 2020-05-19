import {
    AUTHENTICATION_FAILURE,
    AUTHENTICATION_SUCCESS,
   
  } from './constant';

  const initialState = {
    success: false,
    
  
   
  
  
  };

  const authenticate_Reducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTHENTICATION_SUCCESS:
        return {
          ...state,
  
          success: true,
  
        };
      
        default:
            return state;
        }
      };
      
      export default authenticate_Reducer;