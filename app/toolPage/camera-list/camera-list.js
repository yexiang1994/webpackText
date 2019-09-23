import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import cameraListReducer from './reducers'
import CameraListApp from './camera-list-app'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router';

const middleware = [ thunk, routerMiddleware(hashHistory) ]
let store = createStore(
	cameraListReducer,
	applyMiddleware(...middleware)
)

export default class ToolCameraList extends Component{
	render() {
	    return (
            <Provider store={store}>
                <CameraListApp {...this.props}/>
            </Provider>
	    )
	}
}