// Main.js
import React from 'react'
import { StyleSheet, StatusBar, View, SafeAreaView, Dimensions} from 'react-native'
import firebase from 'react-native-firebase'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { TabView, SceneMap } from 'react-native-tab-view';
import Tab1 from "./Tab1"
import Tab2 from "./Tab2"

export default class Main extends React.Component {
    
    constructor(){
        super();
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'City' },
                { key: 'second', title: 'List' },
            ],
        }
    }

    componentDidMount(){
        
    }


    render() {
        return (
            <View style={{flex: 1, paddingTop: getStatusBarHeight(), backgroundColor: "#3995F9"}}>
                <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0,0,0,0.0)"/>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                    first: Tab1,
                    second: Tab2,
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
  scene: {
      flex: 1
  }
})