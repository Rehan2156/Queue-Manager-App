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
            sameKey: true,
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

        //await this.getTheLocationAtFirst().then(() => {
           // console.log('location mila')
        //})

        const key = this.props.navigation.getParam('key')
        //const loc = this.props.navigation.getParam('loc')

       /// console.log(loc)
       // console.log(this.state.myLoc)

       // this._getPreciseDistance(this.state.myLoc, loc)

        await firebase.database().ref('shop/' + key + '/line/').once('value', snapshot => {
            if(snapshot.exists()){
                var number = 0;
                snapshot.forEach(function(data){
                    number++;
                });
                this.setState({ queue: number })
            } else {
                this.setState({ queue: 0 })
            }
        });

        await firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', snap => {
            this.setState({ inQ: snap.toJSON().inQ })
        })

        if(this.state.inQ) {
            await firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value', snap => {
                if(key === snap.toJSON().shopKey) {
                    this.setState({ sameKey: true })
                } else {
                    this.setState({ sameKey: false })
                }
            })
        }

        if(this.state.sameKey && this.state.inQ) {
            firebase.database().ref('shop/' + key + '/line/' + firebase.auth().currentUser.uid) .once('value', snap => {
                this.setState({ userToken: snap.toJSON().Token })
            })
        }

        this.setState({ isReady: true })
    }

    // useful code
    /*  const shopName = this.props.navigation.getParam('shopName')
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
        this.state.inQ ? Alert.alert('You have exited the queue.') : Alert.alert('You are added to the queue.');*/

    clickHandler = async () => {
        const userId = firebase.auth().currentUser.uid;  
        const shop = this.props.navigation.getParam('key')
        if(!this.state.inQ) {   
            var shopDetail
            await firebase.database().ref('shop/' + shop).once('value', function (snapshot) {
                shopDetail =  snapshot.toJSON()
            }) 

            var userDetail 
            await firebase.database().ref('users/' + userId).once('value', function (snapshot) {
                userDetail = snapshot.toJSON()
            })
            console.log(shopDetail)
            console.log(userDetail)
            var token

            if(shopDetail.line === undefined) {
                console.log('yes')
                token = 1;
            } else {
                var bigNum = 0;
                await firebase.database().ref('shop/' + shop + '/line/').once('value', function(snapshot){
                    if(snapshot.exists()){
                        snapshot.forEach(function(data){
                            var val = data.toJSON().Token;
                            if(bigNum < val) {
                                bigNum = val
                            }
                        });
                    }
                });
                token = bigNum + 1
            }
            this.setState({ userToken: token })

            if(userDetail.inQ === undefined || userDetail.inQ === 0) {
                await firebase.database().ref('users/' + userId).update({
                    inQ: 1,
                    shopKey: shop,
                })
                this.setState({ inQ: 1 })
                var time = Math.round((Math.ceil(token / shopDetail.qSize)) * 10) ;
                await firebase.database().ref('shop/' + shop + '/line/' + userId).set({
                        Name: userDetail.Full_Name,
                        Token: token,
                        Time_in_min: time
                    })
            } 

            console.log('done for one')
        } else {
            await firebase.database().ref('users/' + userId).update({
                inQ: 0,
            })
            await firebase.database().ref('users/' + userId + '/shopKey').remove()
            this.setState({ inQ: 0 })
            await firebase.database().ref('shop/' + shop + '/line/' + userId).remove()
        }

        await firebase.database().ref('shop/' + shop + '/line/').once('value', snapshot => {
            if(snapshot.exists()){
                var number = 0;
                snapshot.forEach(function(data){
                    number++;
                });
                this.setState({ queue: number })
            } else {
                this.setState({ queue: 0 })
            }
        });

        this.state.inQ ?  Alert.alert('You are added to the queue.') : Alert.alert('You have exited the queue.') 
    }

    render() {        
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


            { this.state.sameKey ? 
                <Button onPress = { this.clickHandler }
                title = { this.state.inQ ? "Exit the queue" : "Join the queue" }
                />  
                :                
                <Button onPress = { this.clickHandler }
                    title = { "Your are in other queue alredy" }
                    disabled = {!this.state.sameKey}
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