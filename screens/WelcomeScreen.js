import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Alert, Image, Modal, ScrollView } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/auth'
import db from '../config'

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state = { 
                emailId: '',
                password: '',
                firstName: '',
                lastName: '',
                contact: '',
                address:'',
                confirmPassword: '',
        }
    }

    userLogin = async(email, pwd) =>{
        if(email && pwd){
            console.log(email)
                const response = await firebase.auth().signInWithEmailAndPassword(email, pwd)
                console.log(response)
                if (response){
                    console.log("Logged In Successfully")
                    this.props.navigation.navigate('Questions')
                }
        } else {
            Alert.alert("Enter an email id, or a password")
        }
    }

    userSignUp = async(email, pwd, confirmpwd) =>{
        console.log(pwd + ',' + confirmpwd)
        if (pwd !== confirmpwd){
            console.log("Passwords don't match.")
            return(
                Alert.alert("Passwords don't match.")
            ) 
        } else {
            if(email && pwd){
                console.log(email)
                    firebase.auth().createUserWithEmailAndPassword(email, pwd).then((response) => {
                                                                                                    db.collection("users").add({
                                                                                                        first_name: this.state.firstName,
                                                                                                        last_name: this.state.lastName,
                                                                                                        contact: this.state.contact,
                                                                                                        address: this.state.address,
                                                                                                        emailId: this.state.emailId,
                                                                                                        isBookRequestActive: false,
                                                                                                    })
                    console.log("Sign Up Successful!")
                    return(
                        Alert.alert("Sign Up Successful!", '', [{text: "okay", onPress: () => this.setState({
                            isModalVisible: false,
                        })}])
                    )
                     }).catch(function(error){
                         var ErrorMessage = error.message;
                         console.log(ErrorMessage)
                         return(
                             Alert.alert(ErrorMessage)
                         )
                     })
            } else {
                Alert.alert("Enter an email id, or a password")
            }
        }
    }

    showModal = () => {
        return(
            <Modal animationType = "fade" 
                   transparent = {true}
                   visible = {this.state.isModalVisible}
            >
                <View style = {styles.modalContainer}>
                    <ScrollView style = {{width: '100%'}}>
                        <KeyboardAvoidingView style = {styles.kavStyle}>
                            <Text style = {styles.modalTitle}>
                                Registration
                            </Text>
                            <TextInput
                                placeholder = "First Name"
                                style = {styles.txtInput}
                                maxLength = {10}
                                onChangeText = {(text) => {
                                                            this.setState({
                                                                firstName: text
                                                            })
                                                        }}
                            />
                            <TextInput
                                placeholder = "Last Name"
                                maxLength = {14}
                                style = {styles.txtInput}
                                onChangeText = {(text) => {
                                                            this.setState({
                                                                lastName: text
                                                            })
                                                        }}
                            />
                            <TextInput
                                placeholder = "Phone Number"
                                maxLength = {10}
                                style = {styles.txtInput}
                                keyboardType = {'numeric'}
                                onChangeText = {(text) => {
                                                            this.setState({
                                                                contact: text
                                                            })
                                                        }}
                            />
                            <TextInput
                                placeholder = "Address"
                                multiline = {true}
                                style = {styles.txtInput}
                                onChangeText = {(text) => {
                                                            this.setState({
                                                                address: text
                                                            })
                                                        }}
                            />
                            <TextInput
                                placeholder = "Email Address"
                                keyboardType = "email-address"
                                style = {styles.txtInput}
                                onChangeText = {(text) => {
                                                            this.setState({
                                                                emailId: text
                                                            })
                                                        }}
                            />
                            <TextInput
                                placeholder = "Password"
                                secureTextEntry = {true}
                                maxLength = {10}
                                style = {styles.txtInput}
                                onChangeText = {(text) => {
                                                            this.setState({
                                                                password: text
                                                            })
                                                        }}
                            />
                            <TextInput
                                placeholder = "Confirm Password"
                                maxLength = {10}
                                style = {styles.txtInput}
                                secureTextEntry = {true}
                                onChangeText = {(text) => {
                                                            this.setState({
                                                                confirmPassword: text
                                                            })
                                                        }}
                            />
                            <View style = {styles.modalBackButton}>
                                <TouchableOpacity style = {styles.registerButton}
                                onPress = {() => {
                                                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                                }}>
                                    <Text style = {styles.registerButtonText}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style = {styles.modalBackButton}>
                                <TouchableOpacity style = {styles.cancelButton}
                                                                onPress = {() =>{
                                                                    this.setState({
                                                                        isModalVisible: false
                                                                    })
                                }}>
                                    <Text style = {{color: "#BC8583"}}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {{justifyContent: 'center', alignItems: 'center',}}>
                    {this.showModal()}
                </View>

                <View style = {{ justifyContent: 'center', alignItems: 'center',}}>
                    <Image
                        source = {require('../assets/FullLogo.jpeg')}
                        style = {{width: 100, height: 100}}

                    />
                </View>

                <View style = {styles.headingContainer}>
                    <Text style = {styles.title}>
                        Reaction Rally
                    </Text>
                </View>

                <View style = {styles.buttonContainer}>
                    <TextInput
                        style = {styles.loginBox}
                        placeholder = "Email Id"
                        keyboardType = 'email-address'
                        onChangeText = {(text) => {
                            this.setState({
                                emailId: text,
                            })
                        }}
                    />

                    <TextInput
                        style = {styles.loginBox}
                        placeholder = "Password"
                        secureTextEntry = {true}
                        onChangeText = {(text) => {
                            this.setState({
                                password: text,
                            })
                        }}
                    />

                    <TouchableOpacity
                    style = {styles.loginButton}
                        onPress = {() => {
                            this.userLogin(this.state.emailId, this.state.password)
                        }}>
                            <Text style = {styles.buttonText}>
                                Login
                            </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                    style = {styles.loginButton}
                        onPress = {() => {
                            this.setState({
                                isModalVisible: true,
                            })
                        }}>
                            <Text style = {styles.buttonText}>
                                Sign Up
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9E1E0'
    },
    headingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9E1E0'
    },
    title: {
        fontSize: 30,
        color: "#BC8583",
        margin: 30,
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#F9E1E0'
    },
    loginBox: {
        width: 300,
        height: 50,
        borderWidth: 2,
        borderColor: '#BC8583',
        fontSize: 20,
        margin: 10,
    },
    loginButton: {
        backgroundColor: "#9799BA",
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 20,
    },
    kavStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    modalTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        color: "#BC8583",
        margin: 50,
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FEADB9",
        margin: 30,
        borderColor: '#9799BA',
    },
    modalBackButton: {
        
    },
    txtInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: "#BC85A3       `1q `1qwa",
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    }, 
    registerButton: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: '#9799BA'
    }, 
    registerButtonText: {
        color: "white",
        fontSize: 15, 
    }, 
    cancelButton: {
        width: 200,
        height: 30,
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#FEADB99'
    }
})