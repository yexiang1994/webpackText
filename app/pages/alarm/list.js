import React, { Component } from 'react';
import BSTable from '../../common-view/bs-table';
import {GeneralBSTBody} from '../../common-view/gen-bs-tbody';
import {doModleToggle, toggleAlert} from '../../common-actions'
import {chooseSite, setStationNumber} from './actions'
import CommonUtils from "./../../common-utils"
import {doToggle} from "../site-list/actions";
import {getSiteDetailUrl, createWarningCase, pushWarningCase} from "../../common-values";
let alarmTitle = require('./../../config/alarm-list');
let userRoleJson = require("../../config/userRole");
class List extends Component {
    bsList(data) {
    	let {userRole} = this.props;

		if(userRole === userRoleJson.admin || userRole === userRoleJson.OperationManager || userRole === userRoleJson.MaintainManager
			|| userRole === userRoleJson.maintainer || userRole === userRoleJson.Operator){
		    let body = GeneralBSTBody([
			    record => record.id,
			    record => record.siteName,
			    record => {
				    if (record.warningLevel === 'Low' || record.warningLevel === 'Notification') {
					    return (<div className="row btn-row flex-justify-content-center">
						    <span className="redColor">
							    {record.displayWarningLevel}
						    </span>
					    </div>)
				    } else if(record.warningLevel === 'Normal') {
					    return (<div className="row btn-row flex-justify-content-center">
						   <span className="redColor">
							    {record.displayWarningLevel}
						    </span>
					    </div>)
				    }else if(record.warningLevel === 'High' || record.warningLevel === 'Emergent') {
					    return (<div className="row btn-row flex-justify-content-center">
						    <span className="redColor">
							    {record.displayWarningLevel}
						    </span>
					    </div>)
				    }else if(record.warningLevel === 'Closed') {
					    return (<div className="row btn-row flex-justify-content-center">
						    <span className="redColor">
							    {record.displayWarningLevel}
						    </span>
					    </div>)
				    }else if(record.warningLevel === 'Expired'){
					    return (<div className="row btn-row flex-justify-content-center">
						    <span className="redColor">
							    {record.displayWarningLevel}
						    </span>
					    </div>)
				    }else{
				    	return (<div></div>)
				    }
			    },
			    record => {
				    return (<div className="row btn-row flex-justify-content-center">
					    <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs state-button alarm-type-btn">
						    {record.displayWarningType}
					    </button>
				    </div>)
			    },
			    record => CommonUtils.timestampToTime(record.timestamp,'YY-MM-DD hh:mm:ss'),
			    record => record.description  //类型
		    ], record=>record.id, data.results, true, record => {
			    if (record.warningLevel !== 'Closed') {
				    return (<div className="row btn-row">
						{
							record.warningState === "WorkingOn" ? 
							<button disabled={"disabled"} type="button" onClick={()=>{}} className="btn waves-effect waves-light btn-xs full-btn table-button">
								处理中
							</button>
							: null
						}
						{
							record.upperLevelPush <= 0 ?
							<button type="button" onClick={this.doVerify.bind(this, record)} className="btn waves-effect waves-light btn-xs full-btn table-button">
								确认
							</button>
							: null
						}
						{
							!record.caseId && (userRole === userRoleJson.OperationManager || userRole === userRoleJson.MaintainManager) 
							&& record.warningType != "PLCCommunicationError" &&  
							record.warningType != "PowerCommunicationError" ? 
							<button type="button" onClick={this.turnToCase.bind(this, record)} className="btn waves-effect waves-light btn-xs full-btn table-button">
								转为工单
							</button>
							: null
						}
					    <button type="button" onClick={this.doCloseClick.bind(this, record)}
					            className="btn waves-effect waves-light btn-xs empty-btn table-button m-l-15">
						    关闭
					    </button>
				    </div>)
			    } else {
				    return (<div></div>)
			    }
		    },null,record => {
			    this.doWarningTypeClick(record);
		    });
		    return body
	    }else{
		    let body = GeneralBSTBody([
			    record => record.id,
			    record => record.siteName,
			    record => {
				    if (record.warningLevel === 'Low' || record.warningLevel === 'Notification') {
					    return (<div className="row btn-row flex-justify-content-center">
						    <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs btn-success state-button btn-68">
							    {record.displayWarningLevel}
						    </button>
					    </div>)
				    } else if(record.warningLevel === 'Normal') {
					    return (<div className="row btn-row flex-justify-content-center">
						    <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs btn-warning state-button btn-68">
							    {record.displayWarningLevel}
						    </button>
					    </div>)
				    }else if(record.warningLevel === 'High' || record.warningLevel === 'Emergent') {
					    return (<div className="row btn-row flex-justify-content-center">
						    <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs btn-danger state-button btn-68">
							    {record.displayWarningLevel}
						    </button>
					    </div>)
				    }else if(record.warningLevel === 'Closed') {
					    return (<div className="row btn-row flex-justify-content-center">
						    <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs state-button btn-68"
						            style={{background:'rgba(221,221,221,.6)'}}>
							    {record.displayWarningLevel}
						    </button>
					    </div>)
				    }else if(record.warningLevel === 'Expired'){
					    return (<div className="row btn-row flex-justify-content-center">
						    <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs state-button btn-68"
						            style={{background:'rgba(221,221,221,.6)'}}>
							    {record.displayWarningLevel}
						    </button>
					    </div>)
				    }else{
					    return (<div></div>)
				    }
			    },
			    record =>{
				    return (<div className="row btn-row flex-justify-content-center">
					    <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs state-button btn-danger">
						    {record.displayWarningType}
					    </button>
				    </div>)
			    },
			    record => CommonUtils.timestampToTime(record.timestamp,'YY-MM-DD hh:mm:ss'),
			    record => record.description
		    ], record=>record.id,data.results,false,null,null,
			    record => {
			    this.doWarningTypeClick(record);
		    });
		    return body
	    }
	}
	
	doVerify(record,e) {
		let {dispatch,doRefresh} = this.props
		e.stopPropagation()
        CommonUtils.doJsonPost(pushWarningCase,{
			id: record.id
		}).then((res)=>{
			if(res.code === 0) {
				dispatch(toggleAlert('操作成功', 'success'));
				doRefresh()
			} else {
				dispatch(toggleAlert(res.message, 'success'));
			}
		})
        
    }
    doCloseClick(record,e) {
        let { dispatch } = this.props;
		e.stopPropagation();
        dispatch(chooseSite(record));
	    dispatch(doToggle({ view: 'close' }));
        dispatch(doModleToggle({ toggle: true }));
    }
	doWarningTypeClick(record) {
		let { dispatch } = this.props;
		dispatch(doToggle({ view: 'warning' }));
		dispatch(chooseSite(record));

		CommonUtils.doJsonPost(getSiteDetailUrl,{
			id:record.siteId
		}).then((res)=>{
			if (res.code === 0) {
				dispatch(setStationNumber(res.result.stationNumber))
			} else {
				dispatch(toggleAlert(res.message, 'error'))
			}
		});

		dispatch(doModleToggle({ toggle: true }));
	}
	turnToCase(record,e) {
		let {dispatch,doRefresh} = this.props
		e.stopPropagation()
		CommonUtils.doJsonPost(createWarningCase,{
			id: record.id,
			siteId: record.siteId
		}).then((res)=>{
			if(res.code === 0){
				dispatch(toggleAlert('操作成功', 'success'));
				doRefresh()
			}
		})
	}
    render() {
        let {alarmList,userRole} = this.props;
		if(userRole === userRoleJson.admin || userRole === userRoleJson.OperationManager || userRole === userRoleJson.MaintainManager 
			|| userRole === userRoleJson.maintainer || userRole === userRoleJson.Operator){
			alarmTitle = require('./../../config/alarm-list-admin');
		}else{
			alarmTitle = require('./../../config/alarm-list');
		}
        return (
	        <div className="col-lg-12">
		        <div className="card m-b-0">
		            <BSTable titles={alarmTitle} body={this.bsList(alarmList)} className="table" />
		        </div>
	        </div>)
    }
}

export default List
