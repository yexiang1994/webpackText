import React, { Component } from 'react'
import PageContainer from '../page-container/page-container'
import PageTitle from '../../common-view/page-title'
import { connect } from 'react-redux'
import BSInput from '../../common-view/bs-input'
import { fetchJson, toggleAlert, formChange, generalFetchAction } from "../../common-actions";
import { getCreateDeviceUrl,getSiteDeviceListUrl } from '../../common-values'
import { push } from 'react-router-redux'
import { doDefaulValue, DEVICE_DATA, showModel} from './actions'
import BsSelect from '../../common-view/bs-select'

export default class CreateSiteApp extends Component {
    componentDidMount() {
        const { dispatch,siteListData } = this.props;
        $(".preloader").fadeOut();
        dispatch(formChange('createSite', 'stationNum', siteListData.selectedSite.stationNumber))
    }
    handleSubmit() {
        const { dispatch, formData, defaultValue } = this.props,_this=this;
        return () => {
            let submitData = {};
            submitData.stationNum = Number(formData.createSite.stationNum)
            submitData.deviceType = defaultValue
            submitData.name = formData.createSite.name
            dispatch(
                fetchJson(
                    getCreateDeviceUrl,
                    submitData,
                    "createSite",
                    function(res) {
                        if (res.code === 0) {
                            dispatch(toggleAlert('创建成功', 'success'))
                            dispatch(showModel(false))
                            setTimeout(() => {
                                _this.requestDeciveList()
                            }, 0)
                        } else {
                            return dispatch(toggleAlert(res.message, 'warning'))
                        }
                        return {type: 'device'}
                    }
                )
            )
        }
    }
    doSelectChange(val) {
        let {dispatch} = this.props
        dispatch(doDefaulValue(val))
    }
    requestDeciveList() {
        let { siteListData,dispatch } = this.props
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
    render() {
        let deviceType = [{name: 'BallCamera', value: '球机'}, {name: 'GunCamera', value: '枪机'}, {name: 'PLC', value: 'PLC'}, {name: 'Controller', value: '核心控制器'}];
        const { dispatch, formData, defaultValue, } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-offset-3 col-md-6">
                        <div className="card card-body">
                            <h3 className="common-title fs-20 m-b-10">创建新设备</h3>
                            <form className="form-horizontal">
                                <BSInput
                                    title={"设备名称"}
                                    scope="createSite"
                                    name="name"
                                    placeholder=""
                                    dispatch={dispatch}
                                    formData={formData}
                                    type="text"
                                />
                                <div className='row'>
                                    <div className="col-xl-3" style={{textAlign:'right',lineHeight:'35px',color:'#000'}}>设备</div>
                                    <div className="col-xl-9">
                                        <BsSelect optionsList={deviceType}
                                            valueType='name'
                                            selectType='value'
                                            defaultValue={defaultValue}
                                            onChange={this.doSelectChange.bind(this)}>
                                        </BsSelect>
                                    </div>
                                </div>
                                <div className="form-group m-b-0">
                                    <div className="offset-sm-3 col-sm-9">
                                        <button
                                            type="button"
                                            className="btn full-btn waves-effect waves-light m-t-10"
                                            onClick={this.handleSubmit()}>
                                            创建
                                        </button>
	                                    <button type="button" className="btn empty-btn waves-effect waves-light m-t-10 m-l-10"
		                                        onClick={() => { dispatch(showModel(false)) }}>取消
	                                    </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


