import React, { Component } from 'react'
import CommonUtils from '../../common-utils'
import {getDeviceCaptureImageListUrl, capturePrefix} from '../../common-values'
export default class ModalImg extends Component{
    constructor(){
        super()
        this.state={
            list: [],
            arr: []
        }
    }
    componentDidMount() {
        this.queryList()
        
    }
    domLine() {
        let arr =[]
        let x=750/20;
        let y=440/20;
        for(let i=0;i<y;i++) {
            let as = []
            for(let j=0; j<x;j++){
                let r = Math.round(Math.random())
                let div = <div style={{border: r ===1 ? '1px solid red' : '', position: 'absolute',
                    width: '20px',
                    height: '20px',
                    left: j*20 + 'px',
                    top: i*20 + 'px'
                }}></div>
                as.push(div)
            }
            arr.push(as)
        }
        return arr;
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
	render() {
        let {list} = this.state

        let path = list[0] ? capturePrefix+list[0].path : ''
	    return (
            <div style={{position:'relative'}}>
                <img style={{
                    width: '780px',
                    height: '450px'
                }} className=" radius" src={path} alt=""/>
                <div style={{position: 'absolute',left:0,top:0,width: 780,height: 440}}>
                    {this.domLine()}
                </div>
            </div>
	    )
	}
}