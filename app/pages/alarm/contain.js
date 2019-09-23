import React, { Component } from 'react';
import Pager from '../../common-view/pager';
import PageTitle from '../../common-view/page-title'
import {getGetWarningListUrl, getSiteListUrl, getChangeWarningStateUrl, getUserSessionUrl} from '../../common-values';
import { fetchJson, generalFetchAction, valueState, doModleToggle, toggleAlert } from './../../common-actions';
import {PAGELIST, setSelectList, SITELIST, CHOOSE_SITE, STATEID} from './actions';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Search from './search'
// 提示框
import List from './list'
import GlModal from './../../common-view/modal'
import Alert from '../../common-view/alert';
import CommonUtils from './../../common-utils'
import WarningModel from "./warningDetail";
import PageContainer from "../page-container/page-container";
import Loading from "../../common-view/loading";

class Contain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            params: {},
	        userRole:""
        }
    }
    componentDidMount() {
        this.doInit()
        $(".preloader").fadeOut();
        let {dispatch} = this.props,_this = this;
        this.handlePageChange(dispatch)(0, 0)();
        this.handleSite(dispatch)('')();
	    dispatch(
		    fetchJson(
			    getUserSessionUrl, {}, "GetUserSession",
			    (json) => (dispatch) => {
				    _this.setState({userRole: json.result.userRole});
			    }
		    )
	    )
    }
    // 初始化
    doInit() {
        let { dispatch } = this.props
        dispatch({
            type: SITELIST,
            data: { code: -1, results: [], pager: {} }
        })
        dispatch({
            type: STATEID,
            data: { id: '' }
        })
        dispatch({
            type: CHOOSE_SITE,
            data: {}
        })
    }
    // 请求列表
   handlePageChange(dispatch) {
        let { stateId } = this.props;
        let { params } = this.state;
        return (scop, page) => () => {
            let submitParams ={};
            stateId.id ? submitParams.siteId = stateId.id: '';
            params.start ? submitParams.start = CommonUtils.timesToString(params.start) : submitParams.start = 0;
            params.end ? submitParams.end = CommonUtils.timesToString(params.end) : submitParams.end = 0;
            submitParams.currentPage = page;
	        let warningLevel = this.refs.search.state.params.warningLevel;
	        warningLevel === "" ? "" : submitParams.warningLevel = warningLevel;
	        dispatch(fetchJson(getGetWarningListUrl, submitParams, "FetchControllerConfig", generalFetchAction(PAGELIST,(res)=>{
	             if(res.code === 0){
	             	this.setState({loading:false});
	             	dispatch({type:PAGELIST,data:res});
	             }else dispatch(toggleAlert('获取列表失败', 'warning'));
            })));
        }
    }
    componentWillUnmount(){
	    this.props.dispatch({type:PAGELIST,data:{ code:-1, results:[], pager:{}}});
    }
    // 请求站点
    handleSite(dispatch) {
        let _this = this
        return (keyword) => () => {
            dispatch(fetchJson(getSiteListUrl, {
                keyword: keyword
            }, "FetchControllerConfig", generalFetchAction(SITELIST, this.setDefaultValue.bind(_this))))
        }
    }
    // 设置默认值
    setDefaultValue(rs) {
        let { dispatch } = this.props
        dispatch(setSelectList({
            results: rs.results
        }))
    }
    // 删除
    handleDeleteSite(dispatch) {
        let _this = this
        return (params) => () => {
            dispatch(fetchJson(getChangeWarningStateUrl, params, "FetchControllerConfig", function (res) {
                if (res.code == 0) {
                    dispatch(toggleAlert('删除成功', 'success'))
                    _this.handlePageChange(dispatch)("SiteL", 0)();
                } else {
                    dispatch(toggleAlert(res.message, 'error'))
                }
                return {
                    type: 'delete'
                }
            }));
        }
    }
    modalTitle() {
	    let { modelToggle } = this.props;
	    switch (modelToggle.view) {
		    case 'close':
			    return (<div>确认</div>);
		    case 'warning':
			    return (<div>入侵报警详情</div>);
	    }

    }
    modalBody() {
        let { siteState,modelToggle } = this.props;

	    switch (modelToggle.view) {
		    case 'close':
			    return (<div className="model-text">
				    您确认关闭<span style={{ color: 'red' }}>{siteState.siteName}</span>警告么？
			    </div>);
		    case 'warning':
			    return (<div className='alert-model-box'>
				    <WarningModel {...this.props} />
			    </div>);
	    }

    }
    // 确认删除
    handleSure() {
        let { dispatch, siteState } = this.props
        let obj = {
            id: siteState.id,
            warningLevel: 'Closed'
        }
        this.handleCancel()
        this.handleDeleteSite(dispatch)(obj)()
    }
    // 取消删除
    handleCancel() {
        let { dispatch } = this.props
        dispatch(doModleToggle({ toggle: false }))
    }
    modalFooter() {
	    let { modelToggle } = this.props;
	    switch (modelToggle.view) {
		    case 'close':
			    return (<div>
				    <button
					    style={{ marginRight: 15 + 'px' }}
					    type="button"
					    className="btn waves-effect waves-light btn-danger table-success"
					    onClick={this.handleSure.bind(this)}>
					    确认
				    </button>
				    <button
					    type="button"
					    className="btn waves-effect waves-light btn-secondary"
					    onClick={this.handleCancel.bind(this)}>
					    取消
				    </button>
			    </div>);
		    case 'warning':
			    return (<div>
				    <button className='btn btn-primary' key="1"
				            onClick={this.handleCancel.bind(this)}>
					    关闭 </button></div>);
	    }
    }
    async doSearch(val) {
        let {dispatch} = this.props;
	    await this.setState({
            params: val
        });
        this.handlePageChange(dispatch)("SiteL", 0)()
    }
    doRefresh() {
        let {dispatch} = this.props
        this.handlePageChange(dispatch)("SiteL", 0)()
    }
    render() {
        let {dispatch, alarmList, mToggleData} = this.props;
        return (
        	<PageContainer>
		        <div className="alert-box"><Alert {...this.props} /></div>
	            <Search ref={'search'}
	                {...this.props}
	                onLiClick={() => { this.handlePageChange(dispatch)('', 0)() }}
	                onChange={(val) => this.handleSite(dispatch)(val)()}
	                doSearch={this.doSearch.bind(this)}>
	            </Search>
	            {/* 列表 */}
		        <div className="row">
			        <div className="table-part-box positres">
				        <Loading show={this.state.loading}/>
				        <List {...this.props} userRole={this.state.userRole} doRefresh={this.doRefresh.bind(this)}/>
			        </div>
			        <div className="footer-pager">
				        <Pager pager={alarmList.pager} relatedAction={this.handlePageChange(dispatch)} />
			        </div>
		        </div>
		        {mToggleData.toggle ? <GlModal
			        isOpen={true}
			        modalTitle={this.modalTitle()}
			        modalBody={this.modalBody()}
			        modalFooter={this.modalFooter()}>
		        </GlModal>: <div/>}
	        </PageContainer>)
    }
}
function select(state) {
    return state
}

Contain = connect(select)(Contain)
export default Contain
