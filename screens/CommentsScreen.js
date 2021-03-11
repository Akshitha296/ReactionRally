import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList,TouchableOpacity, Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'

export default class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            askerId: this.props.navigation.getParam('details')['user_id'],
            requestId: this.props.navigation.getParam('details')['request_id'],
            question: this.props.navigation.getParam('details')['question'],
            description: this.props.navigation.getParam('details')['description'],
            //receiverRequestDocId:'',
            comment: '',
            allComments: [],
        }
    }
    
    addComment = () => {
        db.collection('comments').add({
            commenterId: this.state.userId,
            askerId: this.state.askerId,
            requestId: this.state.requestId,
            question: this.state.question,
            description: this.state.description,
            comment: this.state.comment,
        })
    }

    getAllComments = () => {
        db.collection('comments').where("requestId", "==", this.state.requestId).onSnapshot((snapshot) => {
            var comments = snapshot.docs.map(document => document.data())
            this.setState({
                allComments: comments
            })
        })
        console.log(this.state.allComments)
    }

    componentDidMount(){
        this.getAllComments()
    }

    renderItem = ({item, i}) =>{
        console.log(item.description)
        return(
          <ListItem
            key = {i}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title
                style = {{ color: 'black', fontWeight: 'bold' }}
            >
                {item.comment}
            </ListItem.Title>

            <ListItem.Subtitle
              style = {{color: '#E35D86'}}
            >
              {item.commenterId}
            </ListItem.Subtitle>

          </ListItem.Content>

          </ListItem>
        )
      }

    render(){
        return(
            <View style = {{flex: 1, backgroundColor: 'E7CCD2', alignItems: 'center', justifyContent: 'center',}}>
                <Text style = {{fontWeight: 'bold',}}>
                    {this.state.question}
                </Text>

                <Text style = {{fontStyle: 'italic', marginTop: 20,}}>
                    {this.state.description}
                </Text>

                <Text style = {{fontStyle: 'italic', marginTop: 10,}}>
                    By: {this.state.askerId}
                </Text>


                {this.state.allComments.length === 0 
                    ? (
                        <TextInput
                            placeholder = "No comments yet, type here to add one!"
                            onChangeText = {(text) => {
                                this.addComment();
                            }}
                            style = {{borderColor: 'E8A8B8', borderRadius: 10, width: 250, marginTop: 20,}}
                        />
                    ) : (
                        <View>
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.allComments}
                                renderItem={this.renderItem}
                            />

                            <TextInput
                                placeholder = "Add to the conversation!"
                                onChangeText = {(text) => {
                                    this.setState({
                                        comment: text
                                    })
                                }}
                                style = {{borderColor: 'E8A8B8', borderRadius: 10,}}
                            />
                        </View>
                    )
                }
                <TouchableOpacity
                    onPress = {() => {
                        this.addComment()
                    }}
                    style = {{borderRadius: 15, backgroundColor: '#E35D86', width: 150, alignItems: 'center', justifyContent: 'center', marginTop: 10,}}
                >
                    <Text style = {{color: 'white', fontWeight: 'bold'}}>
                        Send Answer
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}