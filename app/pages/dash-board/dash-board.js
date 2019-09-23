import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router';
import CommonUtils from "../../common-utils";
import DashboardApp from './dash-board-app'
// import dataReducer from "./../geographic-fullscreen-new-dashboard/reducers";
// import Geographic from "./../geographic-fullscreen-new-dashboard/index"

const middleware = [ thunk, routerMiddleware(hashHistory)];
let store = createStore(
	applyMiddleware(...middleware)
);

function getUser() {
	let username = CommonUtils.getCookie('username');
	return username === 'xmb';
}

export default class PageContainer extends Component{
	render() {
	    return (
            <Provider store={store}>
	            <DashboardApp  {...this.props}/>
            </Provider>
	    )
	}
}