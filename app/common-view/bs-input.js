import React from 'react'
import {formChange} from '../common-actions'
import CommonUtils from '../common-utils'

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
		const { title, formData, scope, name, type, dispatch, placeHolder, isRequire, disabled,lastone} = this.props;

		let value = CommonUtils.resolveFormData(formData, scope, name, "");
		return (
			<div className="form-group row" style={lastone ? {marginBottom:0}:{}}>
				<label 
					htmlFor="inputEmail3" 
					className="col-sm-3 text-right control-label col-form-label">
					{title}
				</label>
				<div className="col-sm-9">
					<input 
						type={type} 
						className="form-control input-common"
						placeholder={placeHolder}
						value={value}
						disabled={(disabled && disabled === 'disabled') ? true : false }
						onChange={(event)=>dispatch(formChange(scope, name, event.target.value))}
						required={ isRequire ? 'required':'' }
						min={"number" === type && 0}
					/>
				</div>
			</div>
		)
	}
}