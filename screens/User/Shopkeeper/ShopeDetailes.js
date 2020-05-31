import React, { Component } from 'react'
import { Text, StyleSheet, View, Picker, Dimensions, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as firebase from 'firebase'

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

                <TouchableOpacity 
                    style={styles.myBtnB}
                    onPress={this.uploadTheDeatils}
                >
                    <Text style={styles.label}> Next </Text>
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
        backgroundColor: '#def',
        marginTop: 30,
    },

    Header: {
        fontSize: 28,
        alignSelf: 'center',
        padding: 10,
        paddingBottom: 20,
    },
})
