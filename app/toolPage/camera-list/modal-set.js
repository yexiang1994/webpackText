import React, { Component } from 'react'
import CommonUtils from './../../common-utils'
import {getDeviceCaptureImageListUrl, capturePrefix} from './../../common-values'
export default class ModalSet extends Component{
    constructor(){
        super()
        this.state={
            list: [],
            value: ''
        }
    }
    componentDidMount() {
        let { selectData } = this.props
        this.setState({
            value: selectData.port
        })
        this.queryList()
    }
    queryList() {
        let params = {
            currentPage: 0,
            customizedPageSize: 1,
            deviceId: "12"
        }
        CommonUtils.doJsonPost(getDeviceCaptureImageListUrl,params).then((res)=>{
            if(res.code === 0) {
                this.setState({
                    list: res.results
                })
            }
		});
    }
    change(e) {
        let data = e.target.value
        this.setState({
            value: data
        })
    }
	render() {
        let {list} = this.state
        let path = list[0] ? capturePrefix+list[0].path : ''
	    return (
            <div style={{
                padding: '10px',
                width: '40%'
            }}>
                <input className="form-control" type="number" value={this.state.value} onChange={this.change.bind(this)}/>
            </div>
	    )
	}
}