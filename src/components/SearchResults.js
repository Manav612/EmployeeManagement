import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'

const SearchResults = ({data,input,setInput}) => {
  return (
    <View style={{paddingVertical:'10%',flex:1}}>
        <FlatList
        data={data}
        renderItem={({item}) => {
            if(item?.employeeName.toLowerCase().includes(input.toLowerCase())){
                return (
                    <View style={{marginVertical:10,gap:10,flexDirection:'row'}}>
                        <View style={{width:50,height:50,borderRadius:8,backgroundColor:'#4b6cb7',alignItems:'center',justifyContent:'center'}}>
                            <Text style={styles.FirstLetter}>{item?.employeeName?.charAt(0)}</Text>
                        </View>
                        <View>
                            <Text>{item?.employeeName}</Text>
                            <Text>{item?.designation} ({item?.employeeId})</Text>
                        </View>
                    </View>
                )
            }
        }}
        />
    </View>
  )
}

export default SearchResults

const styles = StyleSheet.create({
    FirstLetter: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
      },
})