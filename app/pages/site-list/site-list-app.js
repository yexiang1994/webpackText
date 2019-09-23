import React, { Component } from 'react'
import PageContainer from '../../pages/page-container/page-container'
import { connect } from 'react-redux'
import TablePart from './table-part'
import TablePartRange from './table-part-range'
import { fetchJson, generalFetchAction, doModleToggle, toggleAlert } from '../../common-actions'
import {getSiteListUrl, getChangeSiteStateUrl, getUserSessionUrl, assertGetTopVpr} from '../../common-values'
import {
    RECEIVE_SITE_LIST, SHOW_CREATE_DEVICE_FORM, showModel, CHOOSE_SITE, CHOOSE_DEVICE, RECEIVE_CONTROLLER_CONFIG,
    DEVICE_DATA, SHOW_DELETE_DEVICE_MODAL,
    toggleEdits,beforeLink
} from './actions';
import Pager from '../../common-view/pager';
import { push } from 'react-router-redux';
import GlModal from './../../common-view/modal';
import DeviceModel from './device';
import Cluster from "./EChartCluster"
import CommonUtils from './../../common-utils'
let userRoleJson = require("../../config/userRole");
// 提示框
import Alert from '../../common-view/alert';
import { timingSafeEqual } from 'crypto';
import './site-list.css';
import Search from './search'
import Loading from "../../common-view/loading";
class SiteListApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            params: {},
            userRole:"",
            dataList: []
        }
    }
    init() {
        let { dispatch} = this.props;
        dispatch({type: RECEIVE_SITE_LIST, data: {code: -1, results: [], pager: {}}})
        dispatch({type: CHOOSE_SITE, data: {}})
        dispatch({type: CHOOSE_DEVICE, data: {}})
        dispatch({type: RECEIVE_CONTROLLER_CONFIG, data: {code: -1}})
        dispatch({type: DEVICE_DATA, data: {code: -1, results: [], pager: {}}})
        dispatch({type: SHOW_DELETE_DEVICE_MODAL, data: false})
        dispatch({type: SHOW_CREATE_DEVICE_FORM, data: false})
    }
    async componentDidMount() {
	    let {dispatch,location,params} = this.props,_this = this;
	    $(".preloader").fadeOut();
	    $("html,body").animate({scrollTop:"0px"},100);
	    this.init();
        let {dashboardState} = params;
        var rebackParams, currentPage = 0;
        location.state ? {rebackParams,currentPage} = location.state : ""
		// {rebackParams, currentPage} = location.state;
        console.log(rebackParams, "返回的参数", currentPage);
        if(rebackParams) {
            await this.selectBtn(rebackParams);
        }
	    dispatch(
		    fetchJson(
			    getUserSessionUrl, {}, "GetUserSession",
			    (json) => (dispatch) => {
				    _this.setState({userRole: json.result.userRole});
			    }
		    )
        );
        // await this.setState({
        //     params: rebackParams
        // })
        setTimeout(()=>{
            this.handlePageChange(dispatch)('SiteList', currentPage)()
        }, 1000)
        this.queryList()
    }

    queryList() {
        CommonUtils.doJsonPost(assertGetTopVpr, {
            top:50,
	        orderBy:"volumePowerRatio",
	        orderDirection:"asc"
        }).then(data=>{
            if(data.code === 0) {
                let rs = data.results
                for (let i = 0; i < rs.length; i++) {
                    rs[i].i = i;
                }
                this.setState({
                    dataList: rs
                })
            }
		});
    }

    handlePageChange(dispatch) {
        let { params } = this.state;
        let {stateId} = this.props;
        return (scope, page) => () => {
            let paramsSubmit = Object.assign({}, params)
            paramsSubmit.keyword ? '' : delete paramsSubmit.keyword
            paramsSubmit.siteState ? '' : delete paramsSubmit.siteState
            paramsSubmit.state ? '' : delete paramsSubmit.state
	        paramsSubmit.warning ? '' : delete paramsSubmit.warning
            paramsSubmit.currentPage = page;
	        // console.log(stateId);
	        dispatch(beforeLink(paramsSubmit));
            dispatch(fetchJson(getSiteListUrl, paramsSubmit, "GetSiteList", generalFetchAction(RECEIVE_SITE_LIST, (res) => {
                this.setState({
                    loading: false
                })
                dispatch({
                    type: RECEIVE_SITE_LIST,
                    data: res
                });
            })));
        }
    }
    // 删除站点
    handleDeleteSite(dispatch) {
        const { params } = this.props;
        let _this = this
        return (state) => () => {
            dispatch(fetchJson(getChangeSiteStateUrl, state, "GetSiteList", generalFetchAction('', function (res) {
                if (res.code === 0) {
                    dispatch(toggleAlert('删除成功', 'success'))
                    _this.handlePageChange(dispatch)("SiteList", 0)();
                } else {
                    dispatch(toggleAlert(res.message, 'warning'))
                }
            })));
        }
    }
    modalTitle() {
        let { modelToggle, siteListData, dispatch } = this.props
        let datas = siteListData.selectedSite;
        switch (modelToggle.view) {
            case 'delete':
                return (<div>删除站点</div>);
            case 'device':
                return this.state.userRole === userRoleJson.admin ? (<div className='alert-model-box' style={{ padding: 5 }}>
                    <button style={{ margin: 0 }} type="button"
                        className="btn waves-effect waves-light full-btn table-button"
                        onClick={() => { dispatch(showModel(true)) }}>
                        创建设备
                    </button>
                </div>): (<div>
	                设备列表
                </div>);
            case 'delete-device':
                return (<div>删除设备</div>)
        }
    }
    modalBody() {
        let { modelToggle, siteListData } = this.props
        switch (modelToggle.view) {
            case 'delete':
                return (<div style={{ textAlign: 'center',fontSize:18,padding:20 }}>
                    您确认删除<span style={{ color: 'red' }}>{siteListData.selectedSite.name}</span>站点么？
                 </div>)
            case 'device':
                return (<div className='alert-model-box'>
                    <DeviceModel {...this.props} data={siteListData.siteList} userRole={this.state.userRole} />
                </div>)
            case 'delete-device':
                return (<div style={{ textAlign: 'center',fontSize:18,padding:20 }}>
                    您确认删除该<span style={{ color: 'red' }}>{siteListData.selectedDevice}</span>设备么？
                </div>)
        }
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
        dispatch(toggleEdits(false))
        dispatch(doModleToggle({ toggle: false }))
    }
    modalFooter() {
        let { modelToggle, siteListData } = this.props
        let arr = []
        switch (modelToggle.view) {
            case 'delete':
                arr.push(<button
                    key='1'
                    style={{ marginRight: 15 + 'px' }}
                    type="button"
                    className="btn waves-effect waves-light btn-danger table-button"
                    onClick={this.handleSure.bind(this)}>
                    确认
                </button>)
                break;
            case 'delete-device':
                arr.push(<button
                    key='3'
                    style={{ marginRight: 15 + 'px' }}
                    type="button"
                    className="btn waves-effect waves-light btn-danger table-button"
                    onClick={this.handleSureDeleteDevice.bind(this)}>
                    确认
                </button>)
                break;
            default:
        }
        arr.push(<button
            type="button"
            key='2'
            className="btn waves-effect waves-light btn-secondary table-button"
            onClick={this.handleCancel.bind(this)}>
            关闭
                    </button>)
        return arr
    }
    async selectBtn(val) {
        let { dispatch,location } = this.props
        let arr = Object.keys(val);
        let obj = {}
        arr.forEach(item=>{
            if(val[item]!="" && val[item]!=null) {
                obj[item] = val[item]
            }
        })
        await this.setState({
            params: obj
        });
        
        //判断是否从site-detail跳转过来
        if(location.state){
	        this.handlePageChange(dispatch)('SiteList', val.currentPage)()
        }else{
	        this.handlePageChange(dispatch)('SiteList', 0)()
        }
    }
    render() {
        const { dispatch, siteListData, mToggleData } = this.props;
        const { loading } = this.state;
        let siteList = siteListData.siteList;
        let arr = this.state.dataList.slice(0,20);
        console.log(siteListData);
        
        return (<PageContainer>
            <div className="alert-box"><Alert {...this.props}/></div>
            {/*<PageTitle title={"站点管理"} buttonTitle={"增加站点"} handleClick={() => {*/}
                {/*dispatch(push("create-site"))*/}
            {/*}} userRole={this.state.userRole} />*/}

            {/*上一部分 : 吨水电耗排序榜 / 用电量/水量散点图*/}
            <div className="row m-b-20">
	            <div className="col-md-6">
		            <div className="positres list-box">
			            {/*<Loading show={loading}/>*/}
			            <TablePartRange {...this.props} data={siteList} userRole={this.state.userRole} dataList={arr}/>
		            </div>
	            </div>
	            <div className="col-md-6">
		            <Cluster dataList={this.state.dataList}/>
	            </div>
            </div>

            <Search ref={'search'} parentParams={this.state.params} {...this.props} commitParams={this.selectBtn.bind(this)} />
            <div className="row">
                <div className="table-part-box positres">
	                <Loading show={loading}/>
                    <TablePart {...this.props} data={siteList} userRole={this.state.userRole} params={this.state.params}/>
                </div>
                <div className="footer-pager">
                    <Pager pager={siteList.pager} relatedAction={this.handlePageChange(dispatch)} />
                </div>
            </div>
            <GlModal
                isOpen={mToggleData.toggle}
                modalTitle={this.modalTitle()}
                modalBody={this.modalBody()}
                modalFooter={this.modalFooter()}>
            </GlModal>
        </PageContainer>);
    }
}

function select(state) {
    return state;
}

export default connect(select)(SiteListApp);
