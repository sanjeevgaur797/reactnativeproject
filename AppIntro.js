/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import Pie from 'react-native-pie';
 import {
 
   StyleSheet, View, Text, ActivityIndicator, Button, Alert, SafeAreaView, FlatList, Image, ScrollView, ImageBackground, Touchable, TouchableOpacity, Switch, Dimensions, AsyncStorage
 
 } from 'react-native';
 import AppIntroSlider from 'react-native-app-intro-slider';
 
 import LinearGradient from 'react-native-linear-gradient';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import { colors } from '../../colors';
import ProductCategory from './ProductCategory';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { ProductActions } from '../actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
 const{width,height}=Dimensions.get("screen")
const slides = [
    {
      key: 1,
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: "https://i.pinimg.com/originals/19/dc/d9/19dcd9d5b8e5bf3cd93e067ea63d1f38.png",
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      image: "http://abeautifulmess.com/wp-content/uploads/2016/08/spanight.jpg",
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: "https://images-na.ssl-images-amazon.com/images/I/71zR-YLS6nL._SL1500_.jpg",
      backgroundColor: '#22bcb5',
    }
  ];

 class AppIntro extends Component {
   constructor(props) {
     super(props);
     this.state={
       switchEnable:false
     }
    }

      _renderItem = ({ item }) => {
        return (
          <View style={styles.slide}>
           
            <Image source={{uri:item.image}} style={{ width:width,height:height,resizeMode:'contain'}} />
           
          </View>
        );
      }
      _onDone = async() => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
       
       await AsyncStorage.setItem("introscreen","seen")
       this.props.navigation.replace("Login")
      }
      _nextButton = () => (
      <Ionicons name="arrow-forward-circle-sharp" size={35} />
      )
      _doneButton=()=>(
        <Ionicons name="checkmark-circle-sharp" size={35} />
     
      )
 
   render() {
     return (
       
           <AppIntroSlider
            renderItem={this._renderItem} 
            renderNextButton={this._nextButton}
            renderDoneButton={this._doneButton}
            data={slides} 
            onDone={this._onDone}
            showSkipButton
            activeDotStyle={{backgroundColor:'red'}}
             />
 
      
     );
   }
 }
 
 const styles = StyleSheet.create({
   linearGradient:{
 padding:15,
 margin:8,
 width:190,
 borderRadius:10
   },
   container: { alignItems: 'center', justifyContent: 'center', height:250 },
    gauge: {
      position: 'absolute',
      // width: 100,
      // height: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    gaugeText: {
      backgroundColor: 'transparent',
      color: '#000',
      fontSize: 24,
    },
 });
 
 function mapStateToProps(state) {
  return {
      state,
      


  };
}

export default compose(connect(mapStateToProps, {
  ...ProductActions
}))(AppIntro)
 