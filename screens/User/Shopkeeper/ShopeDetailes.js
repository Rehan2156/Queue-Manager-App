import React, { Component } from 'react'
import { Text, StyleSheet, View, Picker, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as firebase from 'firebase'

export default class ShopeDetailes extends Component {

    uploadTheDeatils = async () =>{
        await firebase
            .database()
            .ref('/shop/' + firebase.auth().currentUser.uid)
            .set({
                shopkeeper_name: this.state.name,
                shop_name: this.state.shopName,
                Category_of_shop: this.state.category,
                location_of_shop: this.state.loaction
            })
            .then(() => {                
                Alert.alert('Information','User Data is Uploaded')
                this.props.navigation.navigate("Shop")
            });
    }

    state = {
        name: "",
        shopName: "",
        category: "",
        loaction: "",
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Header}>Shopkeeper Details </Text>
                <Text style={styles.label}>Name of The Shopkeeper </Text>
                <TextInput 
                    style={styles.myInput}
                    onChangeText = {val => this.setState({name: val})}
                    selectedValue = {this.state.name}
                />

                <Text style={styles.label}>Name of The Shop </Text>
                <TextInput 
                    style={styles.myInput}
                    onChangeText = {val => this.setState({shopName: val})}
                    selectedValue = {this.state.shopName}
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

                <Text style={styles.label}>Location Of The Shop </Text>
                <TouchableOpacity style={styles.myBtnA}>
                    <Text style={styles.label}>Click To Select Location </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.myBtnB}
                    onPress = {() => {
                        console.log('Name: ' + this.state.name)
                        console.log('Shop Name: ' + this.state.shopName)
                        console.log('Category: ' + this.state.selectedValue)
                        console.log('Location: ' + this.state.loaction)
                        this.uploadTheDeatils()
                    }}
                >
                    <Text style={styles.label}>Upload </Text>
                </TouchableOpacity>
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
        color: '#555',
        margin: 5,
        padding: 10,
    },
    myInput: {
        fontSize: 13,
        borderBottomColor: '#666',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRadius: 15,
        padding: 15,
        margin: 5,
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
        backgroundColor: '#def'
    },

    Header: {
        fontSize: 28,
        alignSelf: 'center',
        padding: 10,
        paddingBottom: 20,
    },

})
