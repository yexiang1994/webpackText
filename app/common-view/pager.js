import React, { Component } from 'react'

export default class Pager extends Component {
	constructor(){
		super();
		this.state = {
			goTo:""
		}
	}
	addMarkPage(i) {
		let rd = Math.random()*i
		return (<li id={i} className="page-item disabled" key={"pager+" + this.props.scope + "-" + rd}>
			<a className="page-link" href="javascript:;">
				{i + 1}
			</a>
		</li>)
	}
	addNormalPage(i) {
		let rd = Math.random() * i
		return (<li id={i} className="page-item" key={"pager-" + this.props.scope + "-" + rd}>
			<a className="page-link" href="javascript:;"
				onClick={this.props.relatedAction(this.props.scope, i)}>
				{i + 1}
			</a>
		</li>)
	}
	addPointPage(i) {
		let rd = Math.random() * i
		return (<li id={i} className="page-item" key={"pager+" + this.props.scope + "-" + rd}>
			<a className="page-link" href="javascript:;"
				onClick={this.props.relatedAction(this.props.scope, i)}>
				...
			</a>
		</li>)
	}
	handleGoTO(){
		if(this.state.goTo!==""){
			let index = parseInt(this.state.goTo)-1;
			if(index < 0){
				this.props.relatedAction(this.props.scope, 0)()
			}else if(index >= this.props.pager.totalPage-1 ){
				this.props.relatedAction(this.props.scope, this.props.pager.totalPage-1)()
			}else{
				this.props.relatedAction(this.props.scope, index)()
			}
			this.refs.goToNum.value = ""
		}
	}
	render() {
		const { withPageNumber,customStyle } = this.props;
		const pager = this.props.pager;
		var pages = [];
		var prevPage = 0;
		var nextPage = 0;
		if (pager.currentPage != 0) {
			prevPage = pager.currentPage - 1;
		}
		if (pager.currentPage != (pager.totalPage - 1)) {
			nextPage = pager.currentPage + 1;
		} else {
			nextPage = pager.totalPage - 1;
		}
		// 超过7页做省略
		let moreThan7 = false;
		if (pager.totalPage > 7) {
			moreThan7 = true;
			// 保留第一页
			if (pager.currentPage === 0) {
				pages.push(this.addMarkPage(0))
			} else {
				pages.push(this.addNormalPage(0))
			}

			// 左边两个
			let leftNum = pager.currentPage - 1;
			// 数字小于10
			if (leftNum <= 0) {
				for (let i = 1; i <= 2; i++) {
					if (pager.currentPage === i) {
						pages.push(this.addMarkPage(i))
					} else {
						pages.push(this.addNormalPage(i))
					}
				}
			} else {
				// 添加左侧三个点
				if (pager.currentPage >= 4) {
					pages.push(this.addPointPage(pager.currentPage - 3))
				}
				for (let i = leftNum; i < pager.currentPage; i++) {
					pages.push(this.addNormalPage(i))
				}
				if (pager.currentPage !== pager.totalPage-1) {
					pages.push(this.addMarkPage(pager.currentPage))
				}
			}

			// 右边两个
			if (pager.currentPage >= 2) {
				for (let i = pager.currentPage + 1; i < pager.totalPage - 1; i++) {
					if (i <= (pager.currentPage + 1)) {
						pages.push(this.addNormalPage(i))
					}
				}
			}
			
			// 添加右侧三个点
			if (pager.currentPage + 4 < pager.totalPage ) {
				pages.push(this.addPointPage(pager.currentPage + 3))
			}

			// 保留最后一页
			if (pager.totalPage - 1 == pager.currentPage) {
				pages.push(this.addMarkPage(pager.totalPage - 1))
			} else {
				pages.push(this.addNormalPage(pager.totalPage - 1))
			}
		} else {
			// 小于7页
			for (var i = 0; i < pager.totalPage; i++) {
				if (i == pager.currentPage) {
					pages.push(this.addMarkPage(i));
				} else {
					pages.push(this.addNormalPage(i));
				}
			}
		}

		const borderRight = {
			display:'inline-block',
			width:"5em",padding:"0 0.5em 0",height:'100%',
			verticalAlign:"bottom"
		};
		const borderLeft = {
			display:'inline-block',
			borderTopLeftRadius: ".25rem",
			borderBottomLeftRadius: ".25rem",
			borderTopRightRadius: 'unset',
			borderBottomRightRadius: 'unset'
		};
		if (withPageNumber != null && withPageNumber == false) {
			pages = [];
		}
		return (
			<nav aria-label="Page navigation example" className="pagers-clear"
			     style={
				     customStyle ? customStyle : {}
			     }
			>
				<ul className="pagination">
					<li className="page-item">
						<a
							className="page-link"
							href="javascript:;"
							onClick={this.props.relatedAction(this.props.scope, prevPage)}>上一页</a>
					</li>
					{pages}
					<li className="page-item">
						<a
							className="page-link"
							href="javascript:;"
							onClick={this.props.relatedAction(this.props.scope, nextPage)}>下一页</a>
					</li>
					{
						moreThan7 ?
							<li className="page-item" style={{marginLeft:"1em"}}>
								<a
									className="page-link"
									href="javascript:;"
									onClick={this.handleGoTO.bind(this)}
									style={borderLeft}
								>前往</a>
								<input type="number" autoComplete="off" ref={"goToNum"}
								       min="1" max={pager.totalPage}
								       onChange={(e)=>{
									       this.setState({goTo: parseInt(e.target.value)})
								       }}
								       style={borderRight}
								       className="el-input__inner page-link" />
							</li>
							: ""
					}
				</ul>

			</nav>
		)
	}
}