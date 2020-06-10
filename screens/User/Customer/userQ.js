import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Button, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../../styles/global';
import * as Location from 'expo-location';
import Card from '../../../shared/card';
import * as firebase from 'firebase'
import { getPreciseDistance } from 'geolib';
console.ignoredYellowBox = ['Setting a timer'];

export default class UserQ extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: firebase.auth().currentUser.email,
            queue: 0,
            inQ: false,
            readError: null,
            writeError: null,
            userToken: 0,
            isReady: false,
            myLoc: {},
            errMsg: "",
            dist: 0.0,
            bool: true,
        };
    }

    _getPreciseDistance = (myLoc, loc) => {
        var pdis = getPreciseDistance(myLoc, loc);
        this.setState({ dist: pdis / 1000 });
        console.log(this.state.dist)
      };

    getTheLocationAtFirst = async () => {
        console.log('location at first')
        let { status } = await Location.requestPermissionsAsync()

        if (status !== 'granted') {
            this.setState({errMsg: 'Permission to access location was denied'})
        }    

        var location = await Location.getCurrentPositionAsync({})
        this.setState({myLoc: location.coords})
        console.log(location)
    }

    async componentDidMount() {
        console.log('component mounted')

        await this.getTheLocationAtFirst().then(() => {
            console.log('location mila')
        })

        const shopName = this.props.navigation.getParam('shopName')
        const loc = this.props.navigation.getParam('loc')

        console.log(loc)
        console.log(this.state.myLoc)

        this._getPreciseDistance(this.state.myLoc, loc)

        firebase.database().ref('/queueShop/' + shopName + '/qSize').on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};

            this.setState({
                queue: data,
            });
            console.log('data is ', data)
        });
        this.setState({ isReady: true })
    }



    clickHandler = () => {
        var userId = firebase.auth().currentUser.uid;
        const shopName = this.props.navigation.getParam('shopName')

        if (!this.state.inQ) {

            firebase.database().ref('/queueShop/' + shopName).update({
                qSize: this.state.queue + 1,
            })

            firebase.database().ref('queueShop/' + shopName + '/line/' + userId).push({
                username: this.state.user,
                userToken: this.state.queue + 1,
            }).then(() => {
                //console.log('Inserted')
                this.setState(prevState =>
                    ({ inQ: !prevState.inQ, userToken: this.state.queue })
                )
            }).catch((error) => {
                console.log(error);
            });
        } else {
            firebase.database().ref('/queueShop/' + shopName).update({
                qSize: this.state.queue - 1,
            })
            firebase.database().ref('queueShop/' + shopName + '/line/' + userId).remove()
            this.setState(prevState =>
                ({ inQ: !prevState.inQ })
            )
        }

        this.state.inQ ? Alert.alert('You have exited the queue.') : Alert.alert('You are added to the queue.');
    };


    render() {
        var inQbutton = this.state.inQ ? "Exit the queue" : "Join the queue";
        /*console.log('inQ :', this.state.inQ)
        console.log('button  :', inQbutton)*/

        if (!this.state.isReady) {
            return <ActivityIndicator size = 'large' />
        }

        return ( 
          <View style={ globalStyles.container } >
            <Card >
              <Text style = { globalStyles.titleText } > { this.props.navigation.getParam('shopName') } </Text> 
              <Text > { this.props.navigation.getParam('body') } </Text> 
              <Text > { this.props.navigation.getParam('waiting') } minutes waiting </Text> 
            </Card> 
            <Text style = { styles.textStyle } > People in Queue: < Text style = { styles.bold } > { this.state.queue } </Text>  </Text > 
            { this.state.inQ ? ( <Text style = { styles.textStyle } > { this.state.user }
                    your token number is < Text style = { styles.bold } > { this.state.userToken } </Text> </Text > ) : (null) } 


            { this.state.dist > 8.0 ? 
                <Button onPress = { this.clickHandler }
                    title = { " You Cant Join queue shop is too far" }
                    disabled = { this.state.bool }
                /> : 
                
                <Button onPress = { this.clickHandler }
                title = { inQbutton }
                /> 
            }
          </View>
        );
    }
}

const styles = StyleSheet.create({

    textStyle: { 
        padding: 20,
        color: '#8D908E',
        backgroundColor: '#98F1BD'
    },

    bold: {
        fontWeight: 'bold'
    }


})