import React, { Component } from 'react'
import LoginInput from './login-input'
import BSTable from './../common-view/bs-table'
import alarm from './../config/alarm'
import './../style/msg.scss';
class LoginPageApp extends Component{
	constructor(props){
		super(props);
		this.state={
		}
	}
  
    handleLogin() {
        this.props.router.push("/dashboard")
    }
    bsList(){

    }
    render(){
        return (
            <section id="wrapper">
                <div className="login-register"
                    style={{
                        backgroundImage:"url(assets/images/login-register.jpg)"}}>
                    <div className="login-box card">
                        <div className="card-body">
                            <form className="form-horizontal form-material" id="loginform" action="index.html">
                                <h3 className="text-center m-b-20">登录</h3>
                                <LoginInput
                                    title={"用户名"}
                                    type={"text"}
                                    name="name"
                                    scope="login"
                                />
                                <LoginInput
                                    title={"密码"}
                                    type={"password"}
                                    name="pwd"
                                    scope="login"
                                />
                                <div className="form-group row">
                                    <div className="col-md-12 align-items-center" style={{textAlign :"center"}}>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <div className="d-flex no-block align-items-center">
                                            <div className="custom-control custom-checkbox">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <div className="col-xs-12 p-b-20" style={{padding:5}}>
                                        <button
                                            className="btn btn-block btn-lg btn-info btn-rounded"
                                            type="button"
                                            onClick={this.handleLogin.bind(this)}>登录</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="bodys">
                            <BSTable titles={alarm} body={this.bsList.bind(this)}></BSTable>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default LoginPageApp
