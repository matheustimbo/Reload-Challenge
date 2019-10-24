import React from 'react'
import { View, StyleSheet, StatusBar, SafeAreaView, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import LogoBlack from "../../assets/svgs/logo-black.svg"
const { width, height } = Dimensions.get("window")
const AuthenticationContainer = ({ children }) => {
    return (
        <View style={{width: width, height: height}}>
            <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0,0,0,0.0)"/>
            <LinearGradient
                colors={['rgb(73,85,221)', 'rgb(51,152,220)', 'rgb(20,212,215)']}
                style={{width: width, height: height + getStatusBarHeight()}}
            />
            <SafeAreaView style={styles.safeScreenContent}>
                <View style={styles.logoWrap}>
                    <LogoBlack height={100} width={200} fill="white"/>
                </View>
                {children}
            </SafeAreaView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    safeScreenContent: {
        position: 'absolute', 
        width: width, 
        height: height, 
    },
    logoWrap: {
        width: width, 
        alignItems: 'center', 
        marginTop: height*0.10,
        marginBottom: height*0.05
    },
})

export default AuthenticationContainer;