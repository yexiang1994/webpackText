import React, { Component } from 'react'
import PageContainer from '../../pages/page-container/page-container'
import { connect } from 'react-redux'
import PageTitle from '../../common-view/page-title'
import CardGroup from './card-group'
import LineChartPart from './line-chart-part'
import TablePart from './table-part'
import PieChartGroup from './pie-chart-group'
// import CasePart from './case-part' // 工单列表
import {
	getDashboardStatisticUrl,
	getRandmonSiteDataUrl,
	getRandomSiteListUrl,
	getRandomSiteUrl,
	getSiteDeviceListUrl, getUserSessionUrl
} from '../../common-values'
import {
    STATIC_STATE_DATA,
    RECEIVE_RANDOM_SITE_DATA,
    RECIEVE_RANDOM_SITE_LIST,
    RECIEVE_RANDOM_SITE_SINGLE,
    RECEIVE_SITE_DEVICE_LIST
} from './actions'
import CommonUtils from './../../common-utils'
import { fetchJson, generalFetchAction } from '../../common-actions'
import Alert from '../../common-view/alert'

class DashboardApp extends Component {
    constructor(props) {
        super(props);
        this.state = { timer: null, loading: true }
    }
    componentDidMount() {
        this.doInit();
        const { dispatch } = this.props;
        let timer = null, _this = this;
        // $(".preloader").show();
        //首次获取数据
	    CommonUtils.doJsonPost(getUserSessionUrl,{}).then(data=>{
		    if(data.code === 0){
			    this.getAllData(dispatch);
			    //每隔10分钟重新获取
			    timer = setInterval(function () {
				    _this.getAllData(dispatch);
			    }, 1000 * 60 * 10);
			    this.setState({ timer })
		    }
	    });
    }
    doInit() {
        let { dispatch } = this.props
        dispatch({
            type: STATIC_STATE_DATA,
            data: {
                code: -1,
                result: {}
            }
        })
        dispatch({
            type: RECEIVE_RANDOM_SITE_DATA,
            data: {
                code: -1,
                results: []
            }
        })
        dispatch({
            type: RECIEVE_RANDOM_SITE_LIST,
            data: {
                code: -1,
                results: []
            }
        })
        dispatch({
            type: RECIEVE_RANDOM_SITE_SINGLE,
            data: {
                code: 0,
                message: "",
                result: {}
            }
        })
        dispatch({
            type: RECEIVE_SITE_DEVICE_LIST,
            data: {
                code: -1,
                results: []
            }
        })
    }
    getAllData(dispatch) {
        dispatch(
            fetchJson(
                getRandomSiteListUrl,
                {},
                "GetRandomSiteList",
                generalFetchAction(RECIEVE_RANDOM_SITE_LIST)
            )
        );

        CommonUtils.doJsonPost(getRandomSiteUrl, {}).then(res => {
            dispatch({
                type: RECIEVE_RANDOM_SITE_SINGLE,
                data: res
            });
            if (res.result != null) {
                return res.result.id
            } else {
                return -1
            }
        }).then(function (id) {
            //获取siteData用以绘制折线图
            dispatch(
                fetchJson(
                    getRandmonSiteDataUrl,
                    {
                        id
                    },
                    "GetRandomSiteData",
                    generalFetchAction(RECEIVE_RANDOM_SITE_DATA)
                )
            );
            //获取抓图
            dispatch(
                fetchJson(
                    getSiteDeviceListUrl,
                    {
                        id
                    },
                    "GetSiteDevices",
                    generalFetchAction(RECEIVE_SITE_DEVICE_LIST)
                )
            );
        });
        dispatch(
            fetchJson(
                getDashboardStatisticUrl,
                {},
                "GetStatistics",
                generalFetchAction(STATIC_STATE_DATA, (res) => {
                    this.setState({
                        loading: false
                    })
                    dispatch({
                        type: STATIC_STATE_DATA,
                        data: res
                    })
                })
            )
        );
    }
    componentWillUnmount() {
        clearInterval(this.state.timer)
    }
    render() {
        const { dashboardData, dispatch, staticPieData } = this.props;
        let { loading } = this.state;
        return (
            <PageContainer>
                <div className="alert-box">
                    <Alert {...this.props}></Alert>
                </div>
                <PageTitle title={"系统总览"} />
                <CardGroup dispatch={dispatch} statistics={staticPieData} />
                <PieChartGroup dispatch={dispatch} statistics={staticPieData} loading={loading} />
                <div className="row">
                    <LineChartPart
                        dispatch={dispatch}
                        singleSite={dashboardData.randomSiteSingle}
                        siteData={dashboardData.randomSiteData}
                        deviceList={dashboardData.deviceList}
                    />
                    <TablePart siteList={dashboardData.randomSiteList} dispatch={dispatch}/>
                </div>
            </PageContainer>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(DashboardApp);
