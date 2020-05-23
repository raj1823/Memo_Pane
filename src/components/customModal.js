import React, {useState} from 'react'
import {
    View,
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,Modal
  } from 'react-native';

  const style = StyleSheet.create({
    centeredView: {
      
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'lightgreen',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
  });


export function OpenModal() {

    const [visible, setVisible]=useState(true)
    var data=[{value: "Personal"},{value: "Ideas"}, {value:"Work"},{value:"List"}]
    return (
        <View style={style.centeredView}>
          <Modal
            animationType={'fade'}
            transparent={true}
            
            visible={visible}>
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <FlatList
                  data={data}
                  renderItem={({item,key}) => {
                    return (
                      <Text style={{fontSize: 20, alignSelf: 'center'}}>
                        {item.value}
                      </Text>
                    );
                  }}
                />
  
                <TouchableOpacity
                  style={{marginVertical: 15}}
                  onPress={() => {
                    setVisible(false)
                  }}>
                  <Text
                    style={{
                      borderColor: '#000',
                      borderWidth: 2,
                      fontSize: 15,
                      alignSelf: 'flex-start',
                      padding: 5,
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    
}