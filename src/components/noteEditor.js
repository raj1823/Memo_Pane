import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';


class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',

      leftArrow: require('../../assets/leftArrow.png'),
    };
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
    console.log('add note props', this.props);
    

    return (
        <SafeAreaView style={{flex:1}}>
      <View style={style.container}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'yellow',
            // justifyContent: 'center',
          }}>
          <View>
            <View style={{height: 35, width: 35, backgroundColor: 'white'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  source={this.state.leftArrow}
                  style={{height: 35, width: 35, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{flex: 12, backgroundColor: 'lightgreen'}}>
          <View style={{backgroundColor: 'red'}}>
            <Text style={{marginVertical: 10, marginLeft: 15, fontSize: 16}}>
              {this.state.date}
            </Text>
          </View>

          <View style={{backgroundColor: 'orange', height: 40, marginTop: 10}}>
           <View
              style={{
                justifyContent: 'center',
                height: 40,
                marginLeft: 14,
                //flexDirection:"row"
              }}>
               <Text
                style={{
                  fontSize: 20,
                }}>
             
                Category:
              </Text> 
              
              
            </View>
           
          </View>

          <View style={{marginVertical: 20, backgroundColor: 'cyan'}}>
            <TextInput
              placeholder={'Add Notes'}
              multiline={true}
              style={{marginHorizontal: 15, fontSize: 18,marginBottom:20}}
            />
          </View>
        </View>
      </View>
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteEditor);
