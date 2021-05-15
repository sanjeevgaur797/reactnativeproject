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

  StyleSheet, View, Text, ActivityIndicator, Button, Alert, SafeAreaView, FlatList, Image, ScrollView, ImageBackground, Touchable, TouchableOpacity, Switch

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { circle } from 'react-native/Libraries/Animated/Easing';
import { colors } from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import { ProductActions } from '../actions';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const arrcolors=["#2c3e50","#27ae60","#c0392b","#38ada9","#0a3d62","#b71540","#60a3bc","#6D214F","#58B19F","#EAB543","#2C3A47","#F97F51"]
// const rooms = [
//     {name:"Jeans Shirt",discount:1,Days:50,color:["#fd79a8","#0984e3"]},
//     {name:"Jeans Paint",discount:25,Days:5,color:["#fd79a8","#ff7f50"]},
//     {name:"Shirt",discount:10,Days:10,color:["#fd79a8","#0984e3"]},
//     {name:"T-Shirt",discount:15,Days:14,color:["#fd79a8","#0984e3"]},
//   ]

//   const categories = [
//     {name:"Watch",icon:<Ionicons name="shirt-sharp" size={25}  color="blue"/>},
//     {name:"Belt",icon:<Ionicons name="bed-sharp" size={25} color="blue"/>},
//     {name:"Shirt",icon:<Ionicons name="bulb-sharp" size={25} color="blue"/>},
//     {name:"shoes",icon:<Ionicons name="heart-sharp" size={25} color="blue"/>},
//     {name:"ring",icon:<Ionicons name="cloud-sharp" size={25} color="blue"/>},
 
//     {name:"Camera",icon:<Ionicons name="easel-sharp" size={25} color="blue"/>},
 
//     {name:"Glass",icon:<Ionicons name="flask-sharp" size={25} color="blue"/>},
 
//    ]
//   const clothes = [
//     {name:"Watch",image:"https://images-na.ssl-images-amazon.com/images/I/41VloMir72L.jpg",price:50,description:'Big Watch'},
//     {name:"Belt",image:"https://i5.walmartimages.com/asr/7dc0029e-6cbd-4c45-b9bb-8d4ae8223aee.dcd9e2c2f45cdc1b5b7c19b8a3066d3d.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",price:500,description:'strong and good belt'},
//     {name:"Camera",image:"https://i.pinimg.com/originals/bc/aa/d0/bcaad00d4bf16fd94bc45665ddad18e9.jpg",price:2000,description:'canon brand camera'},
   
//   ]

 

class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state={
      bestoffer:[],
      categories:[],
      bestselling:[],

     item:{ }
    }
  }
  UNSAFE_componentWillMount() {
      
    this.props.GetHomeData()
    
  }
 
UNSAFE_componentWillReceiveProps(nextProps){
 
  if(nextProps.GEtHomeSuccess){
    var response=nextProps.GEtHomeInfo.details;
    this.setState({bestoffer:response.bestoffer,
    categories:response.categories,
  bestselling:response.bestselling})
  }
}
 
  render() {
    return (
      <View style={{backgroundColor:'white'}}>
      
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Ionicons name="menu-sharp" size={30}style={{margin:10, }} onPress={()=>{this.props.navigation.openDrawer()}} />
       <Ionicons name="cart-sharp" size={30}style={{margin:10, }} onPress={()=>{this.props.navigation.openDrawer()}} />
       
      </View>
      <ScrollView > 
      <View style={{padding:10 ,}}>
           <Text style={{ fontSize: 30 ,fontWeight:"bold"}}>Welcome Home,</Text>
         <Text style={{ fontSize: 23 }}>Adm</Text>
           </View>
           <Text style={{fontWeight:"bold",fontSize:20,margin:10}}>Best Offers</Text>
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
           {this.state.bestoffer.map(item =>(
             <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ProductCategory",{item:item})}}>
            
             <LinearGradient locations={[0.0,0.9]} start={{x: 0, y: 0}} end={{x: 0.8, y: 1}} colors={[arrcolors[Math.floor(Math.random()*arrcolors.length)],arrcolors[Math.floor(Math.random()*arrcolors.length)]]} style={styles.linearGradient}>
             
                 
   <Text style={{fontSize:20,color:colors.white,textTransform:'uppercase',fontWeight:"bold",padding:8}}>{item.name}</Text>
   <Text style={{color:colors.white,padding:8}}>{item.discount}% discount | Valid up to {item.validity} Days</Text>
   <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingBottom:10}}>
   <Ionicons  name="logo-react" size={25} color={colors.white} />
   <Ionicons name="umbrella-sharp" size={25} color={colors.white} />
   <Ionicons name="easel-sharp" size={25} color={colors.white} />
   <Ionicons name="calendar-sharp" size={25} color={colors.white} />
   </View>
             
 
 </LinearGradient>
 </TouchableOpacity>
 
 
           ))}
     
           </ScrollView>
<Text style={{fontWeight:'bold',padding:10,fontSize:17}}>Categories</Text>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
{this.state.categories.map(item =>(
  <View style={{padding:5,margin:0,alignItems:'center'}}>
    
     <View style={{padding:10,backgroundColor:'lightgrey',borderRadius:50,elevation:2}}>
     <Ionicons name={item.icon} size={25}  color="blue"/>
     </View>
   
    <Text style={{fontSize:18,padding:10}}>{item.name}</Text>
  </View>

))}
        </ScrollView>   
        <View style={{flexDirection:'row',justifyContent:'space-between',margin:0,}}>
          <Text style={{fontWeight:'bold',padding:10,fontSize:17}}>Best Seller</Text>
          <Text style={{fontWeight:'bold',padding:10,fontSize:15}}>See All</Text>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap',backgroundColor:'lightgrey'}}>
        {this.state.bestselling.map(item=>(
          <View style={{margin:'2%', width:'46%' ,height:250,padding:2,elevation:2}}>
          <Image source={{uri:item.image}} style={{width:"100%",height:"80%",}} />
         <Text style={{fontWeight:'bold'}}> {item.name}</Text>
         <Text> {item.description}</Text>
         <Text style={{color:'green'}}> ₹{item.price}</Text>
          </View>
        ))}

        </View>
        <View style={{height:45}}>

</View>
        </ScrollView>
<Spinner visible={this.props.GEtHomeFetching}
textContent="Please Wait"

 />
  </View>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient:{
padding:15,
margin:8,
width:270,
borderRadius:10
  }
});



function mapStateToProps(state) {
  return {
      state,
      GEtHomeInfo: state.GetHomeData,
      GEtHomeSuccess: state.GetHomeData.success,
      GEtHomeFetching: state.GetHomeData.fetching,

    
  };
}

export default connect(mapStateToProps, {
 ...ProductActions

})(Shopping)


