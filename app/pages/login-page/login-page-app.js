import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUrl } from '../../common-values'
import LoginInput from './login-input'
import { fetchJson, generalFetchAction, initState } from '../../common-actions';
import { RECEIVE_LOGIN } from './actions'
import CommonUtils from '../../common-utils';
import { push } from 'react-router-redux'

class LoginPageApp extends Component{
	constructor(props){
		super(props);
		this.state={
			fn:null
		}
	}
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(initState());
        let fn = (e)=>{this.handleEnter(e,this)};
        this.setState({ fn  });
	    document.addEventListener("keydown",fn);
    }
    componentWillUnmount(){
		document.removeEventListener("keydown",this.state.fn);
	}
	handleEnter(e,self){
		if(e.keyCode === 13){
			self.handleLogin()();
		}
	}
    handleLogin(){
        const {dispatch, formData,params} = this.props;
        return ()=>{
            dispatch(
                fetchJson(
                    loginUrl,
                    {
                        name : CommonUtils.resolveFormData(formData, "login", "name", ""),
                        pwd : CommonUtils.resolveFormData(formData, "login", "pwd", ""),
                    },
                    "Login",
                    (msg) => (dispatch) => {
                        console.log(msg,"sssssss");
                        
                        if(msg&&msg.code == 0){
                            let userinfo = JSON.stringify(msg.result)
	                        localStorage.setItem('userinfo', userinfo)
	                        CommonUtils.setCookie("authenJWT", msg.message);
	                        CommonUtils.setCookie("username", CommonUtils.resolveFormData(formData, "login", "name", ""));
                            dispatch(push("alarm"));
                            // if(params && params.page === 'dashboard-fullscreen'){
		                    //     dispatch(push("dashboard-fullscreen"));
                            // }else if(params && params.page === 'fullscreen-blockone'){
		                    //     dispatch(push("fullscreen-one"));
                            // }else if(params && params.page === 'fullscreen-blocktwo'){
		                    //     dispatch(push("fullscreen-two"));
                            // }else if(params && params.page === 'fullscreen-blockthree'){
		                    //     dispatch(push("fullscreen-three"));
                            // }else{
		                    //     dispatch(push("dashboard"));
                            // }
                        }else{
                            dispatch({
                                type : RECEIVE_LOGIN,
                                data : msg
                            });
                        }
                    }
                )
            )
        }
    }

    render(){
        const {dispatch, formData, loginPageData} = this.props;
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
                                    dispatch={dispatch}
                                    name="name"
                                    scope="login"
                                    formData={formData}
                                />
                                <LoginInput
                                    title={"密码"}
                                    type={"password"}
                                    dispatch={dispatch}
                                    name="pwd"
                                    scope="login"
                                    formData={formData}
                                />
                                <div className="form-group row">
                                    <div className="col-md-12 align-items-center" style={{textAlign :"center"}}>
                                        <label className="error">{loginPageData.loginResult.message}</label>
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
                                            onClick={this.handleLogin()}>登录</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function select(state){
	return state;
}

export default connect(select)(LoginPageApp);
