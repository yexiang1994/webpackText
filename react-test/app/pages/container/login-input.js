import React from 'react'


export default class LoginInput extends React.Component{
	
	render(){
        const {title, type} = this.props;
		return (
            <div className="form-group ">
                <div className="col-xs-12">
                    <input 
                        className="form-control"
                        type={type} 
                        placeholder={title}
                        value={value}
                        onChange={(event)=>{}}
                        /> 
                </div>
            </div>
		)
	}
}