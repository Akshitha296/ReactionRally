import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Alert, Image, Modal, ScrollView, TouchableHighlight } from 'react-native';
//import MyHeader from '../components/myHeader'
import db from '../config'
import firebase from 'firebase'

export default class RequestScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            question: '',
            description: '',
            userId: firebase.auth().currentUser.email,
            request_id: '',
            isBookRequestActive: '',
            userDocId: '',
            requestedBookName: '',
            bookStatus: '',
            docId: '',
            Imagelink: '',
            dataSource: '',
            showFlatlist: false,
        }
    }

    createUniqueId(){
        return(Math.random().toString(36).substring(7))
    }

    addRequest = async(question, description) =>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('questions').add({
            user_id: userId,
            question: question,
            description: description,
            request_id: randomRequestId,
            date: firebase.firestore.FieldValue.serverTimestamp(),
        })
        this.setState({
            question: '',
            description: '',
        })
    }

    // sendNotification = () => {
    //     db.collection('users').where('emailId', '==', this.state.userId).get().then((snapshot) => {
    //         snapshot.forEach((doc) => {
    //             var name = doc.data().first_name
    //             var lastName = doc.data.last_name
    //             db.collection('all_notifications').where('request_id', '==', this.state.request_id).get().then((snapshot) => {
    //                 snapshot.forEach((doc) => {
    //                     var donorId = doc.data().donor_id
    //                     var bookName = doc.data().book_name
    //                     db.collection('all_notifications').add({
    //                         targeted_user_id: donorId,
    //                         message: name + " " + lastName + " received the book: "  + bookName,
    //                         notification_status: 'unread',
    //                         book_name: bookName,
    //                     })
    //                 })
    //             })
    //         })
    //     })
    // }

    render(){
            return(
                <View style = {{flex: 0.5}}>
                        <View style = {{justifyContent: 'center', alignItems: 'center',}}>
                            <Text style = {{fontSize: 20}}>
                                Ask A Question!
                            </Text>
                        </View>
                        <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                                <TextInput
                                    style = {styles.formTextInput}
                                    placeholder = "Question Title"
                                    onChangeText = {text => {
                                        this.setState({
                                            question: text
                                        })
                                    }}
                                    value = {this.state.question}
                                /> 
                                <TextInput
                                    style = {[styles.formTextInput, {height: 300}]}
                                    placeholder = "Description"
                                    onChangeText = {(text) => {
                                        this.setState({
                                            description: text
                                        })
                                    }}
                                    value = {this.state.description}
                                    multiline
                                    numberOfLines = {8}
                                />

                                <TouchableOpacity style = {styles.requestButton} 
                                                onPress = {() =>{
                                                    this.addRequest(this.state.question, this.state.description)
                                                }}
                                >
                                    <Text>
                                        Ask!
                                    </Text>
                                </TouchableOpacity>
                        </View>
                </View>
            )
        }
    }

const styles = StyleSheet.create({
    keyboardStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formTextInput: {
        width: '75%',
        height: 40,
        borderRadius: 3,
        borderColor: '#F59FB7',
        alignSelf: 'center',
        marginTop: 20,
    }, 
    requestButton: {
        width: '75%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#E35D86'
    }
})