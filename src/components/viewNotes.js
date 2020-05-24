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



class ViewNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    
    }
}
  

  componentDidMount() {}
  
  
  render() {
   
        const {noteTitle,noteCount}=this.props
    
    
    return (
        
      <SafeAreaView style={style.container}>
       <View style={style.headerStyling}>
       <View style={style.middleTextView}>
              <Text style={style.notesTypeStyling}>{noteTitle}</Text>
              <Text style={style.notesCountStyling}>
                {noteCount}
              </Text>
            </View>

       </View>

       <View style={style.notesViewStyling}>


       </View>
        
      </SafeAreaView>
  
      
      
    );
  }
}
const style = StyleSheet.create({
    notesViewStyling:{
        flex:3,
        backgroundColor:"orange"
    },
    headerStyling:{
        flex:1,
        backgroundColor:"lightgreen",
        justifyContent:"center"
    },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  middleTextView: {
    marginVertical: 15,
   
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  notesTypeStyling: {
    fontWeight: '700',
    color: '#e62c2c',

    fontSize: 50,
    flex: 3,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  notesCountStyling: {
    textAlign: 'center',
    color: '#e62c2c',
    fontSize: 50,

    flex: 1,
    fontWeight: '700',
  },
 
});

const mapStateToProps = state => ({
 noteTitle : state.data_Reducer.selectedCategory,
 noteCount : state.data_Reducer.selectedCategoryNotesCount
   
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewNotes);