
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

  StyleSheet, View, Text, ActivityIndicator, Button, Alert, SafeAreaView, FlatList, Image, ScrollView, ImageBackground, Touchable, TouchableOpacity, Switch, ToastAndroid, AsyncStorage

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { circle } from 'react-native/Libraries/Animated/Easing';
import { colors } from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import { CartAction, ProductActions } from '../actions';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
const arrcolors = ["#2c3e50", "#27ae60", "#c0392b", "#38ada9", "#0a3d62", "#b71540", "#60a3bc", "#6D214F", "#58B19F", "#EAB543", "#2C3A47", "#F97F51"]



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bestoffer: [],
      categories: [],
      bestselling: [],
      user: {},
      item: {},
      cartLength: 0,
    }
  }
  UNSAFE_componentWillMount() {

    this.props.GetHomeData()
    this.getUser()
  }
  getUser = async () => {
    var user = JSON.parse(await AsyncStorage.getItem('user'))
    var cart = JSON.parse(await AsyncStorage.getItem('cart'))
    this.setState({user,cartLength:cart.length})
    if (user !== null)
      this.setState({ user })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    if (nextProps.GEtHomeSuccess) {
      var response = nextProps.GEtHomeInfo.details;
      // alert(JSON.stringify(response))
      if (response.code == 200) {
        this.setState({
          bestoffer: response.bestoffer,
          categories: response.categories,
          bestselling: response.bestselling
        })
      }
      if (response.code == 108) {
        Toast.show("Please Login")
        this.props.navigation.navigate("Login")
      }
    }
    if (nextProps.AddtocartSuccess) {
      var response = nextProps.AddtocartInfo.details;
      this.setState({ cartLength: response.new_data.length })
    }
    if (nextProps.RemoveFromCartSuccess) {
      var response = nextProps.RemoveFromCartInfo.details;
      this.setState({ cartLength: response.new_data.length })
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white' }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Ionicons name="menu-sharp" size={30} style={{ margin: 10, }} onPress={() => { this.props.navigation.openDrawer() }} />
          <Text style={{ padding: 10, }} onPress={() => { this.props.navigation.navigate("Cart") }}>
            <Ionicons name="cart-sharp" size={30} style={{ margin: 10, }} />
            {this.state.cartLength}
          </Text>


        </View>
        <ScrollView >
          <View style={{ padding: 10, }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Welcome ,</Text>
            <Text style={{ fontSize: 33, alignSelf: 'center' }}>{this.state.user.name}</Text>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>Best Offers</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            {this.state.bestoffer.map(item => (
              <TouchableOpacity onPress={() => { this.props.navigation.navigate("ProductCategory", { item: item }) }}>

                <LinearGradient locations={[0.0, 0.9]} start={{ x: 0, y: 0 }} end={{ x: 0.8, y: 1 }} colors={[arrcolors[Math.floor(Math.random() * arrcolors.length)], arrcolors[Math.floor(Math.random() * arrcolors.length)]]} style={styles.linearGradient}>


                  <Text style={{ fontSize: 20, color: colors.white, textTransform: 'uppercase', fontWeight: "bold", padding: 8 }}>{item.name}</Text>
                  <Text style={{ color: colors.white, padding: 8 }}>{item.discount}% discount | Valid up to {item.validity} Days</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                    <Ionicons name="logo-react" size={25} color={colors.white} />
                    <Ionicons name="umbrella-sharp" size={25} color={colors.white} />
                    <Ionicons name="easel-sharp" size={25} color={colors.white} />
                    <Ionicons name="calendar-sharp" size={25} color={colors.white} />
                  </View>


                </LinearGradient>
              </TouchableOpacity>


            ))}

          </ScrollView>
          <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 17 }}>Categories</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.state.categories.map(item => (
              <View style={{ padding: 5, margin: 0, alignItems: 'center' }}>

                <View style={{ padding: 10, backgroundColor: 'lightgrey', borderRadius: 50, elevation: 2 }}>
                  <Ionicons name={item.icon} size={25} color="blue" />
                </View>

                <Text style={{ fontSize: 18, padding: 10 }}>{item.name}</Text>
              </View>

            ))}
          </ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 0, }}>
            <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 17 }}>Best Seller</Text>
            <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 15 }}>See All</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'lightgrey' }}>
            {this.state.bestselling.map(item => (
              <View style={{ margin: '2%', width: '46%', height: 250, padding: 2, elevation: 2 }}>
                <Image source={{ uri: item.image }} style={{ width: "100%", height: "80%", }} />
                <Text style={{ fontWeight: 'bold' }}> {item.name}</Text>
                <Text> {item.description}</Text>
                <Text style={{ color: 'green' }}> ₹{item.price}</Text>
              </View>
            ))}

          </View>
          <View style={{ height: 55 }}>

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
    GEtHomeInfo: state.GetHomeData,
    GEtHomeSuccess: state.GetHomeData.success,
    GEtHomeFetching: state.GetHomeData.fetching,
    
    AddtocartInfo: state.addToCart,
    AddtocartSuccess: state.addToCart.success,
    AddtocartFetching: state.addToCart.fetching,

    RemoveFromCartInfo: state.removeFromCart,
    RemoveFromCartSuccess: state.removeFromCart.success,
    RemoveFromCartFetching: state.removeFromCart.fetching,


  };
}

export default connect(mapStateToProps, {
  ...ProductActions, ...CartAction

})(Home)










// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

//  import React, { Component } from 'react';
//  import Pie from 'react-native-pie';
//  import {

//    StyleSheet, View, Text, ActivityIndicator, Button, Alert, SafeAreaView, FlatList, Image, ScrollView, ImageBackground, Touchable, TouchableOpacity, Switch

//  } from 'react-native';
//  import LinearGradient from 'react-native-linear-gradient';
//  import Ionicons from 'react-native-vector-icons/Ionicons';
//  import { colors } from '../../colors';
// import ProductCategory from './ProductCategory';
// import { NavigationContainer, StackActions } from '@react-navigation/native';
// import { ProductActions } from '../actions';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import Spinner from 'react-native-loading-spinner-overlay';
//  const rooms = [
//    {name:"Living Room",profile:1,device:50,color:["#fd79a8","#0984e3"]},
//    {name:"Bed Room",profile:25,device:5,color:["#fd79a8","#ff7f50"]},
//    {name:"Dining Room",profile:10,device:10,color:["#fd79a8","#0984e3"]},
//    {name:"study Room",profile:15,device:14,color:["#fd79a8","#0984e3"]},
//  ]

//  const quick = [
//    {name:"CAMERAS",icon:'umbrella-sharp'},
//    {name:"wheather",icon:'umbrella-sharp'},
//    {name:"Dining Room",icon:'umbrella-sharp'},
//    {name:"study Room",icon:'umbrella-sharp'},
//  ]

//  const profile = [
//    {name:"Theatre",icon:'umbrella-sharp',description:"living room"},
//    {name:"party",icon:'umbrella-sharp',description:"courtyard"},
//    {name:"sleep",icon:'bonfire',description:"entire home"},
//    {name:"water heater",icon:'add-circle',description:"bath room 1"},
//    {name:"work",icon:'flash',description:"entire home"},
//  ]

//  class Home extends Component {
//    constructor(props) {
//      super(props);
//      this.state={
//        switchEnable:false
//      }
//     }


//      UNSAFE_componentWillMount() {

//       this.props.GetHomeData()

//     }

//  UNSAFE_componentWillReceiveProps(nextProps){
//    if(nextProps.GetHomeDataSuccess){
//    // alert(JSON.stringify(nextProps.GetHomeDataInfo.details))
//   }

//  }

//    render() {
//      return (
//        <View style={{ backgroundColor:colors.white ,flex:1 }}>
//       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
//       <Ionicons name="menu-sharp" size={30}style={{margin:10, }} onPress={()=>{this.props.navigation.openDrawer()}} />
//        <Ionicons name="cart-sharp" size={30}style={{margin:10, }} onPress={()=>{this.props.navigation.openDrawer()}} />

//       </View>
//          <ScrollView>
//          <ActivityIndicator  animating={this.props.GetHomeDataFetching} color="green" />
//            <View style={{padding:10}}>
//            <Text style={{ fontSize: 30 ,fontWeight:"bold"}}>Welcome Home,</Text>
//          <Text style={{ fontSize: 23 }}>Adm</Text>
//          <Text onPress={()=>{this.props.check("hello")}}>click here</Text>
//            </View>
//            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//            {rooms.map(item =>(
//              <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ProductCategory",{item:item})}}>
//              <LinearGradient  locations={[0.0,0.9]} start={{x: 0, y: 0}} end={{x: 0.8, y: 1}} colors={[item.color[0],item.color[1]]} style={styles.linearGradient}>
//    <Text style={{fontSize:20,color:colors.white,textTransform:'uppercase',fontWeight:"bold",padding:8}}>{item.name}</Text>
//    <Text style={{color:colors.white,padding:8}}>{item.profile} Profile | {item.device} Device</Text>
//    <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingBottom:10}}>
//    <Ionicons  name="logo-react" size={25} color={colors.white} />
//    <Ionicons name="umbrella-sharp" size={25} color={colors.white} />
//    <Ionicons name="easel-sharp" size={25} color={colors.white} />
//    <Ionicons name="calendar-sharp" size={25} color={colors.white} />
//    </View>
//  </LinearGradient>
//  </TouchableOpacity>
//            ))}

//            </ScrollView>


//         <Text style={{fontWeight:"bold",padding:5}}>Quic Access</Text>

//           <ScrollView showsHorizontalScrollIndicator={false}  horizontal={true}>

//           {quick.map(item =>(
//             <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Quick",{item:item})}}>
//              <LinearGradient  colors={["white","white"]} >
//              <View style={{color:colors.blue,textTransform:'uppercase',fontWeight:"bold",padding:5,borderWidth:1.5,borderRadius:10,flexDirection:'row',justifyContent:"center",flex:1,margin:3,borderColor:colors.blue,elevation:0,alignContent:'center',alignSelf:'center'}}>
//              <Ionicons name={item.icon} size={25} style={{padding:1,color:colors.blue}} />
//    <Text  style={{color:colors.blue,fontWeight:'bold',textTransform:'uppercase'}} >{item.name}</Text>
//              </View>

//  </LinearGradient>
//  </TouchableOpacity>
//            ))}

//        </ScrollView>
//        <View style={{backgroundColor:'#dcdde1',flex:1,marginTop:15,padding:10}}>
//        <View style={{flexDirection:'row',justifyContent:"space-between",padding:10,alignItems:"center",}}>
//          <Text style={{fontWeight:'bold',fontSize:20,padding:17,marginLeft:-20}}>Profile</Text>


//        <TouchableOpacity  >

//        <Text style={{borderWidth:1,borderColor:colors.blue,borderRadius:20,textAlign:'center',textAlignVertical:"center",color:colors.blue,backgroundColor:colors.white,padding:5,fontWeight:"bold",width:100}}>Edit</Text>

//        </TouchableOpacity>
//        </View>

//  <View style={{flexDirection:"row",flexWrap:'wrap'}} >
//      {profile.map(item =>(

//              <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Profile",{item:item})}} style={{color:colors.blue,backgroundColor:colors.white,width:"31.3%",padding:15,borderRadius:10,margin:"1%",justifyContent:'center',alignItems:'center'}}>

//              <Ionicons name={item.icon} size={50} style={{color:colors.blue}} />
//    <Text  style={{color:colors.blue,fontWeight:'bold',textTransform:"capitalize",fontSize:15,margin:5}} >{item.name}</Text>
//    <Text  style={{color:"grey",textTransform:"capitalize",fontSize:12,}}  >{item.description}</Text>


//              </TouchableOpacity>


//            ))}
//            <View style={{color:colors.blue,width:"31.3%",padding:15,borderRadius:10,margin:"1%",justifyContent:'center',alignItems:'center'}}>
//            <Ionicons name="add-circle" size={50} style={{color:colors.blue}} />
//    <Text  style={{color:colors.blue,fontWeight:'bold',textTransform:"capitalize",fontSize:14,margin:5}} >Add Profile</Text>
//    </View>
//  </View>
//      </View>


//   <View style={styles.container}>
//           <View
//             style={{
//               paddingVertical: 5,
//               flexDirection: 'row',
//               width: 50,
//               justifyContent: 'center',
//             }}
//           >
//             <Pie
//               radius={50}
//               sections={[
//                 {
//                   percentage: 10,
//                   color: '#C70039',
//                 },
//                 {
//                   percentage: 20,
//                   color: '#44CD40',
//                 },
//                 {
//                   percentage: 30,
//                   color: '#404FCD',
//                 },
//                 {
//                   percentage: 40,
//                   color: '#EBD22F',
//                 },
//               ]}
//               strokeCap={'butt'}
//             />

//             </View>
//             <Text style={{margin:10,}}>Pie Chart</Text>
//             </View>


//          </ScrollView>

//          {/* <View style={{elevation:1,backgroundColor:"#dfe6e6",flexDirection:'row',justifyContent:'space-between',padding:15,borderTopWidth:1.5,borderTopColor:'grey'}}>
//  <View style={{width:120,height:30,backgroundColor:'red',borderRadius:20,}}>
//  {this.state.switchEnable ? 
//  <TouchableOpacity onPress={()=>this.setState({switchEnable:false})}> 
//  <LinearGradient  locations={[0.5,1]} start={{x: 0, y: 0.25}} end={{x: 0.5, y: 1}} colors={["grey","red"]} style={{width:130,height:35,borderRadius:35,flexDirection:'row',alignItems:'center',}}>

//  <View style={{height:30,width:30,borderRadius:30,backgroundColor:"white",margin:2.5,marginLeft:5}} />
//  <Text style={{fontWeight:'bold',fontSize:15,padding:0}}>Unsafe Mode</Text>

//  </LinearGradient>
//  </TouchableOpacity>
//  :
//  <TouchableOpacity onPress={()=>this.setState({switchEnable:true})}>
//  <LinearGradient  locations={[0.5,1]} start={{x: 0, y: 0.25}} end={{x: 0.5, y: 2}} colors={["green","white"]} style={{width:130,height:35,borderRadius:35,flexDirection:'row',alignItems:'center',}}>


//  <Text style={{fontWeight:'bold',fontSize:15,padding:5}}>Safe Mode</Text>
//  <View style={{height:30,width:30,borderRadius:30,backgroundColor:"white",margin:2.5,marginLeft:10 ,elevation:5}} />
//  </LinearGradient>
//  </TouchableOpacity>
//  }
//  </View>
//  <View style={{flexDirection:'row',justifyContent:'space-evenly',flex:0.5}}>
//  <Ionicons name="home-outline" size={35} color={"grey"} />

//  <Ionicons name="grid-outline" size={35} color={"grey"} />
//          </View>

//  </View>
//   */}
//   <Spinner visible={this.props.GetHomeDataFetching} textContent="Please Wait" />
//        </View>
//      );
//    }
//  }

//  const styles = StyleSheet.create({
//    linearGradient:{
//  padding:15,
//  margin:8,
//  width:190,
//  borderRadius:10
//    },
//    container: { alignItems: 'center', justifyContent: 'center', height:250 },
//     gauge: {
//       position: 'absolute',
//       // width: 100,
//       // height: 10,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     gaugeText: {
//       backgroundColor: 'transparent',
//       color: '#000',
//       fontSize: 24,
//     },
//  });

//  function mapStateToProps(state) {
//   return {
//       state,
//       checkInfo: state.check,
//       GetHomeDataInfo: state.GetHomeData,
//       GetHomeDataSuccess: state.GetHomeData.success,
//       GetHomeDataFetching: state.GetHomeData.fetching,



//   };
// }

// export default compose(connect(mapStateToProps, {
//   ...ProductActions
// }))(Home)
