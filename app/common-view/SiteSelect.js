import React from 'react'
import CommonUtils from '../common-utils'
import InFilter from "./input-filter";
import {getSiteListUrl} from "../common-values";
import {doStateId, SITELIST} from "./form-common/form-actions";
import {valueState} from "../common-actions";

export default class SiteSelect extends React.Component{
	async componentDidMount(){
		const {dispatch} = this.props;
		this.handleSite(dispatch,'');
	}
	// 请求站点列表
	handleSite(dispatch,keyword) {
		CommonUtils.doJsonPost(getSiteListUrl,{keyword,showInvisible:1}).then(data=>{
			dispatch({
				type:SITELIST, data
			})
		});
	}
	// li点击事件
	async  onLiClcik(val) {
		let { dispatch } = this.props;
		await dispatch(doStateId(val));
		await dispatch(valueState(val));
	}
	// 取消事件
	async onCancel() {
		let { dispatch } = this.props;
		await dispatch(doStateId({ id: '' }));
		await dispatch(valueState(''))
	}
	render(){
		let {title,refScope,defaultValue,selectList,dispatch} = this.props;
		return (
			<div className="left sm-grow" style={{width:"18%"}}>
				<div className="card m-b-0 width-100">
					<div className="form-group row m-b-0">
						<label className="col-sm-3 text-right control-label col-form-label">
							{title}
						</label>
						<div className="col-sm-9 padding-left-0">
	                        <span className="s-lesect" style={{width:'100%'}}>
	                            <span className="input-filter" style={{width:'100%'}}>
	                                <InFilter
		                                optionsList={selectList.results}
		                                onChange={(val) => this.handleSite(dispatch,val)}
		                                doLiClick={this.onLiClcik.bind(this)}
		                                onCancel={this.onCancel.bind(this)}
		                                placeholder={'请输入关键字'}
		                                defaultValue={defaultValue}
		                                ref={refScope}
	                                >
	                                </InFilter>
	                            </span>
                            </span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}