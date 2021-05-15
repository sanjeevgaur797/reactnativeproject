
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




class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],

        }
    }
    getCart = async () => {
        var responce = JSON.parse(await AsyncStorage.getItem('cart'));
      
        if (responce !== null) {
            this.setState({ item: responce })
        }

    }
    componentWillMount() {
        this.getCart()
    }
    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.AddtocartSuccess) {
          var response = nextProps.AddtocartInfo.details;
          //Toast.show("Please Enter Phone number")
          //alert(JSON.stringify(response.new_data))
         this.setState({item:response.new_data})

        }
        if (nextProps.RemoveFromCartSuccess) {
            var response = nextProps.RemoveFromCartInfo.details;
            //alert(JSON.stringify(response.new_data))
           this.setState({item:response.new_data})
  
          }
    }





    render() {
      
        var total = 0
        return (
            <View>


                <View style={{ flexDirection: 'row', backgroundColor: colors.white, padding: 10, alignItems: 'center', justifyContent: 'space-between',}}>

                    <Ionicons name={"arrow-back-sharp"} size={30} onPress={() => { this.props.navigation.goBack() }} />

                    <Ionicons name={"share-social-sharp"} size={30} />
                </View>
                <View style={{ padding: 20 ,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Shopping Cart</Text>

                    <Text style={{fontSize:20,fontWeight:"bold"}}>item({this.state.item.length})</Text>
                </View>
                <View style={{}} >
                    {/* <Text>
                        {JSON.stringify(this.state.item)}
                    </Text> */}
                    <ScrollView style={{height:width+75,backgroundColor:'white'}}>
                        { this.state.item == 0?<View style={{backgroundColor:'#0a3d62',padding:50}}>
                            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,height:height/2,textAlignVertical:"center",backgroundColor:'#c8d6e5',borderTopLeftRadius:300,borderBottomRightRadius:300}}>Nothing in your cart</Text>
                        </View>:this.state.item.map(items => {
                            total += items.data.price*items.count
                            return(
                            <View style={{ borderTopWidth: 1, flexDirection: 'row',overflow:"visible", width:width,height:height/5}}>
                                
                                <Image source={{ uri: items.data.image }} style={{ width: width / 3, height: width / 3, borderRadius: 10, margin: 10 }} />
<View style={{padding:1,marginTop:15}}>
<Text style={{fontWeight:"bold",fontSize:15}}>{items.data.name}</Text>
<Text>{items.data.description}</Text>
<Text>Qty : {items.count}</Text>
<Text style={{fontSize:20,color:'green'}}>₹{items.data.price*items.count}</Text>
<View style={{flexDirection:'row',justifyContent:"space-between",backgroundColor:'white',width:width/5,height:height/20}}>
    <TouchableOpacity onPress={()=> {this.props.removeFromCart(items.data)}}>
        <Ionicons name="remove-circle-sharp" size={35} style={{color:'red'}}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> {this.props.addToCart(items.data)}}>
    <Ionicons name="add-circle-sharp" size={35} style={{color:'green'}} />
    </TouchableOpacity>
</View>

</View>
                            </View>

                        )
                        }

                            )}
                    </ScrollView>
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,borderBottomWidth:2}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>Total</Text>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>₹ {total}</Text>
                        
                    </View>
                    <View style={{borderRadius:50,justifyContent:'center',alignSelf:'center',padding:10}}>
                     <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Checkout")}}>
                     <Text style={{borderRadius:20,justifyContent:'center',textAlign:'center',backgroundColor:'#6D214F',fontSize:20,fontWeight:"bold",width:width/2,height:height/25,color:'white'}}>
                            Checkout
                        </Text>
                     </TouchableOpacity>
                        <TouchableOpacity>
                        <Text style={{padding:20,fontWeight:"bold",color:'green'}} onPress={()=>{this.props.navigation.navigate("HomeDrawer")}}>
                            Continue Shopping
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        AddtocartInfo: state.addToCart,
    AddtocartSuccess: state.addToCart.success,
    AddtocartFetching: state.addToCart.fetching,
    
    RemoveFromCartInfo: state.removeFromCart,
    RemoveFromCartSuccess: state.removeFromCart.success,
    RemoveFromCartFetching: state.removeFromCart.fetching,

    };
}

export default connect(mapStateToProps, {
   ...CartAction

})(Cart)


