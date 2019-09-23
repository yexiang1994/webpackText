import React, { Component } from 'react'
import BSTable from '../../common-view/bs-table'
import {GeneralBSTBody} from '../../common-view/gen-bs-tbody'
import { push } from 'react-router-redux';
import Loading from './../../common-view/loading'

var cameraListTitle = require("../../config/camera-list-title.json");

export default class CameraTablePart extends Component{
    genTBody(){
        const {cameraList} = this.props;
        let body = GeneralBSTBody(
            [
                record=>record.id,
                record=>record.name,
                record=>record.displayType,
                record=>{
                    if(record.online){
                        return (
                            <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs btn-info state-button">
                                在线
                            </button>
                        );
                    }else{
                        return (
                            <button type="button" className="btn waves-effect waves-light btn-rounded btn-xs btn-secondary state-button">
                                离线
                            </button>
                        );
                    }
                }
            ],
            record=>record.id,
            cameraList.results,
            true,
            record=>{
                return (
                    <button 
                        type="button" 
                        className="btn waves-effect waves-light btn-xs btn-info"
                        onClick={this.handleDetailClicked(record)}>
                        查看详情
                    </button>
                );
            }
        );
        return body;
    }
    handleDetailClicked(record){
        const {dispatch} = this.props;
        return ()=>{
            dispatch(push(
               `/camera-detail/${record.id}/null`
            ));
        }
    }
    render(){
        let { loading } = this.props
        return (
            <div className="col-lg-12">
                <div className="table-part-box">
                    <div className="card ">
                        <Loading show={loading}></Loading>
                        <BSTable
                            titles={cameraListTitle}
                            body={this.genTBody()}
                            className="table table-hover"
                        />
                    </div>
                </div>
            </div>
        );
    }
}