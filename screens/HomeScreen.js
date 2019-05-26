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
    try {
      const response = await fetch('https://api.myjson.com/bins/7yfn8');
      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        dataSource: responseJson.movies,
      });
    }
    catch (error) {
      console.log(error);
    }
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
                style={{width:50, height:50}}
                source={{uri: item.image}}
              />
              <View style={{flex:1, marginLeft: 5}}>
                <Text style={{fontSize: 15, fontStyle: 'italic'}}>{item.title}</Text>
                <Text style={{fontSize: 15, fontStyle: 'italic'}}>{item.releaseYear}</Text>
              </View>

              <View style={styles.thirdFlexBox}>
                <Button
                  onPress={this.onPressEvent}
                  style = {{width:'70%'}}
                  title='Book'
                  color="#841584"
                />
                <Button
                  onPress={this.onPressEvent}
                  title='Cancel'
                  color="#841584"
                />
              </View>
              
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
    width: 60
  }
});
