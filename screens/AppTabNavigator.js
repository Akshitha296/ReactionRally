import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Alert, Image, Modal, ScrollView } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import QuestionScreen from '../screens/QuestionScreen'
import CreateQuestions from '../screens/CreateQuestions'

export const AppTabNavigator = createBottomTabNavigator({
    Questions: {
        screen: QuestionScreen,
        navigationOptions: {
            tabBarIcon: <Image source = {require('../assets/Answers.jpeg')}
                               style = {{width: 20, height: 20}}
                            />,
            tabBarLabel: "Questions"
        }
    },

    CreateQuestions: {
        screen: CreateQuestions,
        navigationOptions: {
            tabBarIcon: <Image source = {require('../assets/Questions.jpeg')}
                               style = {{width: 20, height: 20}}
                        />,
            tabBarLabel: "Add A Question"
        }
    }
})