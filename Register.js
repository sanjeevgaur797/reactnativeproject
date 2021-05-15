
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
 import { LoginAction, ProductActions } from '../actions';
 import { connect } from 'react-redux';
 import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import { State } from 'react-native-gesture-handler';
 const { width, height } = Dimensions.get("screen")
 

 
 
 class Register extends Component {
   constructor(props) {
     super(props);
     this.state = {
       item: [],
       password:'',
       phone:'',
       name:'',
        }
   }
   
 

   validation=()=>{
    if(this.state.name==""){
      Toast.show("Please Enter Name ")
             } 
             else if(this.state.phone==""){
Toast.show("Please Enter Phone number")
       } else{ 
       if(this.state.phone.length<10){
           Toast.show("Length should be more than 10 digit")
       } else if(this.state.password==""){
           Toast.show("Please Enter Password")
       }
    
       else{
       
           this.props.signup({
            name:this.state.name,
               phone:this.state.phone,
               password:this.state.password})
           }
        }
    }
 
   UNSAFE_componentWillReceiveProps(nextProps) {
    
     if (nextProps.SignupSuccess) {
        
       var response = nextProps.SignupInfo.details;
      if(response.code ==200)
      { 
          AsyncStorage.setItem("user",JSON.stringify(response.result))
          alert("Register successfully")
        
          this.props.navigation.navigate("Login")
      }
      
     }
   }

 
   render() {
     return (
        <ScrollView style={{backgroundColor:'#192a56'}}>
        <View >
          <Text style={{fontSize:30,color:colors.white,marginTop:20,fontWeight:"bold",padding:20}}>Welcome</Text>
            
          <View >
          <Text style={{fontSize:30,fontWeight:'bold', textAlign:'center',color:'white',marginTop:50}}>Registere Here</Text>
         <Ionicons name={"create"}  style={{fontSize:50,fontWeight:'bold', textAlign:'center',color:'white',marginTop:50}} />
           </View>
           <TextInput
        //style={styles.input}
        onChangeText={(name)=>{this.setState({name})}}
        value={this.state.name}
        placeholder="Enter Name"
        keyboardType="email-address"
        style={{backgroundColor:'white',borderRadius:100,margin:10,textAlign:'center'}}
      />
          <TextInput
        //style={styles.input}
        onChangeText={(phone)=>{this.setState({phone})}}
        value={this.state.phone}
        placeholder="Enter Phone Number"
        keyboardType="email-address"
        style={{backgroundColor:'white',borderRadius:100,margin:10,textAlign:'center'}}
      />
      <TextInput
        //style={styles.input}
        onChangeText={(password)=>{this.setState({password})}}
        value={this.state.password}
       
        placeholder="Enter Password"
        keyboardType="default"
        secureTextEntry={true}
        style={{backgroundColor:'white',borderRadius:100,margin:10,textAlign:'center',}}
      />
          <View style={{flexDirection:'row',justifyContent:'center',margin:10}}>
              
          <TouchableOpacity style={{backgroundColor:'green',borderRadius:20,width:100,height:30,alignItems:'center',alignContent:'center'}} onPress={()=>{ this.validation() }} > 
               <Text style={{fontSize:20,fontWeight:'bold', textAlign:'center',alignItems:'center',alignItems:'center',alignContent:'center',}}>Submit</Text>
           </TouchableOpacity>  
          </View>

<View style={{flexDirection:'row',justifyContent:'space-between',padding:5,}}>
<Text style={{color:colors.white,fontWeight:'bold',fontSize:15}}>You Have An Account</Text>
<TouchableOpacity onPress={()=>{this.props.navigation.navigate("Login")}}>
<Text style={{color:colors.white,fontWeight:'bold',fontSize:15}}>Login</Text>
</TouchableOpacity>

</View>
                 </View>
                 <Spinner visible={this.props.checkloginFetching} textContent="Please Wait" />
                 </ScrollView>
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
     SignupInfo: state.signup,
     SignupSuccess: state.signup.success,
     SignupFetching: state.signup.fetching,
 
 
   };
 }
 
 export default connect(mapStateToProps, {
   ...ProductActions,...LoginAction
 
 })(Register)
 
 
 