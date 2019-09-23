import React, { Component } from 'react'
import Utils from './../../common-utils'
import SelfInput from './../../common-view/self-input'
import BsSelect from './../../common-view/bs-select'
const pickType = [{
    name: '全部',
    value: 'AllCamera',
}, {
    name: '室外监控',
    value: 'GunCamera',
},{
    name: '室内监控',
    value: 'BallCamera',
}]
// [{
//     name: '全部',
//     value: 'AllCamera',
// }, {
//     name: '枪机',
//     value: 'GunCamera
// ',
// }, {
//     name: '核心控制器',
//     value: 'Controller',
// }, {
//     name: '球机',
//     value: 'BallCamera',
// }, {
//         name: 'PLC',
//         value: 'PLC',
//     }]
const pickState = [{
    name: '全部状态',
    value: '',
}, {
    name: '正常',
    value: 'Normal',
}, {
    name: '离线',
    value: 'Deleted',
}]
export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            params: {
                keyword: '',
                type: '',
                states: ''
            }
        }
    }
    onChange(val) {
        var fn = Utils.debounce(() => this.commits(val), 500)
        fn()
    }
    async commits(val) {
        let { commitParams } = this.props
        let params = Object.assign({}, this.state.params)
        params.keyword = val
        await this.setState({
            params: params
        })
        commitParams(this.state.params)
    }
    async doPickerChange(val, type) {
        let { commitParams } = this.props
        let params = Object.assign({}, this.state.params)
        params[type] = val
        await this.setState({
            params: params
        })
        commitParams(this.state.params)
    }
	async handleClear(){
		let { commitParams } = this.props;
		let params = {
			keywords: '',
			type: '',
			state: ''
		};
		await this.setState({
			params
		});
		commitParams(this.state.params);
		this.refs.keyword.setState({inputValue:""});
	}
    render() {
        let { params } = this.state
        return (
            <div className="site-search-box">
                <div className="left">
                    <div className="left search-name">
                        关键词：
                    </div>
                    <div className="site-input-box">
                        <SelfInput
                            placeholder="请输入关键字"
                            onChange={this.onChange.bind(this)}
                            type="text"
                            ref={'keyword'}
                        />
                    </div>
                </div>
                <div className="left">
                    <div className="left search-name">
                        摄像头类型：
                    </div>
                    <div className="site-input-box">
                        <BsSelect
                            optionsList={pickType}
                            valueType='value'
                            selectType='name'
                            defaultValue={params.type}
                            onChange={(val) => this.doPickerChange(val, 'type')}>
                        </BsSelect>
                    </div>
                </div>
                <div className="left">
                    <div className="left search-name">
                        摄像头状态：
                    </div>
                    <div className="site-input-box">
                        <BsSelect
                            optionsList={pickState}
                            valueType='value'
                            selectType='name'
                            defaultValue={params.states}
                            onChange={(val) => this.doPickerChange(val, 'states')}>
                        </BsSelect>
                    </div>
                </div>
	            <div className="left">
		            <button type="button" className="btn btn-info d-none d-lg-block m-l-15" onClick={this.handleClear.bind(this)}>
			            清空
		            </button>
	            </div>
            </div>
        );
    }
}
