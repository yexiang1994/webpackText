import React, {Component} from 'react';
export default class BsSelect extends Component {
    doOptiosList(optionsList) {
        let {valueType, selectType} = this.props
        let arr = []
        if (!optionsList) {
            return arr
        }
        optionsList.map((val, index) => {
            arr.push(<option key={index} value={val[valueType]}>{val[selectType]}</option>)
        })
        return arr
    }
    doChangeClick(val) {
        let {onChange, optionsList} = this.props
        onChange(val.target.value, optionsList)
    }
    render() {
        let {optionsList, valueType, selectType, defaultValue} = this.props
        return (<select className="custom-select" value={defaultValue?defaultValue:''} onChange={this.doChangeClick.bind(this)}>
            {this.doOptiosList(optionsList)}
        </select>)
    }
}
