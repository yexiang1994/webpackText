import React, { Component } from 'react'
import Header from './header'
import Sidebar from './side-bar'
import { connect } from 'react-redux'
import { fetchJson } from '../../common-actions';
import { getUserSessionUrl } from '../../common-values'
import {push} from 'react-router-redux'
var navConfig = require("../../config/nav-config");
let userRoleJson = require("../../config/userRole");
export class PageContainerApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentUsername:"",
	        userRole:"",
            userId:-1
        }
    }
    componentDidMount(){
        const {dispatch, requiredRight} = this.props,_this = this;
        if(window.innerWidth < 1024){
            $(".page-title").hide();
        }
        dispatch(
            fetchJson(
                getUserSessionUrl,
                {},
                "GetUserSession",
                (json) => (dispatch) => {
                    if(json.code === 0){
	                    _this.setState({userId: json.result.id});
	                    _this.setState({currentUsername: json.result.name});
	                    _this.setState({userRole: json.result.userRole});
                        if(requiredRight != null){
                            let rightChecker = false;
                            json.result.rightList.map(
                                (record) => {
                                    if(record == requiredRight){
                                        rightChecker = true;
                                    }
                                }
                            );
                            if(!rightChecker){
                                dispatch(push("login"));
                            }
                        }
                    }else{
                        dispatch(push("login"));
                    }
                }
            )
        )
    }
    render(){
        const {dispatch} = this.props;
        let {userRole} = this.state;
	    if(userRole === userRoleJson.admin){
		    navConfig = require("../../config/nav-config-admin");
	    }
        if(this.state.currentUsername === 'debugger'){
	        navConfig = require("../../config/nav-config-debugger");
        }
	    if(userRole === userRoleJson.principal){
		    navConfig = require("../../config/nav-config");
	    }
	    if(userRole === userRoleJson.sectionManager || userRole === userRoleJson.villageManager){
		    navConfig = require("../../config/nav-config-sectionManager");
	    }
	    if(userRole === userRoleJson.maintainer){   //Normal 无法登录
		    navConfig = require("../../config/nav-config-maintainer");
	    }
	    return (
            <div id="main-wrapper">
                <div className="preloader" style={{display:'none'}}>
                    <div className="loader">
                        <div className="loader__figure"/>
                        <p className="loader__label">加载中...</p>
                    </div>
                </div>
                <Header dispatch={dispatch} userid={this.state.userId} username={this.state.currentUsername}/>
                <Sidebar navConfig={navConfig} dispatch={dispatch}/>
                <div className="page-wrapper height-100">
                    <div className="container-fluid height-100">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

function select(state){
	return state;
}

export default connect(select)(PageContainerApp);
