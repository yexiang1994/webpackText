import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import loginPageReducer from './reducers'
import LoginPageApp from './login-page-app'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router';

const middleware = [ thunk, routerMiddleware(hashHistory) ]
let store = createStore(
	loginPageReducer,
	applyMiddleware(...middleware)
)

export default class LoginPage extends Component{
	render() {
	    return (
            <Provider store={store}>
                <LoginPageApp {...this.props}/>
            </Provider>
	    )
	}
}