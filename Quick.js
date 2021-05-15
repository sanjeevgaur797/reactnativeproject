import React from 'react'
import { Text, View } from 'react-native'
import { colors } from '../../colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
function Quick({navigation,route}) {
    return (
        <View>
             <View style={{flexDirection:'row',backgroundColor:colors.white,padding:5,alignItems:'center'}}>
    
    <Ionicons name={"arrow-back-sharp"} size={30} onPress={()=>{navigation.goBack()}}/>
    <Text>Back</Text>
          </View>
          <Text>{route.params.item.name}</Text>
             
        </View>
    )
}

export default Quick
