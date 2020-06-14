
import { globalStyles } from '../../../styles/global';
import Card from '../../../shared/card';
import { MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase'
import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList,Linking, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { color } from 'react-native-reanimated';

export default class Home extends Component {

  state = {
<<<<<<< HEAD
    shops: [  { shopName: 'Reliance', waiting: 50, body: 'Super Market', key: '1',location:'https://goo.gl/maps/hFuasuqSfLFua7816' },
              { shopName: 'Star Super Market', waiting: 45, body: 'Super Market', key: '2',location:'https://goo.gl/maps/LzBw6AYFSocewDdP7' },
              { shopName: 'D Mart', waiting: 30, body: 'Super Market', key: '3',location:'https://goo.gl/maps/wNTPKD9YXLhZGHnx5' },  
=======
    shops: [  { shopName: 'Reliance', waiting: 50, body: 'lorem ipsum', key: '1',location:'https://goo.gl/maps/hFuasuqSfLFua7816', loc: {latitude: 18.5489935167087, longitude: 73.91808914020658} },
              { shopName: 'Star Super Market', waiting: 45, body: 'lorem ipsum', key: '2',location:'https://goo.gl/maps/LzBw6AYFSocewDdP7', loc: {latitude: 18.5489935167087, longitude: 73.91808914020658} },
              { shopName: 'D Mart', waiting: 30, body: 'lorem ipsum', key: '3',location:'https://goo.gl/maps/wNTPKD9YXLhZGHnx5', loc: {latitude: 18.5489935167087, longitude: 73.91808914020658} },  
>>>>>>> ae6906241d68149a189b48b564cd42f544ab5259
           ],

    tempArray: [],

    lisIsready: false,

    textToBeSerach: '',
  }

  componentDidMount = () => {
    var myArray = []
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    try {
      var ref = firebase.database().ref("/shop");
      ref.once("value", (snapshot) => {
        snapshot.forEach( (childSnapshot) => {
          var key = childSnapshot.key
          var name = childSnapshot.child("/shop_name").val().toString()
          var category = childSnapshot.child("/Category_of_shop").val().toString()

          var lat = childSnapshot.child("/location_of_shop/latitude").val()
          var lon = childSnapshot.child("/location_of_shop/longitude").val()

          var latLng = `${lat},${lon}`;
          var label = 'Shop Location';

          var location = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
          });
<<<<<<< HEAD
          myArray = [...myArray, {shopName: name, body:category, location: location, key: key, waiting: 10 }]
=======

            var loc = {
              latitude : lat,
              longitude: lon
            }
          myArray = [...myArray, {shopName: name, body: 'we have to add this field', location: location, key: key, waiting: 10, loc: loc }]
>>>>>>> ae6906241d68149a189b48b564cd42f544ab5259
        })
          this.setState({
            shops: [...myArray],
          })

          this.setState({
            tempArray: this.state.shops,
            lisIsready: true,
          })

      })
    } catch(e) {
      console.log('Error: ', e)
    }
  }

  searchFilterFunction = text => {    
    const newData = this.state.shops.filter(item => {      
      const itemData = `${item.shopName.toString().toUpperCase()}`;
       const textData = text.toString().toUpperCase();
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ tempArray: newData });  
  };

  render() {

    if(!this.state.lisIsready) {
      return <ActivityIndicator  size='large' />
    }

    return (
        <View style={globalStyles.body}>
        <View style={styles.input}>
          <SearchBar        
              placeholder="Search for stores..."        
              lightTheme        
              round        
              onChangeText={text => {
                this.setState({ textToBeSerach: text })
                this.searchFilterFunction(text)
              }}
              autoCorrect={false}             
              value = {this.state.textToBeSerach}
          />    
        </View>  
        <View>
        <Text style={styles.heading}>Shops using QueT</Text>
        <FlatList data={this.state.tempArray} renderItem={({ item }) => (
          <TouchableOpacity style={styles.touchable} onPress={() => this.props.navigation.navigate('ReviewDetails', item)}>
            <Card>
            <View style={styles.cardAlign}>
            <View>
              <Text style={globalStyles.titleText}>{ item.shopName }</Text>
              <Text>{item.body}</Text>
            </View>  
            <MaterialIcons onPress={ ()=> Linking.openURL(item.location) } name='navigation' size={35} />
            </View>
            </Card>
          </TouchableOpacity>
        )} 
        contentContainerStyle={{ paddingBottom: 300}}
        />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body:{
    backgroundColor:'#424242',
    // padding:50,
    // borderTopLeftRadius:150,
    // flex:1,
    // padding:20
},
    heading:{
        textAlign:'center',
        padding:20,
        fontSize:25,
        marginTop:10,
        marginBottom:10,
        fontFamily:'nunito-bold',
        color:'#fff'
    },
    
    cardAlign:{
        flexDirection:'row',
        justifyContent:'space-between',
    },

    touchable:{
      backgroundColor:'#F4D03F', borderRadius:10,marginTop:10,marginBottom:10,
      elevation:20,
      backgroundColor:'#424242',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },

    input:{
      paddingHorizontal:5,
      paddingVertical:6
    }

  })
  

