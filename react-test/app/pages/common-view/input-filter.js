import React, { Component } from 'react';
export default class InFilter extends Component {
    doChangeClick(val) {
        let { onChange, optionsList } = this.props
        onChange(this.refs.input.value, optionsList)
    }
    doClick() {
        this.setState({
            show: 'block'
        })
    }
   
    // 所有li列表
    doOption(data) {
    	let {scope} = this.props;
        let arr = [];
	    if(scope && scope === "user"){
		    data.map((val) => {
		        arr.push(<li key={val.id ? val.id : val.userId} onClick={this.doLiClick.bind(this, val)}>{val.nickname}</li>)
		    });
	    }else{
		    data.map((val) => {
			    arr.push(<li key={val.id} onClick={this.doLiClick.bind(this, val)}>{val.name}</li>)
		    });
	    }

        return arr
    }
    // 点击li事件
    doLiClick(val) {
        let { onChange } = this.props
        this.props.doLiClick(val)
        this.setState({
            show: 'none',
            iconShow: true
        })
        this.refs.input.value = ''
        onChange('')
    }
    // 
    boxMouseover(e) {
        this.setState({
            iconShow: false
        })
    }
    boxMouseout() {
        this.setState({
            iconShow: true
        })
    }
    // 取消事件
    doBlur() {
        this.setState({
            focus: false
        })
        // 当input聚焦时取消关闭下拉列表
        setTimeout(() => {
            if (!this.state.focus) {
                this.setState({
                    show: 'none',
                    iconShow: true
                })
            }
        }, 100)
    }
    // 关闭事件
    closeClick() {
        this.setState({
            show: 'none',
            iconShow: false
        })
        this.props.onCancel()
    }
    doFocus() {
        this.setState({
            focus: true
        })
    }
    render() {
        let { optionsList, defaultValue, placeholder,scope,position } = this.props
        return (<div className={position ? "filte-box static-pos" : "filte-box"} tabIndex="0" onFocus={this.doFocus.bind(this)} onBlur={this.doBlur.bind(this)} onMouseOut={this.boxMouseout.bind(this)} onMouseOver={this.boxMouseover.bind(this)}>
            <span className="filter-updown fas fa-sort-down" style={{ display: this.state.iconShow ? 'block' : 'none' }}></span>
            <span className="filter-updown far fa-times-circle" onClick={this.closeClick.bind(this)} style={{ display: this.state.iconShow ? 'none' : 'block' }}></span>
            <div>
                <span className="fake-span" onClick={this.doClick.bind(this)}>
	                {
		                (scope && scope === "user") ? defaultValue.nickname ? defaultValue.nickname : "---请选择---" :
			                defaultValue.name ? defaultValue.name : "---请选择---"
	                }
                </span>
            </div>
            <div className="select-cont" style={{ display: this.state.show }}>
                <div>
                    <input type="text"
                        onChange={this.doChangeClick.bind(this)}
                        className="form-control filter-input"
                        ref='input'
                        placeholder={placeholder} />
                </div>
                <ul className="select-ul">
                    {this.doOption(optionsList)}
                </ul>
            </div>
        </div>)
    }
}
