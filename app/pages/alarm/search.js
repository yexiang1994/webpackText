import React, { Component } from 'react'
import BsSelect from './../../common-view/bs-select'
import InFilter from './../../common-view/input-filter'
import {
    doStateId
} from './actions';
import { valueState } from './../../common-actions';
const warningLevel = [{name: '全部', value: '',}, {name: '低', value: 'Low',}, {name: '中', value: 'Normal',}, {name: '高', value: 'High',}, {name: '紧急', value: 'Emergent',}, {name: '关闭', value: 'Closed',}, {name: '通知', value: 'Notification',},{name:"过期", value:"Expired"}];
export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            params: {
                start: '',
                end: '',
	            warningLevel:''
            }
        }
    }
    // li点击事件
    async  onLiClcik(val) {
        let { dispatch, onLiClick } = this.props
        await dispatch(doStateId({ id: val.id }))
        // 选中默认值
        await dispatch(valueState(val))
        onLiClick()
    }
    // 取消事件
    async onCancel() {
        let { dispatch } = this.props
        await dispatch(doStateId({ id: '' }))
        await dispatch(valueState(''))
        // onLiClick()
    }
    onTimeChange(type, val) {
        let params = Object.assign({}, this.state.params)
        let time = val.target.value
        params[type] = time
        this.setState({
            params: params,
        })
    }
	async handleClear(){
        let {doSearch} = this.props;
		let params = {
			start: 0,
			end: 0
		};
		await this.setState({
			params
		});
		doSearch(params);
		this.refs.filter.props.onCancel();
	}
	async doSelectChange(val, type) {
		this.setState({
			params:Object.assign({},this.state.params,{[type]:val})
		});
	}
    render() {
        let { params } = this.state;
        let { selectList, onChange, defaultValue, doSearch } = this.props;
        let auto = {width:'auto'};
        
        return (
            <div className="site-search-box">
                <div className="site-input-box" style={{ width: 250 }}>
	                <div className="clear">
                    <span className="s-site">站点：</span>
                    <span className="s-lesect">
                        <span className="input-filter" style={{width:200}}>
                            <InFilter
                                optionsList={selectList.results}
                                onChange={(val) => { onChange(val) }}
                                doLiClick={this.onLiClcik.bind(this)}
                                onCancel={this.onCancel.bind(this)}
                                placeholder={'请输入关键字'}
                                defaultValue={defaultValue}
                                ref={"filter"}
                            >
                            </InFilter>
                        </span>
                    </span>
	                </div>
                </div>
	            <div className="left">
		            <div className="left search-name">
			            报警等级：
		            </div>
		            <div className="site-input-box" style={auto}>
			            <BsSelect
				            optionsList={warningLevel}
				            valueType='value'
				            selectType='name'
				            defaultValue={params.warningLevel}
				            onChange={(val) => this.doSelectChange(val, 'warningLevel')}>
			            </BsSelect>
		            </div>
	            </div>
                <div className="left">
                    <div className="left search-name">
                        起始时间：
                    </div>
                    <div className="site-input-box" style={auto}>
                        <input type="date" value={params.start} onChange={this.onTimeChange.bind(this, 'start')} className="form-control input-common"
                               placeholder="dd/mm/yyyy" />
                    </div>
                </div>
                <div className="left">
                    <div className="left search-name">
                        结束时间：
                    </div>
                    <div className="site-input-box" style={auto}>
                        <input type="date" value={params.end} onChange={this.onTimeChange.bind(this, 'end')} className="form-control input-common"
                               placeholder="dd/mm/yyyy" />
                    </div>
                </div>

	            <div className="site-input-box" style={{ width: 250 }}>
		            <div className="clear">
			            <span className="s-site">村名：</span>
			            <span className="s-lesect">
                        <span className="input-filter" style={{width:200}}>
                            <InFilter
	                            optionsList={[]}
	                            onChange={(val) => { onChange(val) }}
	                            doLiClick={this.onLiClcik.bind(this)}
	                            onCancel={this.onCancel.bind(this)}
	                            placeholder={'请输入关键字'}
	                            defaultValue={""}
	                            ref={"filter2"}
                            >
                            </InFilter>
                        </span>
                    </span>
		            </div>
	            </div>
	            <div className="site-input-box" style={{ width: 250 }}>
		            <div className="clear">
			            <span className="s-site">镇名：</span>
			            <span className="s-lesect">
                        <span className="input-filter" style={{width:200}}>
                            <InFilter
	                            optionsList={[]}
	                            onChange={(val) => { onChange(val) }}
	                            doLiClick={this.onLiClcik.bind(this)}
	                            onCancel={this.onCancel.bind(this)}
	                            placeholder={'请输入关键字'}
	                            defaultValue={""}
	                            ref={"filter3"}
                            >
                            </InFilter>
                        </span>
                    </span>
		            </div>
	            </div>

                <div className="left">
                    <button onClick={() => doSearch(params)} className="btn btn-gray waves-effect waves-light d-lg-block">搜索</button>
                </div>
	            <div className="left">
		            <button type="button" className="btn btn-info d-lg-block m-l-15" onClick={this.handleClear.bind(this)}>
			            清空
		            </button>
	            </div>
            </div>
        );
    }
}
