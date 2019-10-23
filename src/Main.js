// Main.js
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, TouchableOpacity} from 'react-native'
import firebase from 'react-native-firebase'

export default class Main extends React.Component {
    
    constructor(){
        super();
        this.state = {
            currentUser: null
        }
    }

    componentDidMount(){
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={styles.container}>
                <Text>
                Hi {currentUser && currentUser.email}!
                </Text>
                <TouchableOpacity
                    onPress={()=>{
                        firebase.auth().signOut().then(function() {
                            // Sign-out successful.
                            this.props.navigation.navigate('Loading')
                        }).catch(function(error) {
                            // An error happened.
                            console.log("error:")
                            console.log(error)
                        });
                    }}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})