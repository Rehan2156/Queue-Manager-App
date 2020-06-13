import React, { Component } from 'react'
import { Text, StyleSheet, View, Picker, Dimensions, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as firebase from 'firebase'
import { globalStyles } from '../../../styles/global'

const {width:WIDTH}=Dimensions.get('window')


export default class ShopeDetailes extends Component {

    state = {
        name: "",
        shopName: "",
        category: "House Hold Items",
    }

    uploadTheDeatils = async () => {
        console.log('hello')
        if(this.state.name !== "" && this.state.shopName !== "" && this.state.selectedValue !== "") {
            await firebase
            .database()
            .ref('/shop/' + firebase.auth().currentUser.uid)
            .set({
                shopkeeper_name: this.state.name,
                shop_name: this.state.shopName,
                Category_of_shop: this.state.category,
            })
            .then(() => {                
                Alert.alert('Information','User Data is Uploaded')
                this.props.navigation.navigate('ShopLocation')
            });
        } else {
            Alert.alert("Fill Every Info please")
        }        
    }

    render() {
        return (
            <View style={globalStyles.body}>
            <View style={styles.box}>
                <Text style={styles.Header}>Shopkeeper Details </Text>
                <TextInput 
                    style={styles.myInput}
                    onChangeText = {val => this.setState({name: val})}
                    selectedValue = {this.state.name}
                    placeholder={'Name of The Shopkeeper'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
                />

                <TextInput 
                    style={styles.myInput}
                    onChangeText = {val => this.setState({shopName: val})}
                    selectedValue = {this.state.shopName}
                    placeholder={'Name of The Shop'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
                />

                <Text style={styles.label}>Category of the Shop </Text>
                <Picker
                    prompt = "Select the shop Category"
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}
                >
                    <Picker.Item label="House Hold Items" value="House Hold Items" />
                    <Picker.Item label="Super Market" value="Super Market" />
                    <Picker.Item label="Medical" value="Medical" />
                    <Picker.Item label="Liquor" value="Liquor" />
                </Picker>

                <TouchableOpacity 
                    style={styles.myBtnB}
                    onPress={this.uploadTheDeatils}
                >
                    <Text style={{margin:5,fontFamily:'nunito-bold',}}> Next </Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
      paddingTop: 80,
      paddingLeft: 15,
    },
    label: {
        fontSize: 15,
        color: '#fff',
        margin: 5,
        padding: 10,
        fontFamily:'nunito-bold',
    },
    myInput: {
        alignSelf:'center',
        width: WIDTH - 90,
        height:55,
        borderRadius:45,
        fontSize:16,
        paddingLeft:45,
        backgroundColor:'rgba(0,0,0,0.35)',
        color:'rgba(255,255,255,0.7)',
        marginHorizontal:25,
        fontFamily:'nunito-bold',
        margin:20
      },

    myBtnA: {
        padding: 10,
        margin: 7,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: '#aaa',
        alignItems: 'center',
    },

    myBtnB: {
        padding: 10,
        margin: 7,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: '#aaa',
        alignItems: 'center',
        backgroundColor: '#fedbd0',
        marginTop: 30,
    },

    Header: {
        fontSize: 28,
        alignSelf: 'center',
        padding: 10,
        paddingBottom: 20,
        fontFamily:'nunito-bold',
        color:'#fff'
    },
    box:{
        padding:20,
        margin:5,
        marginTop:80,
        backgroundColor:'#424242',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        // borderBottomEndRadius:15,
        // borderTopLeftRadius:15,
        elevation: 15,    
    }
})
