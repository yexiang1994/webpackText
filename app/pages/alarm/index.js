import React, {Component} from 'react';
import dataReducer from './reducers';
import Contain from './contain';
import {applyMiddleware, createStore, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const middleware = [thunk, routerMiddleware(hashHistory)]
let store = createStore(dataReducer, applyMiddleware(...middleware))
export default class Alarm extends Component {
    handlePageChange() {}
    render() {
        return (<Provider store={store}>
            <div className="">
              <Contain {...this.props}/>
            </div>
        </Provider>)
    }
}
