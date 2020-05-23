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
import {OpenModal} from './customModal';
import {TextInput} from 'react-native-gesture-handler';
import {updateHome} from '../services/Data/action';

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteData:'',
      visible: false,
      date: '',
      selectedCategory: 'Personal',
      leftArrow: require('../../assets/leftArrow.png'),
      data: [
        {value: 'Personal'},
        {value: 'Ideas'},
        {value: 'Work'},
        {value: 'Lists'},
      ],
    };
  }
  addNote(myNote){

    //this.props.addMyNote(myNote)
  }

  updateDashboard(category) {
    this.props.updateHome(category);
  }

  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
  }

  render() {
    console.log("notes prop",this.props)
    console.log( "user token",this.props.token)
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
                    this.props.navigation.goBack();
                    this.updateDashboard(this.state.selectedCategory);
                    this.addNote()
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
                  placeholder={'Add Notes'}
                  multiline={true}
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
  token: state.authenticate_Reducer.token
});
const mapDispatchToProps = {
  updateHome: updateHome,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteEditor);
