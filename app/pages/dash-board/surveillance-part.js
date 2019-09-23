import React, { Component } from 'react'
import {capturePrefix, unreachableImageUrl} from '../../common-values'

export default class SurveillancePart extends Component{
    componentDidMount(){
    }
    getDeviceByType(type){
        const {deviceList} = this.props;
        let returnValue = {};
        if(deviceList != null && deviceList.results != null){
            deviceList.results.forEach(record => {
                if(record.deviceType == type){
                    returnValue = record;
                }
            });
        }
        return returnValue;
    }
    genCamImage(cam){
        if(cam != null){
            if (cam.lastCapture != null) {
                return (<a href={capturePrefix + cam.lastCapture} data-lightbox="image-1" data-title="My caption">
                    <img src={capturePrefix + cam.lastCapture} className="surveillance-image" />
                </a>)
            } else {
                return(
                    <a href="./assets/images/no-picture.gif" data-lightbox="image-1" data-title="My caption">
                        <img src='./assets/images/no-picture.gif' className="surveillance-image" style={{width: '200px'}}/>
                    </a>
                );
            }
        }else{
            return <img src={unreachableImageUrl} className="surveillance-image"/>
        }
    }
    render(){
        let ballCam = this.getDeviceByType("BallCamera");
        let gunCam = this.getDeviceByType("GunCamera");
        return (
            <div className="row">
                <div className="col-lg-12" style={{marginBottom:15}}>
                    <div className="site-surveillance-div">
                        {this.genCamImage(gunCam)}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="site-surveillance-div">
                        {this.genCamImage(ballCam)}
                    </div>
                </div>
            </div>
        );
    }
}
