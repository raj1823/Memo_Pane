import {
    
    ADD_PERSONAL_COUNT,
    SUBTRACT_PERSONAL_COUNT,
    ADD_WORK_COUNT,
    SUBTRACT_WORK_COUNT,
    ADD_IDEAS_COUNT,
    SUBTRACT_IDEAS_COUNT,
    ADD_LIST_COUNT,
    SUBTRACT_LIST_COUNT
   
  } from './constant';

  const initialState = {
    personalCount:0,
    workCount:0,
    ideasCount:0,
    listCount:0,
    
  
   
  
  
  };

  const data_Reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PERSONAL_COUNT:
        return {
          ...state,
  
          personalCount : personalCount+1
  
        };
        case SUBTRACT_PERSONAL_COUNT:
        return {
          ...state,
  
          personalCount : personalCount-1
  
        };
        case ADD_WORK_COUNT:
        return {
          ...state,
  
          workCount : workCount+1
  
        };
        case SUBTRACT_WORK_COUNT:
            return {
              ...state,
      
              workCount : workCount-1
      
            };

        case ADD_IDEAS_COUNT:
            return {
                ...state,
          
                ideasCount : ideasCount+1
          
                };
         case SUBTRACT_IDEAS_COUNT:
            return {
                ...state,
          
                ideasCount : ideasCount-1
          
                };   
        case ADD_LIST_COUNT:
            return {
                ...state,
          
                listCount : listCount+1
          
                };  
         case SUBTRACT_LIST_COUNT:
            return {
                ...state,
          
                ideasCount : ideasCount-1
          
                };        
      
        default:
            return state;
        }
      };
      
      export default data_Reducer;