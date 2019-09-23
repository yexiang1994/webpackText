import React, { Component } from 'react'
import BSTable from '../../common-view/bs-table'
import { GeneralBSTBody } from '../../common-view/gen-bs-tbody'
import { push } from 'react-router-redux'
import { chooseSite, doToggle, DEVICE_DATA, showModel} from './actions'
import { getSiteDeviceListUrl } from '../../common-values'
import {fetchJson, generalFetchAction, doModleToggle, toggleAlert} from '../../common-actions';
import {hashHistory} from 'react-router';
var siteListTitle = require("../../config/site-list-title.json");
let userRoleJson = require("../../config/userRole");
export default class TablePart extends Component {
    genTBody() {
        const { data,userRole } = this.props;
        let body = GeneralBSTBody(
            [
                record => record.serialNumber,
                record => record.name,
                record => {
                    if (record.siteState === "Online") {
                        return (
                            <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs btn-info state-button btn-86">在线-正常</button>
                        );
                    } else {
                        return (
                            <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs btn-secondary state-button btn-86">离线</button>
                        );
                    }
                },
                record => {
                    if (record.warningCount === 0) {
                        return < button type = "button" className = "btn waves-effect waves-light btn-rounded btn-xs state-button site-normal">正常</button>;
                    } else {
                        return <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs state-button site-abnormal">异常</button>
                    }
                },
                record => <span className="redColor">{record.warningCount}</span>,
	            record => <span className="redColor">{record.caseCount}</span>
            ],
            record => record.id,
            data.results,
            true,
            record => {
                return (
                    <div>
                        <button
                            type="button"
                            className="btn waves-effect waves-light btn-xs full-btn table-button"
                            onClick={this.handleDetailClicked(record)} style={{ marginRight: 10 + 'px' }} >
                            详情
                        </button>
	                    <button
		                    style={{ marginRight: 10 + 'px' }}
		                    type="button"
		                    className="btn waves-effect waves-light btn-xs empty-btn table-button"
		                    onClick={this.handleScreenshotClick.bind(this, record)}>
		                    截图
	                    </button>
                        { userRole === userRoleJson.admin ? <button
	                        style={{ marginRight: 10 + 'px' }}
	                        type="button"
	                        className="btn waves-effect waves-light btn-xs empty-btn table-button"
	                        onClick={this.handleEditClicked(record)}>
	                        编辑
                        </button> : "" }
	                    { userRole === userRoleJson.admin ? <button
		                    style={{ marginRight: 10 + 'px' }}
		                    type="button"
		                    className="btn waves-effect waves-light btn-xs empty-btn table-button"
		                    onClick={this.handleDeleteClicked.bind(this, record)}>
		                    删除
	                    </button> : "" }
	                    <button
		                    type="button"
		                    className="btn waves-effect waves-light btn-xs empty-btn table-button"
		                    onClick={this.handleDeviceClicked.bind(this, record)}>
		                    设备
	                    </button>
                    </div>
                );
            }
        );
        return body;
    }
    //跳转截图
	handleScreenshotClick(record){
        let {dispatch} = this.props;
        const { beforeLink,params } = this.props;
        let stateParams = {};

        beforeLink.currentPage ? stateParams.currentPage = beforeLink.currentPage : stateParams.currentPage = 0;
        stateParams.rebackParams = params
		if(record.stationNumber){
			// window.open(screenshotUrl.replace(/\[port\]/g,record.stationNumber * 40 + 20019));
            dispatch(push(
               { pathname: "/FRPList/"+record.stationNumber,
                state: stateParams}
            ));
		}else{
			dispatch(toggleAlert('站号有误', 'warning'))
		}
    }
    // 删除
    handleDeleteClicked(record) {
        const { dispatch } = this.props;
        dispatch(chooseSite(record))
        dispatch(doToggle({ view: 'delete' }))
        dispatch(doModleToggle({ toggle: true }))
    }
    handleDetailClicked(record) {
        const { beforeLink,params } = this.props;
        let stateParams = {};

        beforeLink.keyword ? stateParams.keyword = beforeLink.keyword : "";
        beforeLink.siteState ? stateParams.siteState = beforeLink.siteState : "";
        beforeLink.state ? stateParams.state = beforeLink.state : "";
        beforeLink.warning ? stateParams.warning = beforeLink.warning : "";
        beforeLink.currentPage ? stateParams.currentPage = beforeLink.currentPage : stateParams.currentPage = 0;
        stateParams.rebackParams = params
        return () => {
	        hashHistory.push({
                pathname:`/site-detail/${record.id}`,
                state: stateParams
            });
        }
    }
    handleEditClicked(record) {
        const { dispatch } = this.props;
        return () => {
            location.href = "#/edit-site/" + record.id;
        }
    }
    // 查看设备弹窗
    handleDeviceClicked(record) {
        let { dispatch} = this.props
        dispatch(chooseSite(record))
        dispatch(doToggle({ view: 'device' }))
        dispatch(doModleToggle({ toggle: true }))
        dispatch(showModel(false))
        this.requestDeciveList(dispatch, record.id)('device', 0)()
    }
    requestDeciveList(dispatch, id) {
        let { siteListData } = this.props
        return (scop, page) =>()=> {
            dispatch(fetchJson(
                getSiteDeviceListUrl,
                {
                    id: id,
                    currentPage: page
                },
                "devicedata",
                generalFetchAction(DEVICE_DATA)
            ))
        }
    }
    render() {
        let {loading} = this.props
        return (
            <div className="col-lg-12">
                <div className="card m-b-0">
                    <BSTable
                        titles={siteListTitle}
                        body={this.genTBody()}
                        className="table"
                    />
                </div>
            </div>
        );
    }
}
