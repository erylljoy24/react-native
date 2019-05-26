import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Button,
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }
  static navigationOptions = {
    title: 'Practice',
  };


  async componentDidMount(){
    return fetch('https://api.myjson.com/bins/7yfn8')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson.movies,
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
            <View style={styles.listStyle}>
              <Image
                style={{width:80, height:100}}
                source={{uri: item.image}}
              />
              <View style={{flex:1, marginLeft: 5}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', fontStyle: 'italic'}}>{item.title}</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', fontStyle: 'italic'}}>{item.releaseYear}</Text>
              </View>

              <View style={styles.thirdFlexBox}>
                <TouchableOpacity 
                  style={styles.sampleButton}
                  onPress={this.onPressEvent}
                  underlayColor='#fff'>
                    
                    <Text style={{color:'#ffffff', textAlign:'center'}}>Book</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.sampleButton}
                  onPress={this.onPressEvent}
                  underlayColor='#fff'>
                    
                    <Text style={{color:'#ffffff', textAlign:'center'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              {/* onPress={() => navigate('HomeScreen')} */}
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
      );
    }
    
  }

  onPressEvent(){

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  thirdFlexBox:{
    flex: 1, 
    width: 0
  },
  sampleButton:{
    width: 90,
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#1E6738',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  }
});
