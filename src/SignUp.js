// SignUp.js
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, ActivityIndicator, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import DismissKeyboard from "./utils/DismissKeyboard"
import DropdownAlert from 'react-native-dropdownalert';
import AuthenticationContainer from "./utils/AuthenticationContainer"
import TransparentTextInput from "./utils/TransparentTextInput"

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
                <AuthenticationContainer>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <TransparentTextInput 
                            placeholder="Name"
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                            handleVisibility={()=>{this.handleVisibility()}}
                            visible
                        />
                        <TransparentTextInput 
                            placeholder="Email"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            handleVisibility={()=>{this.handleVisibility()}}
                            visible={this.state.showEmailInput}
                        />
                        <TransparentTextInput 
                            placeholder="Password"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            handleVisibility={()=>{this.handleVisibility()}}
                            visible={this.state.showPasswordInput}
                            secureTextEntry
                        />
                         <TransparentTextInput 
                            placeholder="Confirm password"
                            onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                            value={this.state.passwordConfirmation}
                            handleVisibility={()=>{this.handleVisibility()}}
                            visible={this.state.showPasswordConfirmInput}
                            secureTextEntry
                        />

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
                    <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                </AuthenticationContainer>
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
        marginBottom: 64,
        fontSize: 16
    },
    safeScreenContent: {
        position: 'absolute', 
        width: width, 
        height: height, 
    }
})