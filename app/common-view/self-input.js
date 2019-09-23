import React, { Component } from 'react';
export default class SelfInput extends Component {
	constructor() {
		super()
		this.state = {
			inputValue: ''
		}
	}
	componentWillMount() {
		let { defaultValue } = this.props
		defaultValue ? this.setState({ inputValue: defaultValue }) : ''
	}
	onChange(val) {
		this.setState({
			inputValue: val
		})
		this.props.onChange ? this.props.onChange(val) : ''
	}
	render() {
		const { type,title, placeHolder, disabled, formGroup} = this.props;
		const { inputValue} = this.state
		return (
			<div className={!formGroup?"form-group row":"row"}>
				{title ? <label
					htmlFor="inputEmail3"
					className="col-sm-3 text-right control-label col-form-label">
					{title}
				</label> : <div></div>
				}
				<div className={title ? "col-sm-9" : "col-sm-12"}>
					<input
						type={type ? type: 'text'}
						className="form-control input-common"
						placeholder={placeHolder ? placeHolder : '请输入关键字'}
						value={inputValue}
						disabled={(disabled && disabled === 'disabled') ? true : false}
						onChange={(event) => { this.onChange(event.target.value) }}
					/>
					{inputValue ? <span className="icon-close bs-input-cancel-icons" onClick={() => { this.onChange('')}}></span> : ''}
				</div>
			</div>
		)
	}
}