// Login.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, ActivityIndicator, StatusBar, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import DismissKeyboard from "./utils/DismissKeyboard"
import LinearGradient from 'react-native-linear-gradient';
import LogoBlack from "../assets/svgs/logo-black.svg"
import DropdownAlert from 'react-native-dropdownalert';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AuthenticationContainer from "./utils/AuthenticationContainer"
import TransparentTextInput from "./utils/TransparentTextInput"

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
                <AuthenticationContainer>
                    <View style={{flex: 1, alignItems: 'center'}}>

                    <TransparentTextInput 
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        handleVisibility={()=>{this.handleVisibility()}}
                        visible
                    />
                    <TransparentTextInput 
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        handleVisibility={()=>{this.handleVisibility()}}
                        visible={this.state.showPasswordInput}
                        secureTextEntry
                    />

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

                    <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                </AuthenticationContainer>
                        
            </DismissKeyboard>
            
        )
    }
}
const styles = StyleSheet.create({
    signupText: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 64,
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