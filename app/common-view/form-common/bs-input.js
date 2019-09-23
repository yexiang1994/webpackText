import React from 'react'
import {formChange} from '../../common-actions'
import CommonUtils from '../../common-utils'

export default class BSInput extends React.Component{
	componentWillMount(){
		let value = "";
		const { dispatch, scope, name, initValue } = this.props;
		if(initValue != null){
			value = initValue;
		}
		dispatch(formChange(scope, name, value));
	}
	render(){
		const { title, radioState,formData, scope, name, dispatch,
			isRequire, disabled,parent,width,scopeState} = this.props;
		let value = CommonUtils.resolveFormData(formData, scope, name, "");
		let field = "";
		if(formData[scopeState] != null){
			field = formData[scopeState][`${name}`];
		}
		return (
			<div style={{width:width ? width : "33%"}}>
				<div className="form-group">
					<div style={{marginTop:10}}>
						<label className="col-sm-12 control-label col-form-label">
							{title}
						</label>
						<div className="col-sm-12" style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
							{
								radioState.map((item,idx)=>{
									if(Object.prototype.toString.call(item) === "[object String]")
										return (
											<div key={idx} className="custom-control custom-radio" style={{width:"50%"}}>
												<input id={name+item} type="radio" data-state={item} name={name}
												       className="custom-control-input"
												       checked={(field && field === item)?true:""}
												       onChange={e=>{parent.handleRadioChange(e,scopeState,name)}}
												/>
												<label htmlFor={name+item} className="custom-control-label">{item}</label>
											</div>
										);
								})
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}