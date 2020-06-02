import {
  ADD_PERSONAL_COUNT,
  ADD_IDEAS_COUNT,
  ADD_LIST_COUNT,
  ADD_WORK_COUNT,
  SUBTRACT_LIST_COUNT,
  SUBTRACT_IDEAS_COUNT,
  SUBTRACT_PERSONAL_COUNT,
  SUBTRACT_WORK_COUNT,
  SET_NOTE_DATA,
  CLEAR_NOTE_DATA,
  PERSONAL,
  WORK,
  IDEAS,
  LISTS,
  USER_NOTES,
  SET_COUNTS,
  LOGOUT,
  DATA_PRE_EXIST,
  SELECTED_NOTE_ID
} from './constant';

import API from '../../config/env';

export const isDataPreExisted=(length)=>dispatch=>{
  dispatch({
    type:DATA_PRE_EXIST,
    length:length
  })
}
export const updateSelectedNoteId=(id)=>dispatch=>{
  dispatch({
    type: SELECTED_NOTE_ID,
    id:id
  })
}

export const isLoggedOut = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};

export function setCountsView(data) {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log('note DATA(array):', data);

  let count_data = {
    pc: 0,
    wc: 0,
    ic: 0,
    lc: 0,
  };

  data.forEach(item => {
    switch (item.data.split('$$$')[0]) {
      case 'Personal':
        count_data.pc++;
        break;
      case 'Ideas':
        count_data.ic++;
        break;
      case 'Work':
        count_data.wc++;
        break;
      case 'Lists':
        count_data.lc++;
        break;
    }
  });
  console.log('count data after loop', count_data);
  return ({type: SET_COUNTS, count_data: count_data});
}

export function loadUserNotes(token) {
  let loadNotesAPI = API.apiConfig.fetchDataApi.fetchNotes;
  console.log('load notes Api:', loadNotesAPI + token);
  return dispatch => {
    try {
      fetch(loadNotesAPI + token, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
      })
        .then(res => {
          console.log('load note status', res.status);

          if (res.status >= 200 && res.status <= 300) {
            return res.json();
          } else {
          }
        })
        .then(response => {
          console.log('data response:', response);

          if (response.status === true) {
            //resolve(200)
            dispatch(setCountsView(response.response));
            dispatch({type: USER_NOTES, data: response.response.reverse()});
          } else {
            alert('Cannot load Notes at this moment!');
          }
        });
    } catch (error) {
      alert('API_ERROR');
    }
  };
}
export function loadUserNotesDescription(token) {
  let loadNotesAPI = API.apiConfig.fetchDataApi.fetchNotes;
  console.log('load notes Api:', loadNotesAPI + token);
  return dispatch => {
    try {
      fetch(loadNotesAPI + token, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
      })
        .then(res => {
          console.log('load note status', res.status);

          if (res.status >= 200 && res.status <= 300) {
            return res.json();
          } else {
          }
        })
        .then(response => {
          console.log('data response:', response);

          if (response.status === true) {
            //resolve(200)
           
            dispatch({type: USER_NOTES, data: response.response.reverse()});
          } else {
            alert('Cannot load Notes at this moment!');
            
          }
        });
    } catch (error) {
      alert('API_ERROR');
    }
  };
}

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
      case 'deletePersonal':
        dispatch({type: SUBTRACT_PERSONAL_COUNT});
        break;
      case 'deleteIdeas':
        dispatch({type: SUBTRACT_IDEAS_COUNT});
        break;
      case 'deleteWork':
        dispatch({type: SUBTRACT_WORK_COUNT});
        break;
      case 'deleteLists':
        dispatch({type: SUBTRACT_LIST_COUNT});
        break;
    }
  };
}

export function setNoteData(title, data) {
  return dispatch => {
    dispatch({type: SET_NOTE_DATA, noteData: data, noteTitle: title});
  };
}

export function clearNoteData() {
  return dispatch => {
    dispatch({type: CLEAR_NOTE_DATA});
  };
}

export function viewOpenCategoryNotes(category) {
  return dispatch => {
    switch (category) {
      case 'Personal':
        dispatch({type: PERSONAL});
        break;

      case 'Ideas': {
        dispatch({type: IDEAS});
        break;
      }
      case 'Work':
        dispatch({type: WORK});
        break;
      case 'Lists':
        dispatch({type: LISTS});
        break;
    }
  };
}

export function addMyNote(title, data, token) {
  let createNoteAPI = API.apiConfig.createApi.createNotes;
  console.log('login Api:', createNoteAPI + token);
  return dispatch => {
    try {
      console.log('------------------', title, data);

      fetch(createNoteAPI + token, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          notes: [
            {
              title: title,
              data: data,
            },
          ],
        }),
      })
        .then(res => {
          console.log('add note status', res.status);

          if (res.status >= 200 && res.status <= 300) {
            return res.json();
          } else reject('API_ERROR');
        })
        .then(response => {
          console.log('response in:', response);

          if (response.status == true) {
          } else {
            alert('Cannot add Note at this moment!');
          }
        })
        .catch(error => {
          alert('ERROR');
        });
    } catch (error) {
      alert('API_ERROR');
    }
  };
}

export function deleteNote(token, noteId) {
  let deleteNoteAPI = API.apiConfig.deleteData.deleteNote;
  console.log('delete note Api:', deleteNoteAPI + token + noteId);
  return dispatch => {
    return new Promise(function(resolve, reject) {
      try {
        fetch(deleteNoteAPI + token + '/' + noteId, {
          method: 'DELETE',
        }).then(res => {
          if (res.status >= 200 && res.status <= 300) {
            resolve(200);
          } else reject('ERROR');
        });
      } catch (error) {
        reject('ERROR');
      }
    });
  };
}
