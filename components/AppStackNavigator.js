import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import QuestionScreen from '../screens/QuestionScreen'
import CommentsScreen from '../screens/CommentsScreen'

export const AppStackNavigator = createStackNavigator({
    QuestionScreen: {
        screen: QuestionScreen,
        navigationOptions: {headerShown: false}
    },
    Comment: {
        screen: CommentsScreen,
        navigationOptions: {headerShown: false}
    }},
    {initialRouteName: 'QuestionScreen'}
)