import React from 'react'
import ReactDom from 'react-dom'
import {Link} from 'react-router'
import {Router, Route, hashHistory } from 'react-router';
import LoginPage from './pages/loginPage'
import DashboardPage from './pages/container'
import './pages/style/style.scss'
import loadable from '@loadable/component';

const DashboardPageLoad = loadable(()=> import('./pages/container/login-page-app'),{
	fallback: DashboardPage
})

ReactDom.render((<Router history={hashHistory}>
	<Route path="/" component={LoginPage}/>
	<Route path="/login" component={LoginPage}/>
	<Route path="/dashboard" component={DashboardPageLoad}></Route>
</Router>), document.getElementById('app'))
