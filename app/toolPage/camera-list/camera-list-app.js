import React, { Component } from 'react'
// import PageContainer from '../../pages/page-container/page-container'
import { connect } from 'react-redux'
import PageTitle from '../../common-view/page-title'
import CameraTablePart from './camera-table-part'
import { fetchJson, generalFetchAction } from '../../common-actions'
import { listDeviceUrl } from '../../common-values'
import { RECEIVE_CAMERA_LIST } from './actions'
import Pager from '../../common-view/pager'
import Alert from '../../common-view/alert'
import Search from './search'
class CameraListApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            params: {}
        }
    }
    componentDidMount() {
        this.init()
        const { dispatch } = this.props;
        $(".preloader").fadeOut();
        this.handlePageChange(dispatch)("SiteList", 0)();
    }
    init() {
        let { dispatch } = this.props
        dispatch({
            type: RECEIVE_CAMERA_LIST,
            data: {
                code: -1,
                pager: {},
                results: []
            }
        })
    }
    handlePageChange(dispatch) {
        let {params} = this.state
        return (scope, page) => () => {
            let commitParams = Object.assign({}, params)
            commitParams.currentPage = page
            commitParams.keywords ? '': delete commitParams.keywords;
            commitParams.state ? '' : delete commitParams.state;
            commitParams.type ? "" : commitParams.type = "AllCamera";
            dispatch(fetchJson(listDeviceUrl, commitParams, "GetCameraList", generalFetchAction(RECEIVE_CAMERA_LIST, (res)=> {
                this.setState({
                    loading: false
                })
                dispatch({
                    type: RECEIVE_CAMERA_LIST,
                    data: res
                })
            })));
        }
    }
    async onChange(val) {
        let { dispatch} = this.props
        await this.setState({
            params: val
        })
        this.handlePageChange(dispatch)('site', 0)()
    }
    render() {
        const { dispatch, cameraListData } = this.props;
        const {loading} = this.state
        return (
            <div>
                <div className="alert-box">
                    <Alert {...this.props}></Alert>
                </div>
                <PageTitle title={"监控列表"} />
                <Search {...this.props} commitParams={this.onChange.bind(this)}></Search>
                <div className="row">
                    <CameraTablePart
                        loading={loading}
                        dispatch={dispatch}
                        cameraList={cameraListData.cameraList}
                    />
                </div>
                <div className="footer-pager">
                    <Pager pager={cameraListData.cameraList.pager} relatedAction={this.handlePageChange(dispatch)} />
                </div>
            </div> 
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(CameraListApp);
