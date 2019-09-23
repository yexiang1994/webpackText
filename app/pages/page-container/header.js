import React, { Component } from 'react'
import GlModal from "../../common-view/modal";
import Utils from "../../common-utils";
import { push } from 'react-router-redux'

export default class Header extends Component{
	constructor(props){
		super(props);
		this.state = {
			mToggleData:false
		}
	}
	handleLogout(){
		this.setState({mToggleData:true});
	}
	doSureClick() {
		let { dispatch } = this.props;
		this.setState({mToggleData:false});
		Utils.deleteCookie("authenJWT");
		dispatch(push('login'));
	}
	doCloseClick() {
		this.setState({mToggleData:false});
	}
	modalTitle() {return '';}
	modalBody() {
		return (
			<div style={{padding:"1rem",textAlign:"center",fontSize:20}}>确定注销吗？</div>
		);
	}
	modalFooter() {
		let arr = [];
		arr.push(<button className='btn btn-primary' key="0"
		                 onClick={this.doSureClick.bind(this) }>确定 </button>);
		arr.push(<button className='btn btn-primary' key="1"
		                 onClick={this.doCloseClick.bind(this) }>取消 </button>);
		return arr;
	}
    render(){
	    const {username,userid} = this.props;
        return (
            <header className="topbar">
	            <h1 className={"tb-title m-b-0"}>天津市宝坻区农村生活污水处理智慧管控平台</h1>
	            <div className="user-profile">
		            {/* <div className="todo">

			            <div className="dropdown">
				            <a href="javascript:void(0)" className="u-dropdown link hide-menu" data-toggle="dropdown"
				               role="button" aria-haspopup="true" aria-expanded="false">
					            待办事项
				            </a>
				            <div className="dropdown-menu animated flipInY info-menu">
					            <a href="javascript:void(0)" className="dropdown-item">
						            需要处理的警报 <span className="red-highlight"> 1 </span> 条
					            </a>
					            <a href="javascript:void(0)" className="dropdown-item">
						            需要处理的工单 <span className="red-highlight"> 5 </span> 条
					            </a>
					            <a href="javascript:void(0)" className="dropdown-item">
						            需要处理的维护信息 <span className="red-highlight"> 2 </span> 条
					            </a>
					            <a href="javascript:void(0)" className="dropdown-item">
						            需要处理的打卡信息 <span className="red-highlight"> 3 </span> 条
					            </a>
					            <a href="javascript:void(0)" className="dropdown-item">
						            需要处理的车辆管理信息 <span className="red-highlight"> 12 </span> 条
					            </a>
				            </div>
			            </div>

			            <div className="notify">
				            <span className="heartbit"></span>
				            <span className="point"></span>
			            </div>
		            </div> */}
		            <div className="user-pro-body">
			            <img src="assets/images/users/2.jpg" alt="user-img" className="img-circle"/>
			            <div className="dropdown" style={{minHeight:21}}>
				            <span id="userid" style={{display:"none"}}>{userid}</span>
				            <a id="username" href="javascript:void(0)" className="dropdown-toggle u-dropdown link hide-menu" data-toggle="dropdown"
				               role="button" aria-haspopup="true" aria-expanded="false">
					            {username}
					            <span className="caret"></span>
				            </a>
				            <div className="dropdown-menu animated flipInY">
					            {/*<a href="javascript:void(0)" className="dropdown-item"><i className="ti-user"></i>修改密码</a>*/}
					            {/*<div className="dropdown-divider"/>*/}
					            <a className="dropdown-item"
					               onClick={this.handleLogout.bind(this)}
					            >
						            <i className="fa fa-power-off"></i> 退出
					            </a>
				            </div>
			            </div>
		            </div>
	            </div>
	            <GlModal
		            isOpen={this.state.mToggleData}
		            modalTitle={this.modalTitle()}
		            modalBody={this.modalBody()}
		            modalFooter={this.modalFooter()}
	            />
            </header>
        );
    }
}