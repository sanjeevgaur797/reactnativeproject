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

  StyleSheet, View, Text, ActivityIndicator, Button, Alert, SafeAreaView, FlatList, Image, ScrollView, ImageBackground, Touchable, TouchableOpacity, Switch, TextInput

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { circle } from 'react-native/Libraries/Animated/Easing';
import { colors } from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import { nativeViewProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      
      item:{ }
    }
  }
  
  UNSAFE_componentWillMount(){
    this.setState({item:this.props.route.params.item})
    }
  render() {
    return (
      <View>
      <View style={{flexDirection:'row',backgroundColor:colors.white,padding:5}}>
<Ionicons name={"arrow-back-sharp"} size={30} onPress={()=>{this.props.navigation.goBack()}}/>

      </View>
     
          <Text>{this.state.item.name}</Text>
          <View style={{backgroundColor:colors.white,borderRadius:30,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',margin:20}}>
          <TextInput placeholder='Enter name' style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}  />

          </View>
          <View style={{backgroundColor:colors.white,borderRadius:30,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',margin:20,}}>
          <TextInput placeholder='Enter Password' keyboardType={"email-address"} style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}} autoCompleteType={'password'} />

          </View>
                    <View style={{elevation:1,backgroundColor:"#dfe6e6",flexDirection:'row',justifyContent:'space-between',padding:15,borderTopWidth:1.5,borderTopColor:'grey',marginTop:430}}>
 <View style={{width:120,height:30,backgroundColor:'red',borderRadius:20,}}>
 {this.state.switchEnable ? 
 <TouchableOpacity onPress={()=>this.setState({switchEnable:false})}> 
 <LinearGradient  locations={[0.5,1]} start={{x: 0, y: 0.25}} end={{x: 0.5, y: 1}} colors={["grey","red"]} style={{width:130,height:35,borderRadius:35,flexDirection:'row',alignItems:'center',}}>
 
 <View style={{height:30,width:30,borderRadius:30,backgroundColor:"white",margin:2.5,marginLeft:5}} />
 <Text style={{fontWeight:'bold',fontSize:15,padding:0}}>Unsafe Mode</Text>
 
 </LinearGradient>
 </TouchableOpacity>
 :
 <TouchableOpacity onPress={()=>this.setState({switchEnable:true})}>
 <LinearGradient  locations={[0.5,1]} start={{x: 0, y: 0.25}} end={{x: 0.5, y: 2}} colors={["green","white"]} style={{width:130,height:35,borderRadius:35,flexDirection:'row',alignItems:'center',}}>
 
 
 <Text style={{fontWeight:'bold',fontSize:15,padding:5}}>Safe Mode</Text>
 <View style={{height:30,width:30,borderRadius:30,backgroundColor:"white",margin:2.5,marginLeft:10 ,elevation:5}} />
 </LinearGradient>
 </TouchableOpacity>
 }
 </View>
 <View style={{flexDirection:'row',justifyContent:'space-evenly',flex:0.5}}>
 <Ionicons name="home-outline" size={35} color={"grey"} onPress={()=>{this.props.navigation.navigate("Home")}}/>
 
 <Ionicons name="grid-outline" size={35} color={"grey"} />
         </View>
 
 </View>
 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient:{
padding:15,
margin:8,
width:190,
borderRadius:10
  }
});

export default Profile;
