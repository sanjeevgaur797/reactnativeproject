import React from 'react'
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View,StyleSheet } from 'react-native'
import { colors } from '../../colors'
import Ionicons from 'react-native-vector-icons/Ionicons';

function Favrouite({navigation,route}) {
    const chart_wh = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

    return (
        <ScrollView>
        <View >
          
             <View style={{flexDirection:'row',backgroundColor:colors.white,padding:5,alignItems:'center'}}>
    
    <Ionicons name={"arrow-back-sharp"} size={30} onPress={()=>{navigation.goBack()}}/>
    <Text>Back</Text>

          </View>
          <View>
          <Text style={{fontSize:20,fontWeight:'bold', textAlign:'center'}}>Sign In</Text>
          </View>
          <TextInput
        //style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
        placeholder="Enter Email Address"
        keyboardType="email-address"
        style={{backgroundColor:'white',borderRadius:100,margin:10,justifyContent:"center",flexDirection:'row',textAlign:'center'}}
      />
      <TextInput
        //style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
       
        placeholder="Enter Password"
        keyboardType="default"
        style={{backgroundColor:'white',borderRadius:100,margin:10,textAlign:'center',}}
      />
          <View style={{flexDirection:'row',justifyContent:'center',}}>
              
          <TouchableOpacity style={{backgroundColor:'green',borderRadius:20,width:100,height:30,alignItems:'center',alignContent:'center'}}> 
               <Text style={{fontSize:20,fontWeight:'bold', textAlign:'center',alignItems:'center',alignItems:'center',alignContent:'center'}}>Sign In</Text>
           </TouchableOpacity>  
          </View>

                 </View>
                 </ScrollView>
    )
}

const styles = StyleSheet.create({
    
  })


export default Favrouite
