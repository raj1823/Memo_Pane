import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Picker,
  Modal,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import {TextInput} from 'react-native-gesture-handler';
import {
  updateHome,
  setNoteData,
  clearNoteData,
  addMyNote,
  deleteNote,
  loadUserNotesDescription,
  toggleIsDataExist,
} from '../services/Data/action';

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.noteTitle,
      noteData: props.noteData,
      length: props.dataLength,

      visible: false,
      date: '',
      selectedCategory: props.selectedCategory,

      leftArrow: require('../../assets/leftArrow.png'),
      data: [
        {value: 'Personal'},
        {value: 'Ideas'},
        {value: 'Work'},
        {value: 'Lists'},
      ],
    };
  }

  setNoteData(title, data) {
    this.props.setNoteData(title, data);
  }
  clearNoteData() {
    this.props.clearNoteData();
  }
  addNote(title, data) {
    let updatedData = this.state.selectedCategory + '$$$' + data;
    console.log('token token token', title, data);
    if (title && data) {
      this.props.addMyNote(title, updatedData, this.props.token);
    } else if (!title && data) {
      this.props.addMyNote(' ', updatedData, this.props.token);
    }
  }

  updateDashboard(category) {
    const {title, noteData} = this.state;
    if (title && noteData) this.props.updateHome(category);
    else if (!title && noteData) {
      this.props.updateHome(category);
    }
  }

  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    that.setState({
      date: date + '/' + month + '/' + year + ' ' + hours + ':' + min,
    });

    if (this.state.noteData.search('$$$') != -1) {
      this.setState({noteData: this.state.noteData.split('$$$')[1]});
    }
  }
  doRequiredOperations() {
    console.log(
      'note id in operations-------------------------------------------------',
      this.props.selectedNoteId,
    );

    this.props.navigation.goBack();
    this.clearNoteData();
    if (this.props.isNoteDataPreExist) {
      console.log('props length', this.props.dataLength, this.state.length);
      console.log('*******************');
      console.log('note data exist');
      if (this.props.dataLength != this.state.length) {
        if (this.props.selectedCategory != this.state.selectedCategory) {
          console.log('*******************');
          console.log('different length with different CATEGORY');
          this.addNote(this.state.title, this.state.noteData);
          this.props
            .deleteNote(this.props.token, this.props.selectedNoteId)
            .then(
              resolve => {
                if (resolve == 200) {
                  this.props.loadUserNotesDescription(this.props.token);
                }
              },

              reject => {
                if (reject == 'ERROR') {
                  alert('Cannot Delete Record');
                }
              },
            );
          this.props.updateHome('delete' + this.props.selectedCategory);
          this.updateDashboard(this.state.selectedCategory);
        } else {
          console.log('*******************');
          console.log('different length with SAME CATEGORY');
          this.addNote(this.state.title, this.state.noteData);
          this.props
            .deleteNote(this.props.token, this.props.selectedNoteId)
            .then(
              resolve => {
                if (resolve == 200) {
                  this.props.loadUserNotesDescription(this.props.token);
                }
              },

              reject => {
                if (reject == 'ERROR') {
                  alert('Cannot Delete Record');
                }
              },
            );
        }
      } else if (this.props.selectedCategory != this.state.selectedCategory) {
        console.log('*******************');
        console.log('SAME length with Different CATEGORY');
        this.addNote(this.state.title, this.state.noteData);
        this.updateDashboard(this.state.selectedCategory);
        this.props.deleteNote(this.props.token, this.props.selectedNoteId).then(
          resolve => {
            if (resolve == 200) {
              this.props.loadUserNotesDescription(this.props.token);
            }
          },

          reject => {
            if (reject == 'ERROR') {
              alert('Cannot Delete Record');
            }
          },
        );
        this.props.updateHome('delete' + this.props.selectedCategory);
      }

      this.props.toggleIsDataExist(this.props.isNoteDataPreExist);
    } else {
      console.log('*******************');
      console.log('note data DO NOT exist');
      this.updateDashboard(this.state.selectedCategory);
      this.addNote(this.state.title, this.state.noteData);
    }
  }
  setLength(text) {
    this.setState({length: text.length});
    console.log(
      'in SET LENGTHxxxxxxxxxxxxxxxxxxxxx',
      this.props.dataLength,
      this.state.length,
    );
  }

  render() {
    console.log('BEFORE RENDER::::::::::::::', this.props.selectedNoteId);
    console.log('notes prop', this.props);
    console.log('user token', this.props.token);
    console.log('notes states', this.state);
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.state.visible ? (
          <View style={style.centeredView}>
            <Modal
              animationType={'fade'}
              transparent={'true'}
              visible={this.state.visible}>
              <View style={style.centeredView}>
                <View style={style.modalView}>
                  <FlatList
                    data={this.state.data}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          style={{marginVertical: 10}}
                          onPress={() => {
                            this.setState({
                              visible: false,
                              selectedCategory: item.value,
                            });
                          }}>
                          <Text style={{fontSize: 24, alignSelf: 'center'}}>
                            {item.value}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View style={style.container}>
            <View
              style={{
                flex: 1,
                //backgroundColor: 'yellow',
              }}>
              <View style={{height: 35, width: 35, backgroundColor: 'white'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.doRequiredOperations();
                  }}>
                  <Image
                    source={this.state.leftArrow}
                    style={{height: 35, width: 35, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              </View>
              <View style={{}}>
                <Text
                  style={{marginVertical: 10, marginLeft: 15, fontSize: 16}}>
                  {this.state.date}
                </Text>
              </View>
            </View>

            <View style={{flex: 12}}>
              <View
                style={{
                  flex: 1,
                  height: 40,
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    height: 40,
                    marginLeft: 14,
                    //backgroundColor: 'blue',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                    }}>
                    Category:
                  </Text>
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                  <View
                    style={{
                      borderRadius: 1,
                      borderColor: 'black',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <View style={{justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: 20,
                          paddingHorizontal: 15,
                          alignSelf: 'center',
                        }}>
                        {' '}
                        {this.state.selectedCategory}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setNoteData(
                            this.state.title,
                            this.state.noteData,
                          );
                          this.setState({visible: true});
                        }}>
                        <Image
                          source={require('../../assets/downArrow.png')}
                          style={{height: 35, width: 35, alignSelf: 'center'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginVertical: 20,
                  marginVertical: 10,
                  marginHorizontal: 10,
                  flex: 12,
                  borderWidth: 1,
                  borderColor: 'black',
                }}>
                <TextInput
                  placeholder={'Title'}
                  defaultValue={this.props.noteTitle}
                  multiline={true}
                  onChangeText={text => {
                    this.setState({title: text});
                  }}
                  style={{
                    marginHorizontal: 15,
                    fontSize: 22,
                    marginBottom: 10,
                    fontWeight: '600',
                  }}
                />
                <TextInput
                  placeholder={'Add Notes'}
                  defaultValue={this.state.noteData}
                  multiline={true}
                  onChangeText={text => {
                    this.setLength(text);
                    this.setState({noteData: text});
                  }}
                  style={{marginHorizontal: 15, fontSize: 18, marginBottom: 20}}
                />
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalView: {
    margin: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#ebe6e6',

    width: '100%',
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

const mapStateToProps = state => ({
  token: state.authenticate_Reducer.token,
  noteData: state.data_Reducer.noteData,
  noteTitle: state.data_Reducer.noteTitle,
  selectedCategory: state.data_Reducer.selectedCategory,
  isNoteDataPreExist: state.data_Reducer.isNoteDataPreExist,
  dataLength: state.data_Reducer.dataLength,
  selectedNoteId: state.data_Reducer.selectedNoteId,
});
const mapDispatchToProps = {
  updateHome: updateHome,
  setNoteData: setNoteData,
  clearNoteData: clearNoteData,
  addMyNote: addMyNote,
  deleteNote: deleteNote,
  loadUserNotesDescription: loadUserNotesDescription,
  toggleIsDataExist: toggleIsDataExist,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteEditor);
