import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView 
} from 'react-native';
import {connect} from 'react-redux';


class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {}
  
  
  render() {
    
    return (
        
      <View style={style.container}>
        <Text style={{fontSize:30}}>Gupta</Text>
        
      </View>
      
      
    );
  }
}
const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
 
});

const mapStateToProps = state => ({

   
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);