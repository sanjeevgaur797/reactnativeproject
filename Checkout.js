
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


 import { NavigationContainer, StackActions } from '@react-navigation/native';

 import React, { Component } from 'react';
 
 import {
 
     StyleSheet, View, Text, ActivityIndicator, Button, Alert, SafeAreaView, FlatList, Image, ScrollView, ImageBackground, Touchable, TouchableOpacity, Switch, Dimensions, TextInput, AsyncStorage
 
 } from 'react-native';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import { circle } from 'react-native/Libraries/Animated/Easing';
 import { colors } from '../../colors';
 
 import LinearGradient from 'react-native-linear-gradient';
 import { CartAction, LoginAction, ProductActions } from '../actions';
 import { connect } from 'react-redux';
 import Toast from 'react-native-simple-toast';
 import Spinner from 'react-native-loading-spinner-overlay';
 import { State } from 'react-native-gesture-handler';
 
 const { width, height } = Dimensions.get("screen")
 
 
 
 
 class Checkout extends Component {
     constructor(props) {
         super(props);
         this.state = {
             item: [],
 
         }
     }
 
 
 
 
 
     render() {
       
         var total = 0
         return (
             <View style={{flex:1,backgroundColor:'red'}}>
             <View style={{flexDirection:'row',backgroundColor:colors.white,padding:5,alignItems:'center'}}>
    
    <Ionicons name={"arrow-back-sharp"} size={30} onPress={()=>{this.props.navigation.goBack()}}/>
    <Text>Back</Text>

          </View>
  <ScrollView>
  <Text>hello</Text>
  </ScrollView>
  <TouchableOpacity style={{backgroundColor:'#1B1464',alignItems:'center',justifyContent:'center',padding:10,position:"relative",overflow:"scroll"}}>
      
 <Text style={{fontWeight:'bold',color:colors.white,fontSize:15,textTransform:"uppercase"}}>Place Order</Text>
  </TouchableOpacity>
            
             </View>
         );
     }
 }
 
 const styles = StyleSheet.create({
     linearGradient: {
         padding: 15,
         margin: 8,
         width: 270,
         borderRadius: 10
     }
 });
 
 
 
 function mapStateToProps(state) {
     return {
         state,
        
     };
 }
 
 export default connect(mapStateToProps, {
    ...CartAction
 
 })(Checkout)
 
 
 