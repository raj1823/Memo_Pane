import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import CardView from 'react-native-cardview';
import {deleteNote, loadUserNotes} from '../services/Data/action'

class ViewNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteIcon: require('../../assets/delete.png'),
    };
  }

  deleteNote(noteId){

    this.props.deleteNote(this.props.token,noteId).then(
        resolve => {
          if (resolve == 200) {
           this.props.loadUserNotes(this.props.token)
          }},
                      
           reject => {
            if(reject=="ERROR")
            {
            alert('Cannot Delete Record');
            
            }
          })
                      
  }

  componentDidMount() {}

  render() {
    const {noteTitle, noteCount} = this.props;
    console.log('notes:', this.props.userNotes);

    return (
      <SafeAreaView style={style.container}>
        <View style={style.headerStyling}>
          <View style={style.middleTextView}>
            <Text style={style.notesTypeStyling}>{noteTitle}</Text>
            <Text style={style.notesCountStyling}>{noteCount}</Text>
          </View>
        </View>

        <View style={style.notesViewStyling}>
          <FlatList
            data={this.props.userNotes}
            renderItem={({item}) => {
              return (
                <CardView
                  cardElevation={4}
                  cardMaxElevation={7}
                  cornerRadius={4}
                  style={style.cardviewStyling}>
                      <View>

               
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '80%'}}>
                      <Text style={style.cardViewTextStyling}>
                        {item.title}
                      </Text>
                    
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                    
                        width: '20%',
                        marginVertical:15,
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={()=>{
                          this.deleteNote(item.id)
                      }}>
                        <Image
                          source={this.state.deleteIcon}
                          style={{
                            height: 35,
                            width: 35,
                            resizeMode: 'contain',
                           
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                  <Text
                        style={{
                          fontSize: 14,
                          marginLeft: 10,
                          marginVertical: 7,
                          color: '#444987',
                        }}>
                        {item.data}
                      </Text>
                  </View>
                  </View>
                </CardView>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  cardViewTextStyling: {
    fontSize: 22,
    marginLeft: 10,
    marginTop: 20,
    color: '#e62c2c',
  },
  cardviewStyling: {
    backgroundColor: '#fff',
    marginBottom: 15,
    marginHorizontal: 10,
    shadowOffset: {
      height: 10,
      width: 4,
    },
    shadowOpacity: 0.2,
    shadowColor: 'grey',
  },
  notesViewStyling: {
    flex: 3,
    //backgroundColor:"orange"
  },
  headerStyling: {
    flex: 1,
    // backgroundColor:"lightgreen",
    justifyContent: 'center',
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
  noteTitle: state.data_Reducer.selectedCategory,
  noteCount: state.data_Reducer.selectedCategoryNotesCount,
  userNotes: state.data_Reducer.userNotes,
  token: state.authenticate_Reducer.token
});
const mapDispatchToProps = {
    deleteNote : deleteNote,
    loadUserNotes : loadUserNotes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewNotes);
