import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pageContainerReducer from './reducers'
import PageContainerApp from './page-container-app'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router';

const middleware = [ thunk, routerMiddleware(hashHistory) ]
let store = createStore(
	pageContainerReducer,
	applyMiddleware(...middleware)
)

export default class PageContainer extends Component{
	render() {
	    return (
            <Provider store={store}>
                <PageContainerApp {...this.props}/>
            </Provider>
	    )
	}
}