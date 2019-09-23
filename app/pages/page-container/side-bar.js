import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { browserHistory} from 'react-router'

export default class Sidebar extends Component{
	componentDidMount(){
		//reinit sidebarMenu
		$(".scroll-sidebar, .right-side-panel, .message-center, .right-sidebar").perfectScrollbar();
	}
	onNavClick(addr){
		const {dispatch} = this.props;
		return ()=>{
			dispatch(push(addr));
		}
	}
	buildNavList(){
		const {navConfig} = this.props;
		let navList = [];
		let path = browserHistory.getCurrentLocation().hash
		let reg = /\/[a-zA-Z]+([\W]|[a-zA-Z])+/
		let matchPath = path.match(reg)[0]
		navConfig.navList.map((record)=>{
			let isActive=false;
			if (matchPath === record.link) isActive=true;
			navList.push(
				<li key={record.key}>
					<a className={isActive?"waves-effect waves-dark active":"waves-effect waves-dark"}
					    href="javascript:;" aria-expanded="false"
					    onClick={this.onNavClick(record.link)}>
						{
							(record.icon && record.icon !== "") ? <span className={"iconfont "+record.icon}/> :
								<i className="far fa-circle text-danger"></i>
						}
						<span className="hide-menu"  style={{marginLeft: '10px'}}>{record.title}</span>
					</a>
				</li>
			);
		});
		return navList;
	}
	render(){
		const leftSidebar = {
			zIndex:60,paddingTop:30
		};
		return (
			<aside className="left-sidebar" style={leftSidebar}>
				<div className="scroll-sidebar">
					<nav className="sidebar-nav">
						<ul id="sidebarnav">
							{this.buildNavList()}
						</ul>
					</nav>
				</div>
			</aside>
		);
	}
}