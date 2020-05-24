import {
  ADD_PERSONAL_COUNT,
  SUBTRACT_PERSONAL_COUNT,
  ADD_WORK_COUNT,
  SUBTRACT_WORK_COUNT,
  ADD_IDEAS_COUNT,
  SUBTRACT_IDEAS_COUNT,
  ADD_LIST_COUNT,
  SUBTRACT_LIST_COUNT,
  SET_NOTE_DATA,
  CLEAR_NOTE_DATA,
  PERSONAL,
  WORK,
  IDEAS,
  LISTS
} from './constant';

const initialState = {
  personalCount: 0,
  workCount: 0,
  ideasCount: 0,
  listCount: 0,
  noteTitle: '',
  noteData: '',
  selectedCategory : '',
  selectedCategoryNotesCount : null
};

const data_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONAL : return{
      ...state, 
      selectedCategory : "Personal",
      selectedCategoryNotesCount : state.personalCount
    }
    case IDEAS : return{
      ...state, 
      selectedCategory : "Ideas",
      selectedCategoryNotesCount : state.ideasCount
    }
    case WORK : return{
      ...state, 
      selectedCategory : "Work",
      selectedCategoryNotesCount : state.workCount
    }
    case LISTS : return{
      ...state, 
      selectedCategory : "Lists",
      selectedCategoryNotesCount : state.listCount
    }
    case ADD_PERSONAL_COUNT:
      return {
        ...state,

        personalCount : state.personalCount + 1,
      };
    case SUBTRACT_PERSONAL_COUNT:
      return {
        ...state,

        personalCount : state.personalCount - 1,
      };
    case ADD_WORK_COUNT:
      return {
        ...state,

        workCount : state.workCount + 1,
      };
    case SUBTRACT_WORK_COUNT:
      return {
        ...state,

        workCount : state.workCount - 1,
      };

    case ADD_IDEAS_COUNT:
      return {
        ...state,

        ideasCount : state.ideasCount + 1,
      };
    case SUBTRACT_IDEAS_COUNT:
      return {
        ...state,

        ideasCount : state.ideasCount - 1,
      };
    case ADD_LIST_COUNT:
      return {
        ...state,

        listCount : state.listCount + 1,
      };
    case SUBTRACT_LIST_COUNT:
      return {
        ...state,

        ideasCount : state.ideasCount - 1,
      };
    case SET_NOTE_DATA:
      return {
        ...state,
        noteData : action.noteData,
        noteTitle : action.noteTitle,
      };
      case CLEAR_NOTE_DATA:
        return{
          ...state,
          noteData : '',
          noteTitle: ''
        }

    default:
      return {...state};
  }
};

export default data_Reducer;
