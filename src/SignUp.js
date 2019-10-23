// SignUp.js
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, ActivityIndicator, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient';
import LogoBlack from "../assets/svgs/logo-black.svg"
import DismissKeyboard from "./utils/DismissKeyboard"
import DropdownAlert from 'react-native-dropdownalert';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get("window")

export default class SignUp extends React.Component {

    constructor(){
        super();
        this.state = { 
            name: '',
            email: '', 
            password: '', 
            passwordConfirmation: '',
            errorMessage: null,
            showEmailInput: false,
            showPasswordInput: false,
            showPasswordConfirmInput: false, 
            showSignUpButton: false,
            signingUp: false
        }
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
        this.renderSignInButton = this.renderSignInButton.bind(this);
    }

    handleSignUp(){
        this.setState({signingUp: true}, ()=>{
            if(this.state.password.trim() != this.state.passwordConfirmation.trim()){
                this.setState({signingUp: false}, ()=>{
                    this.dropDownAlertRef.alertWithType('error', 'Error', "Passwords do not match");
                })
            }else{
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.state.email.trim(), this.state.password.trim())
                    .then(() => {
                        var user = firebase.auth().currentUser;

                        user.updateProfile({
                        displayName: this.state.name
                        }).then(function() {
                            this.setState({signingUp: false},()=>{
                                this.props.navigation.navigate('Main')
                            })
                        }).catch(function(error) {
                            this.setState({signingUp: false},()=>{
                                this.dropDownAlertRef.alertWithType('error', 'Error', error.message);
                            })
                        });
                        
                    })
                    .catch(error => {
                        this.setState({signingUp: false}, ()=>{
                            this.dropDownAlertRef.alertWithType('error', 'Error', error.message);
                        })
                    })
            }
        })
        
    }

    handleVisibility(){
        this.setState({
            showEmailInput: this.state.name!="",
            showPasswordInput: this.state.name!="" && this.state.email!="",
            showPasswordConfirmInput: this.state.name!="" && this.state.email!="" && this.state.password!="",
            showSignUpButton: this.state.name!="" && this.state.email!="" && this.state.password!="" && this.state.passwordConfirmation!=""
        })
    }

    renderSignInButton(){
        if(this.state.showSignUpButton){
            if(this.state.signingUp){
                return(
                    <View style={[styles.buttonWrap, {marginTop: 24}]}>
                        <ActivityIndicator size="small" color="#ffffff" />
                    </View>
                )
            }else{
                return(
                    <View style={styles.buttonWrap}>
                        <TouchableOpacity
                            onPress={()=>{
                                this.handleSignUp()
                            }}
                        >
                            <Text style={styles.cadastrarText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }

    render() {
        return (
            <DismissKeyboard>
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
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={styles.textInputBackgroundWrap}>
                                <TextInput
                                    placeholder="Name"
                                    autoCapitalize="none"
                                    style={styles.textInput}
                                    onChangeText={name => this.setState({ name })}
                                    value={this.state.name}
                                    placeholderTextColor="white"
                                    onBlur={()=>{this.handleVisibility()}}
                                    onSubmitEditing={()=>{this.handleVisibility()}}
                                />
                            </View>
                            {this.state.showEmailInput &&
                                <View style={styles.textInputBackgroundWrap}>
                                    <TextInput
                                        placeholder="Email"
                                        autoCapitalize="none"
                                        style={styles.textInput}
                                        onChangeText={email => this.setState({ email })}
                                        value={this.state.email}
                                        placeholderTextColor="white"
                                        onBlur={()=>{this.handleVisibility()}}
                                        onSubmitEditing={()=>{this.handleVisibility()}}
                                    />
                                </View>
                            }
                            
                            {this.state.showPasswordInput &&
                                <View style={styles.textInputBackgroundWrap}>
                                    <TextInput
                                        secureTextEntry
                                        placeholder="Password"
                                        autoCapitalize="none"
                                        style={styles.textInput}
                                        onChangeText={password => this.setState({ password })}
                                        value={this.state.password}
                                        placeholderTextColor="white"
                                        onBlur={()=>{this.handleVisibility()}}
                                        onSubmitEditing={()=>{this.handleVisibility()}}
                                    />
                                </View>
                            }

                            {this.state.showPasswordConfirmInput &&
                                <View style={styles.textInputBackgroundWrap}>
                                    <TextInput
                                        secureTextEntry
                                        placeholder="Password"
                                        autoCapitalize="none"
                                        style={styles.textInput}
                                        onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                                        value={this.state.passwordConfirmation}
                                        placeholderTextColor="white"
                                        onBlur={()=>{this.handleVisibility()}}
                                        onSubmitEditing={()=>{this.handleVisibility()}}
                                    />
                                </View>
                            }

                            {this.renderSignInButton()}
                            
                            <View style={[styles.buttonWrap, styles.loginNavWrap]}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.props.navigation.navigate('Login')
                                    }}
                                >
                                    <Text style={styles.loginText}>Already have an account? Login</Text>
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
    logoWrap: {
        width: width, 
        alignItems: 'center', 
        marginTop: height*0.10,
        marginBottom: height*0.05
    },
    signUpText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    buttonWrap: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    loginNavWrap: {
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    cadastrarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 24
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 32,
        fontSize: 16
    },
    safeScreenContent: {
        position: 'absolute', 
        width: width, 
        height: height, 
    }
})