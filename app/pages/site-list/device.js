import React, { Component } from 'react'
import BSTable from '../../common-view/bs-table'
import { GeneralBSTBody } from '../../common-view/gen-bs-tbody'
import { push } from 'react-router-redux'
import { chooseSite, chooseDevice, toggleEdits,RECEIVE_CONTROLLER_CONFIG, DEVICE_DATA, SHOW_DELETE_DEVICE_MODAL, showModel, doEditDefaulValue } from './actions'
import {getDeviceConfigUrl, getSiteDeviceListUrl, consoleUrl} from '../../common-values'
import {fetchJson, generalFetchAction, doModleToggle, formChange, toggleAlert} from '../../common-actions';
import { doToggle } from './actions'
import deviceListTitle from "../../config/device-title.json"
import CreateSiteApp from './create-device-app'
import GlModal from './../../common-view/modal'
import EditDevice from './edit-device'
let userRoleJson = require("../../config/userRole");

let deviceType = {
	Gun:"GunCamera",
	Ball:"BallCamera",
    NVR:"NVR"
};

export default class DeviceModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editDataRow: {
                checkSiteRow: {},
                deviceDataRow: {}
            },
            showEidt: false,
            deleteDataRow:{}
        }
    }
    fetchControllerConfig() {
        const { dispatch } = this.props;
        return (stationNumber) => {
            dispatch(fetchJson(
                getDeviceConfigUrl,
                {
                    stationNum: stationNumber
                },
                "FetchControllerConfig",
                generalFetchAction(RECEIVE_CONTROLLER_CONFIG)
            ))
        }
    }
    genTBody(result) {
        let {userRole} = this.props;
        let body = GeneralBSTBody(
            [
                record => record.id,
                record => record.name,
                record => record.displayType
            ],
            record => record.id,
            result,
            true,
            record => {
                return (
                    <div>
                        <button
                            type="button"
                            className="btn waves-effect waves-light btn-xs full-btn table-button"
                            onClick={this.handleDetailClicked.bind(this, record)} style={{ marginRight: 15 + 'px' }} >
                            详情
                        </button>
                        {userRole === userRoleJson.admin ? <button
	                        style={{ marginRight: 15 + 'px' }}
	                        type="button"
	                        className="btn waves-effect waves-light btn-xs empty-btn table-button"
	                        onClick={this.handleEditClicked.bind(this, record)}>
	                        编辑
                        </button> : ""}
	                    {userRole === userRoleJson.admin ? <button
		                    type="button"
		                    style={{ marginRight: 15 + 'px' }}
		                    className="btn waves-effect waves-light btn-xs empty-btn table-button"
		                    onClick={this.handleDeleteClicked.bind(this, record)}>
		                    删除
	                    </button> : ""}
	                    {
		                    record.deviceType && (record.deviceType === deviceType.Gun || record.deviceType === deviceType.Ball || record.deviceType === deviceType.NVR) ? <button
			                    type="button"
			                    className="btn waves-effect waves-light btn-xs empty-btn table-button"
			                    onClick={this.linkToConsole.bind(this, record)} >
			                    控制台
		                    </button> : ""
	                    }
                    </div>
                );
            }
        );
        return body;
    }
    requestDeciveList() {
        let { siteListData, dispatch } = this.props
        dispatch(fetchJson(
            getSiteDeviceListUrl,
            {
                id: siteListData.selectedSite.id,
                currentPage: 0
            },
            "devicedata",
            generalFetchAction(DEVICE_DATA)
        ))
    }
    // 删除设备按钮
    handleDeleteClicked(record) {
        //将删除该设备需要的数据dispatch进selectedDevice
        let { dispatch, siteListData } = this.props
        this.setState({
            deleteDataRow: record
        });
        dispatch({
            type: SHOW_DELETE_DEVICE_MODAL,
            data: true
        })
    }
    //控制台跳转
	linkToConsole(record){
		let {dispatch} = this.props;
		if(record.stationNum){
			if(record.deviceType === deviceType.Gun){
				window.open(consoleUrl.replace(/\[port\]/g,record.stationNum * 40 + 3 + 20000));
			}else if(record.deviceType === deviceType.Ball){
				window.open(consoleUrl.replace(/\[port\]/g,record.stationNum * 40 + 2 + 20000));
			}else if(record.deviceType === deviceType.NVR){
				window.open(consoleUrl.replace(/\[port\]/g,record.stationNum * 40 + 1 + 20000));
			}
		}else{
			dispatch(toggleAlert('站号有误', 'warning'))
		}
	}
    // 详情按钮
    handleDetailClicked(record) {
        const { dispatch } = this.props;
        dispatch(toggleEdits(false))
        // this.setState({
        //     showEidt: false
        // })
        dispatch(doModleToggle({ toggle: false }));
	    location.href = `#/camera-detail/${record.id}/list/${record.deviceType}`;
    }
    // 编辑设备按钮
    handleEditClicked(record) {
        const { dispatch, siteListData } = this.props;
        let data = siteListData.selectedSite
        this.setState({
            editDataRow: {
                checkSiteRow: data,
                deviceDataRow: record
            }
        })
        dispatch(formChange('editSite', 'stationNum', record.stationNum))
        dispatch(formChange('editSite', 'name', record.name))
        dispatch(doEditDefaulValue(record.deviceType));
        dispatch(showModel(false))
        dispatch(toggleEdits(true))
    }
    // 生产设备列表
    bodySelect() {
        const { dispatch, siteListData } = this.props;
        let result = siteListData.deviceData.results
        if (result.length > 0) {
            return (<BSTable
                titles={deviceListTitle}
                body={this.genTBody(result)}
                className="table table-hover m-b-0"
            />)
        } else {
            return (<div className="no-data">暂无数据</div>)
        }
    }
    modalBody() {
        let { deleteDataRow} = this.state
        return (
            <div style={{ textAlign: 'center',fontSize:18,padding:20 }}>
                您确认删除该<span style={{ color: 'red' }}>{deleteDataRow.name}</span>设备么？
            </div>)
    }
    // 确认删除
    handleSure() {
        let { dispatch, siteListData } = this.props
        let obj = Object.assign({}, siteListData.selectedSite, { state: 'Deleted' })
        this.handleCancel()
        this.handleDeleteSite(dispatch)(obj)()
    }
    // 确认删除设备
    handleSureDeleteDevice() {
        let { dispatch, siteListData } = this.props
        this.handleCancel()
    }
    // 取消删除
    handleCancel() {
        let { dispatch } = this.props
        dispatch({
            type: SHOW_DELETE_DEVICE_MODAL,
            data: false
        })
    }
    modalFooter() {
        let { modelToggle, siteListData } = this.props
        let arr = []
        arr.push(<button
            key='3'
            style={{ marginRight: 15 + 'px' }}
            type="button"
            className="btn waves-effect waves-light btn-danger table-button"
            onClick={this.handleSureDeleteDevice.bind(this)}>
            确认
        </button>)
        arr.push(<button
            type="button"
            key='2'
            className="btn waves-effect waves-light btn-secondary table-button"
            onClick={this.handleCancel.bind(this)}>
            取消
            </button>)
        return arr
    }
    renderEditDevice() {
        let { dispatch,showCreateModel, showEditValue } = this.props;
        let { editDataRow} = this.state
        if (showEditValue && !showCreateModel) {
            return <EditDevice updateDeviceList={this.requestDeciveList.bind(this)} {...this.props} editDataRow={editDataRow} doReback={() => dispatch(toggleEdits(false))}/>
        } else {
            return ''
        }
    }
    render() {
        const { siteListData, showCreateModel } = this.props;
        let showForm = siteListData.showCreateDeviceForm,
            showDeleteDeviceModal = siteListData.showDeleteDeviceModal
        return (
            <div className="col-lg-12">
                {showCreateModel && <CreateSiteApp {...this.props} />}
                <div>
                    {this.renderEditDevice()}
                </div>
                <div className="card m-b-0">
                    {this.bodySelect()}
                </div>
                <GlModal
                    isOpen={showDeleteDeviceModal}
                    modalTitle={<div>删除设备 </div>}
                    modalBody={this.modalBody()}
                    modalFooter={this.modalFooter()}>
                </GlModal>
            </div>
        );
    }
}
