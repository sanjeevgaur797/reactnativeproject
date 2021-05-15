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
import LinearGradient from 'react-native-linear-gradient';
import { CartAction, ProductActions } from '../actions';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get("screen")

const sizes = ["X", "XL", "M", "L", "ML"]


class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      activesize: null,
      count:0,
    }
  }
  UNSAFE_componentWillMount() {

    this.props.ProductsDetailById(this.props.route.params.item.id)

  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    if (nextProps.ProductsDetailByIdSuccess) {
      var response = nextProps.ProductsDetailByIdInfo.details;
      // alert(JSON.stringify(response))
      this.setState({ items: response.result[0] })
    }
    if (nextProps.AddtocartSuccess) {
      var response = nextProps.AddtocartInfo.details;
      Toast.show("successfully")
      //alert(JSON.stringify(response.new_data))
      // this.setState({ items: response.result })
    }
if(nextProps.AddtocartSuccess){
  var response=nextProps.AddtocartInfo.details.new_data;
  //alert(JSON.stringify(response))
  for(let i=0;i<response.length;i++){
    if(this.state.items.id == response[i].data.id)
    this.setState({count:response[i].count})
  }
}

  }

  render() {

    return (
      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center', backgroundColor: colors.white }}>

          <Ionicons name={"arrow-back-sharp"} size={30} onPress={() => { this.props.navigation.goBack() }} />
          <Text>Back</Text>


        </View>
      
        {this.state.items == null ? null :
          <ScrollView>
            <View>

              <View style={{ width: width, height: width, padding: 2, elevation: 1 }}>

                <Image source={{ uri: this.state.items.image }} style={{ width: "100%", height: "90%", resizeMode: 'contain' }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}> {this.state.items.name}</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'green' }}> ₹{this.state.items.price}</Text>

                </View>
              </View>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
              {sizes.map((size, index) => (
                <TouchableOpacity >
                  <Text style={[{ padding: 4, margin: 10, borderWidth: 1, borderColor: "green", borderRadius: 20, width: 50, textAlign: 'center', textAlignVertical: 'center', }, this.state.activesize === index ? { backgroundColor: 'red', color: 'white', } : { color: 'black' }]}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>

          </ScrollView>}
        <View style={{ flexDirection: 'row', justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "grey", width: width, height: 48, }}>
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }} onPress={() => { this.props.navigation.goBack() }}>
            <View style={{ width: "50%", alignItems: 'center', alignSelf: 'center', padding: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.props.addToCart(this.state.items) }} style={{ width: "50%", backgroundColor: '#192a56', alignItems: 'center', alignSelf: 'center', padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.white }}>Add To Cart({this.state.count})</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={this.props.ProductsDetailByIdFetching || this.props.AddtocartFetching} textContent="Please Wait" />

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
    ProductsDetailByIdInfo: state.ProductsDetailById,
    ProductsDetailByIdSuccess: state.ProductsDetailById.success,
    ProductsDetailByIdFetching: state.ProductsDetailById.fetching,

    AddtocartInfo: state.addToCart,
    AddtocartSuccess: state.addToCart.success,
    AddtocartFetching: state.addToCart.fetching,


  };
}

export default connect(mapStateToProps, {
  ...ProductActions, ...CartAction

})(ProductDetails)


