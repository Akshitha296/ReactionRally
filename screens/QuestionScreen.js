import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'

export default class QuestionScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          questionList : [],
          numberTest: 0,
        }
      //this.requestRef= null
      }
    
      getQuestions = async() =>{
        var questions = []
        var requestRef = await db.collection("questions")
        .onSnapshot((snapshot)=>{
          questions = snapshot.docs.map(document => document.data());
          console.log(questions)
          this.setState({
          questionList: questions, 
          numberTest: 1,
        })
        })
        
       // console.log(this.state.questionList)
      //  console.log(this.state.numberTest)
      }
    
      componentDidMount(){
        this.getQuestions()
       // console.log(this.state.questionList)
      }
    
      componentWillUnmount(){
        //this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      // renderItem = ( {item, i} ) =>{
      //   console.log(this.state.questionList)
      //   return (
      //     <ListItem
      //       key={i}
      //       title={item.question}
      //       subtitle={item.description}
      //       titleStyle={{ color: 'white', fontWeight: 'bold' }}
      //       // rightElement={
      //       //     <TouchableOpacity style={styles.button}
      //       //     onPress = {() =>{
      //       //                   this.props.navigation.navigate('ReceiverDetailsScreen', {'details': item})
      //       //                 }}
      //       //     >
      //       //       <Text style={{color:'white', fontWeight: 'bold'}}>View</Text>
      //       //     </TouchableOpacity>
      //       //   }
      //       bottomDivider
      //     />
      //   )
      // }
    
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
                {item.question}
            </ListItem.Title>

            <ListItem.Subtitle
              style = {{color: '#E35D86'}}
            >
              {item.description}
            </ListItem.Subtitle>

            <TouchableOpacity
               style={styles.button}
               onPress = {() => {
                 this.props.navigation.navigate('Comment', {'details': item})
               }}
            >
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          </ListItem.Content>

          </ListItem>
        )
      }

      render(){
        return(
          <View style={{flex:1}}>
              {
                this.state.questionList.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{fontSize: 20}}>Today's Questions</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.questionList}
                    renderItem={this.renderItem}
                  />
                )
              }
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#EC88AC",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         }
      }
    })