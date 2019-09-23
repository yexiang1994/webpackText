import React, {Component} from 'react'

export default class ControlBoardModal extends Component{
    stateConvert(stateValue){
        if(stateValue == 0){
            return <label style={{color : "red"}}>关闭</label>;
        }else{
            return <label style={{color : "green"}}>开启</label>;
        }
    }
    generateRelayTable(){
        const {controllerConfig} = this.props;
        if(controllerConfig.result != null){
            return (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                                <th>10</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.stateConvert(controllerConfig.result.relayStates[0])}</td>
                                <td>{this.stateConvert(controllerConfig.result.relayStates[1])}</td>
                                <td>{this.stateConvert(controllerConfig.result.relayStates[2])}</td>
                                <td>{this.stateConvert(controllerConfig.result.relayStates[3])}</td>
                                <td>{this.stateConvert(controllerConfig.result.relayStates[4])}</td>
                                <td>{this.stateConvert(controllerConfig.result.relayStates[5])}</td>
                                <td>{this.stateConvert(controllerConfig.result.relayStates[6])}</td>
                                <td>{this.stateConvert(controllerConfig.result.relayStates[7])}</td>
                                <td>{this.stateConvert(controllerConfig.result.relayStates[8])}</td>
                                <td>{this.stateConvert(controllerConfig.result.relayStates[9])}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }else{
            return <div></div>
        }
    }
    genSerialConfig(){
        const {controllerConfig} = this.props;
        if(controllerConfig.result != null){
            let config = controllerConfig.result;
            return (
                <div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>编号</th>
                                    <th>波特率</th>
                                    <th>数据位</th>
                                    <th>停止位</th>
                                    <th>校验位</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{config.serial1.baude}</td>
                                    <td>{config.serial1.bits}</td>
                                    <td>{config.serial1.stop}</td>
                                    <td>{config.serial1.parity}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>{config.serial2.baude}</td>
                                    <td>{config.serial2.bits}</td>
                                    <td>{config.serial2.stop}</td>
                                    <td>{config.serial2.parity}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>编号</th>
                                    <th>IP</th>
                                    <th>端口号</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{config.serialT1.ip}</td>
                                    <td>{config.serialT1.port}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>{config.serialT2.ip}</td>
                                    <td>{config.serialT2.port}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }else{
            return <div></div>
        }
    }
    render(){
        const {siteData} = this.props;
        return (
            <div className="remodal" data-remodal-id="modal" data-remodal-options="hashTracking: false">
                <button data-remodal-action="close" className="remodal-close"></button>
                <h1>{siteData.name}</h1>
                <div className="row">
                    <div className="col-md-12">
                        <label>通讯口状态 :</label>
                        {this.genSerialConfig()}
                    </div>
                    <div className="col-md-12">
                        <label>继电器状态表 : </label>
                        {this.generateRelayTable()}
                    </div>
                </div>
                <br/>
                <button data-remodal-action="confirm" className="remodal-confirm">关闭</button>
            </div>
        );
    }
}