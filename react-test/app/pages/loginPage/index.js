import React, { Component } from 'react'
import LoginPageApp from './login-page-app'

export default class LoginPage extends Component{
	render() {
	    return (
            <div>
                <LoginPageApp {...this.props}/>
            </div>
	    )
	}
}