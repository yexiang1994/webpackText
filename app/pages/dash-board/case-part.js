import React, { Component } from 'react'
import BSTable from '../../common-view/bs-table'
import {GeneralBSTBody} from '../../common-view/gen-bs-tbody'

var dashboardCaseTitle = require("../../config/dashboard-case-title.json");

export default class CasePart extends Component{
    genTBody(){
        let data = [
            {
                id : 1,
                name : "站点断电",
                priority : "High"
            },
            {
                id : 2,
                name : "站点设备故障",
                priority : "Normal"
            },
            {
                id : 3,
                name : "人员培训",
                priority : "Low"
            },
            {
                id : 4,
                name : "付费",
                priority : "High"
            },
            {
                id : 5,
                name : "人事调动",
                priority : "Normal"
            },
            {
                id : 6,
                name : "站点报警",
                priority : "High"
            },
            {
                id : 7,
                name : "站点离线",
                priority : "High"
            },
            {
                id : 8,
                name : "结构调整",
                priority : "Low"
            },
            {
                id : 9,
                name : "常规巡检",
                priority : "Low"
            }
        ];
        let body = GeneralBSTBody(
            [
                record=>record.id,
                record=>record.name,
                record=>this.genPriorityBadge(record.priority),
            ],
            record=>record.id,
            data,
            false,
            null
        );
        return body;
    }
    genPriorityBadge(priority){
        if(priority == "High"){
            return <span className="badge badge-danger badge-pill">高</span>;
        }else if(priority == "Normal"){
            return <span className="badge badge-warning badge-pill">中</span>;
        }else{
            return <span className="badge badge-success badge-pill">低</span>;
        }
    }
    render(){
        return (
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex">
                            <div>
                                <h5 className="card-title">工单列表</h5>
                                <h6 className="card-subtitle">...</h6>
                            </div>
                        </div>
                    </div>
                    <BSTable
                        titles={dashboardCaseTitle}
                        body={this.genTBody()}
                        className="table table-hover"
                    />
                </div>
            </div>
        );
    }
}