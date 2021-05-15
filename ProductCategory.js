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

  StyleSheet, View, Text, ActivityIndicator, Button, Alert, SafeAreaView, FlatList, Image, ScrollView, ImageBackground, Touchable, TouchableOpacity, Switch, Dimensions

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { circle } from 'react-native/Libraries/Animated/Easing';
import { colors } from '../../colors';
import { connect } from 'react-redux';
import { ProductActions } from '../actions';
const{width,height}=Dimensions.get("screen")

class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state={

     item:[]
    }
  }
 
  UNSAFE_componentWillMount() {
      
    this.props.GetProductByCategory(this.props.route.params.item.category)
    
  }
 
UNSAFE_componentWillReceiveProps(nextProps){
 
  if(nextProps.GetProductByCategorySuccess){
    var response=nextProps.GetProductByCategoryInfo.details;
   //alert(JSON.stringify(response))
   this.setState({item:response.result})
  }
}
 
  render() {
    return (
      <View >
      <View style={{flexDirection:'row',backgroundColor:colors.white,padding:5,alignItems:'center'}}>
    
<Ionicons name={"arrow-back-sharp"} size={30} onPress={()=>{this.props.navigation.goBack()}}/>
<Text>Back</Text>
      </View>
      <ScrollView >
      <View style={{flexDirection:'row',flexWrap:'wrap',backgroundColor:'white',padding:10}} on>
        {this.state.item.map(item=>(
          <View style={{margin:'2%', width:'46%' ,height:250,padding:2,elevation:1}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ProductDetails",{item:item})}} >
          <Image source={{uri:item.image}} style={{width:"100%",height:"80%",resizeMode:'contain' ,borderRadius:10,borderWidth:0,borderColor:"grey",margin:1}} />
          </TouchableOpacity>
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:1}}>
       <View >
         <Text style={{fontWeight:'bold'}}> {item.name}</Text>
         <Text> {item.description}</Text>
         <Text style={{color:'green'}}> ₹{item.price}</Text>
         </View>
         <View  style={{flexDirection:'row',justifyContent:'flex-end'}}>
         <Ionicons name={"cart"} size={25} />
         </View>
        
</View> 
          </View>
          
        ))}

        </View>
      </ScrollView>
     
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



function mapStateToProps(state) {
  return {
      state,
      GetProductByCategoryInfo: state.GetProductByCategory,
      GetProductByCategorySuccess: state.GetProductByCategory.success,
      GetProductByCategoryFetching: state.GetProductByCategory.fetching,

    
  };
}

export default connect(mapStateToProps, {
 ...ProductActions

})(ProductCategory)

