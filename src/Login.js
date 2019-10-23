// Login.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, ActivityIndicator, StatusBar, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import DismissKeyboard from "./utils/DismissKeyboard"
import LinearGradient from 'react-native-linear-gradient';
import LogoBlack from "../assets/svgs/logo-black.svg"
import DropdownAlert from 'react-native-dropdownalert';

const { width, height } = Dimensions.get("window")
export default class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            email: '', 
            password: '', 
            errorMessage: null,
            showPasswordInput: false,
            showLoginButton: false,
            signingIn: false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
        this.renderLoginButton = this.renderLoginButton.bind(this);
    }

    handleLogin() {
        this.setState({signingIn: true},()=>{
            const { email, password } = this.state
            firebase
                .auth()
                .signInWithEmailAndPassword(email.trim(), password.trim())
                .then(() => {
                    this.setState({signingIn: false},()=>{
                        this.props.navigation.navigate('Main')
                    })
                })
                .catch(error => {
                    this.setState({signingIn: false},()=>{
                        this.dropDownAlertRef.alertWithType('error', 'Error', error.message);
                    })
                })
        })
        
    }

    handleVisibility(){
        this.setState({
            showPasswordInput: this.state.email!="",
            showLoginButton: this.state.email!="" && this.state.password!=""
        })
    }

    renderLoginButton(){
        if(this.state.showLoginButton){
            if(this.state.signingIn){
                return(
                    <View style={[styles.buttonWrap, {marginTop: 24}]}>
                        <ActivityIndicator size="small" color="#ffffff" />
                    </View>
                )
            }else{
                return(
                    <View style={[styles.buttonWrap, {marginTop: 24}]}>
                        <TouchableOpacity
                            onPress={()=>{
                                this.handleLogin()
                            }}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }

    render() {
        return (
            <DismissKeyboard>
                <View style={{flex: 1}}>
                    <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0,0,0,0.0)"/>
                    <LinearGradient
                        colors={['rgb(73,85,221)', 'rgb(51,152,220)', 'rgb(20,212,215)']}
                        style={{width: width, height: height}}
                    />
                    <SafeAreaView style={styles.safeScreenContent}>
                        <View style={styles.logoWrap}>
                            <LogoBlack height={100} width={200} fill="white"/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>

                            <View style={styles.textInputBackgroundWrap}>
                                <TextInput
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    placeholder="Email"
                                    onChangeText={email => this.setState({ email })}
                                    value={this.state.email}
                                    placeholderTextColor="white"
                                    onBlur={()=>{this.handleVisibility()}}
                                    onSubmitEditing={()=>{this.handleVisibility()}}
                                />
                            </View>

                            {this.state.showPasswordInput && 
                                <View style={styles.textInputBackgroundWrap}>
                                    <TextInput
                                        secureTextEntry
                                        style={styles.textInput}
                                        autoCapitalize="none"
                                        placeholder="Password"
                                        onChangeText={password => this.setState({ password })}
                                        value={this.state.password}
                                        placeholderTextColor="white"
                                        onBlur={()=>{this.handleVisibility()}}
                                        onSubmitEditing={()=>{this.handleVisibility()}}
                                    />
                                </View>
                            }
                            
                            {this.renderLoginButton()}

                            <View style={[styles.buttonWrap, styles.signupNavWrap]}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.props.navigation.navigate('SignUp')
                                    }}
                                >
                                    <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </SafeAreaView>
                    <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                </View>
            </DismissKeyboard>
            
        )
    }
}
const styles = StyleSheet.create({
    signupText: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 32,
        fontSize: 16
    },
    loginButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    buttonWrap: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    signupNavWrap: {
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    textInput: {
        color: 'white',
        padding: 12,
        width: '100%',
        height: 50,
    },
    textInputBackgroundWrap: { //prevents a bug from react-native
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: '60%',
        borderRadius: 5,
        height: 50,
        marginTop: 24
    },
    loginText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
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