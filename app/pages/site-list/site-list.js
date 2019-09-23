import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import siteListReducer from './reducers'
import SiteListApp from './site-list-app'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router';
import './site-list.css'
const middleware = [ thunk, routerMiddleware(hashHistory) ]
let store = createStore(
	siteListReducer,
	applyMiddleware(...middleware)
)

export default class SiteList extends Component{
	render() {
	    return (
            <Provider store={store}>
                <SiteListApp {...this.props}/>
            </Provider>
	    )
	}
}