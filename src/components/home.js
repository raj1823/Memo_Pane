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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIcon: require('../../assets/hamburger.png'),
      addIcon: require('../../assets/add.png'),
    };
  }
  componentDidMount() {}

  render() {
    console.log("home props",this.props)
    return (
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <View style={style.topSection}>
            <View style={{flex: 4}}>
              <Text style={style.leftTopText}>My</Text>
            </View>
            <View style={{flex: 7}}>
              <Text style={style.rightTopText}>Notes</Text>
            </View>
          </View>
        </View>

        <View style={style.middleSection}>
          <View style={style.middleViewWrapper}>
            <View style={style.middleTextView}>
              <Text style={style.notesTypeStyling}>Personal</Text>
              <Text style={style.notesCountStyling}>
                {this.props.personalCount}
              </Text>
            </View>
          </View>
          <View style={style.middleViewWrapper}>
            <View style={style.middleTextView}>
              <Text style={style.notesTypeStyling}>Work</Text>
              <Text style={style.notesCountStyling}>
                {this.props.workCount}
              </Text>
            </View>
          </View>
          <View style={style.middleViewWrapper}>
            <View style={style.middleTextView}>
              <Text style={style.notesTypeStyling}>Ideas</Text>
              <Text style={style.notesCountStyling}>
                {this.props.ideasCount}
              </Text>
            </View>
          </View>
          <View style={style.middleViewWrapper}>
            <View style={style.middleTextView}>
              <Text style={style.notesTypeStyling}>Lists</Text>
              <Text style={style.notesCountStyling}>
                {this.props.listCount}
              </Text>
            </View>
          </View>
        </View>

        <View style={style.footer}>
          <View style={style.footerView}>
            <View style={style.menuView}>
              <View
                style={{
                  width: '40%',
                }}>
                <TouchableOpacity onPress={()=>{
              this.props.navigation.openDrawer()
            }}>
                  <Image
                    source={this.state.menuIcon}
                    style={style.menuIconStyling}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={style.addNoteView}>
              <View style={style.addButtonWrapper}>
                <TouchableOpacity onPress={()=>{

                  this.props.navigation.navigate("My Note")
                }}>
                  <Image
                    source={this.state.addIcon}
                    style={style.addIconStyling}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  addButtonWrapper: {
    height: '80%',
    width: '55%',
    alignSelf: 'flex-end',
    marginRight: 22,
    borderRadius: 45,
  },
  addIconStyling: {
    height: 90,
    width: 95,
    resizeMode: 'stretch',
    alignSelf: 'flex-end',
  },
  menuIconStyling: {
    height: 40,
    width: 65,
    resizeMode: 'stretch',
  },
  menuView: {
    flex: 1,

    marginLeft: 24,
    justifyContent: 'flex-end',
    paddingBottom: 9,
  },
  addNoteView: {
    flex: 1,

    justifyContent: 'flex-end',
  },

  footerView: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  middleViewWrapper: {
    marginVertical: 8,
  },
  notesCountStyling: {
    textAlign: 'center',
    color: '#444987',
    fontSize: 44,

    flex: 6,
    fontWeight: '700',
  },
  notesTypeStyling: {
    fontWeight: '700',
    color: '#444987',

    fontSize: 44,
    flex: 9,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  middleTextView: {
    marginVertical: 15,

    flexDirection: 'row',
    marginHorizontal: 20,
  },
  leftTopText: {
    fontSize: 56,
    color: '#e62c2c',
    fontWeight: '800',
    alignSelf: 'flex-end',
    paddingRight: 20,
  },
  rightTopText: {
    fontSize: 56,
    color: '#444987',
    fontWeight: '800',
  },
  topSection: {
    flexDirection: 'row',
  },
  header: {
    flex: 1.5,

    justifyContent: 'center',
  },
  middleSection: {
    flex: 3,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
});

const mapStateToProps = state => ({
  personalCount: state.data_Reducer.personalCount,
  workCount: state.data_Reducer.workCount,
  ideasCount: state.data_Reducer.ideasCount,
  listCount: state.data_Reducer.listCount,
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
