import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView} from 'react-native'
import firebase from 'react-native-firebase'
import TravelIcon from "../assets/svgs/travel.svg"
export default class Loading extends React.Component {
    componentDidMount() {
        console.disableYellowBox = true;
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
    }

    render() {
        return (
        <View style={styles.container}>
            <TravelIcon width="240" height="240"/>
        </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})