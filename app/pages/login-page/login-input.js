import React from 'react'
import {formChange} from '../../common-actions'
import CommonUtils from '../../common-utils'

export default class LoginInput extends React.Component{
	componentWillMount(){
		let value = "";
		const { dispatch, scope, name, initValue } = this.props;
		if(initValue != null){
			value = initValue;
		}
		dispatch(formChange(scope, name, value));
	}
	render(){
        const {title, formData, scope, name, type, dispatch} = this.props;
        let value = CommonUtils.resolveFormData(formData, scope, name, "");
		return (
            <div className="form-group ">
                <div className="col-xs-12">
                    <input 
                        className="form-control"
                        type={type} 
                        placeholder={title}
                        value={value}
                        onChange={(event)=>dispatch(formChange(this.props.scope, this.props.name, event.target.value))}
                        /> 
                </div>
            </div>
		)
	}
}