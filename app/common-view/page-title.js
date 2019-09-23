import React, { Component } from 'react'
let userRoleJson = require("./../config/userRole");
/*
    params : 
        title :
        buttonTitle : 
        handleClick :
*/

export default class PageTitle extends Component {
    renderButton() {
        const { title, buttonTitle, handleClick, rebackTitle,createTitle,handleCreateClick,handleReback,userRole } = this.props;
        let arr = []
        let listOne = ''
        let listTwo = ''
        let listThree = ''
        if (buttonTitle != null) {
            listOne = <div className="d-flex justify-content-begin align-items-center"><button
                type="button"
                className="btn btn-info d-none d-lg-block m-l-15"
                onClick={handleClick}>
                <i className="fa fa-plus-circle" style={{ marginRight: 5 }}></i>
                {buttonTitle}
            </button>
            </div>
        }
        //登录用户role 为 Maintainer/Normal(无法登录) 不显示
        userRole === userRoleJson.maintainer ? arr.push(
	        <div className="col-md-6 justify-content-begin align-items-center" key={'button-1'}/>
        ) : arr.push(
	        <div className="col-md-6 justify-content-begin align-items-center" key={'button-1'}>
		        {listOne}
	        </div>
        );
        if (rebackTitle != null) {
            listTwo = <div className="d-flex justify-content-end align-items-center"><button
                type="button"
                className="btn btn-info d-none d-lg-block m-l-15"
                onClick={handleReback}>
                <i className="fas fa-angle-left" style={{marginRight: 5}}></i>
                {rebackTitle}
            </button>
            </div>;
	        arr.push(<div className="col-md-6" key={'button-2'}>{listTwo}</div>);
        }
	    if (createTitle != null) {
            listThree = <div className="d-flex justify-content-end align-items-center"><button
                type="button"
                className="btn btn-info d-none d-lg-block m-l-15"
                onClick={handleCreateClick}>
                {createTitle}
            </button>
            </div>
        }
	    arr.push(<div className="col-md-6" key={'button-3'}>{listThree}</div>);
        return arr
    }
    render() {
        const { title } = this.props;
        return (
            <div className="row page-titles">
                <div className="col-md-2 align-self-center">
                    <h4 className="text-themecolor">{title}</h4>
                </div>
                <div className="col-md-10 align-self-center text-right" key={'page-title-1'}>
                    <div className="row">
                        {this.renderButton()}
                    </div>
                </div>
            </div>
        );
    }
}