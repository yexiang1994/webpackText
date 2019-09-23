import React, { Component } from 'react'
import BSTable from '../../common-view/bs-table'
import { GeneralBSTBody } from './gen-bs-tbody'
import { push } from 'react-router-redux';
import {fetchJson, generalFetchAction} from "../../common-actions";
import {getRandmonSiteDataUrl, getSiteDeviceListUrl} from "../../common-values";
import {RECEIVE_RANDOM_SITE_DATA, RECEIVE_SITE_DEVICE_LIST, RECIEVE_RANDOM_SITE_SINGLE} from "./actions";
var dashboardSiteTitle = require("../../config/dashboard-site-title.json");

export default class TablePart extends Component {
    genTBody() {
        const { siteList,dispatch } = this.props;
        let body = [];
        if (siteList.results != null && siteList.results.length > 0) {
            body = GeneralBSTBody(
                [
                    record => record.id,
                    record => record.name,
                    record => record.electricityCosume > 0 ? record.electricityCosume.toFixed(2) : (0).toFixed(2),
                    record => record.accumulateVolume > 0 ? record.accumulateVolume.toFixed(2) : (0).toFixed(2)
                ],
                record => record.id,
                siteList.results,
                true,
                record=>{
	                return (
		                <button
			                type="button"
			                className="btn waves-effect waves-light btn-xs btn-info table-button"
			                onClick={this.handleDetailClicked(record)} >
			                详情
		                </button>);
                },
	            record => {
		            dispatch({
			            type: RECIEVE_RANDOM_SITE_SINGLE,
			            data: {result:record}
		            });
		            //抓图
		            dispatch(
			            fetchJson(
				            getSiteDeviceListUrl,
				            {id:record.id},
				            "GetSiteDevices",
				            generalFetchAction(RECEIVE_SITE_DEVICE_LIST)
			            )
		            );
		            //获取siteData用以绘制折线图
		            dispatch(
			            fetchJson(
				            getRandmonSiteDataUrl,
				            {id:record.id},
				            "GetRandomSiteData",
				            generalFetchAction(RECEIVE_RANDOM_SITE_DATA)
			            )
		            );
	            }
            );
        }
        return body;
    }
	handleDetailClicked(record){
    	let {dispatch} = this.props;
		return ()=>{
			dispatch(push(`/site-detail/${record.id}`));
		}
	}
    render() {
        return (
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex">
                            <div>
                                <h5 className="card-title">站点列表</h5>
                                <h6 className="card-subtitle">随机9个站点列表</h6>
                            </div>
                        </div>
                    </div>
                    <BSTable
                        titles={dashboardSiteTitle}
                        body={this.genTBody()}
                        className="table table-hover"
                    />
                </div>
            </div>
        );
    }
}