import React, { Component } from 'react'
import BSTable from '../../common-view/bs-table'
import { GeneralBSTBody } from '../../common-view/gen-bs-tbody'
import { push } from 'react-router-redux'
import { chooseSite, RECEIVE_CONTROLLER_CONFIG, doToggle, DEVICE_DATA, showModel} from './actions'
import { getDeviceConfigUrl, getSiteDeviceListUrl,screenshotUrl } from '../../common-values'
import {fetchJson, generalFetchAction, doModleToggle, toggleAlert} from '../../common-actions';
import Loading from './../../common-view/loading';
import {hashHistory} from 'react-router';
var siteListTitle = require("../../config/site-list-range-title");
let userRoleJson = require("../../config/userRole");
export default class TablePart extends Component {
    genTBody() {
        const { data,dataList } = this.props;
        let body = GeneralBSTBody(
            [
                record => record.i+1,
                record => record.name,
                record => record.volumePowerRatio.toFixed(2),
                //     if (record.siteState === "Online") {
                //         return (
                //             <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs btn-info state-button">在线</button>
                //         );
                //     } else {
                //         return (
                //             <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs btn-secondary state-button">离线</button>
                //         );
                //     }
                // }
            ],
            record => record.id,
            dataList,
            false,
            record => {}
        );
        return body;
    }
    handleDetailClicked(record) {
        const { beforeLink } = this.props;
        let stateParams = {};
        beforeLink.keyword ? stateParams.keyword = beforeLink.keyword : "";
        beforeLink.siteState ? stateParams.siteState = beforeLink.siteState : "";
        beforeLink.state ? stateParams.state = beforeLink.state : "";
        beforeLink.warning ? stateParams.warning = beforeLink.warning : "";
        beforeLink.currentPage ? stateParams.currentPage = beforeLink.currentPage : stateParams.currentPage = 0;
        return () => {
	        hashHistory.push({
                pathname:`/site-detail/${record.id}`,
		        state:stateParams
            });
        }
    }
    render() {
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
