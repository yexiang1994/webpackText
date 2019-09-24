import React, { Component } from 'react';
export default class Loading extends Component {
    doLoading() {
        let { show,text,customColor,maxHeight } = this.props;
        let style = {};
        if(customColor) style.backgroundColor=customColor.bgColor;
        if(maxHeight) style.maxHeight=maxHeight;
        if (show) {
            return (<div className="showLoading" style={style}>
                <div className="loader">
                    <div className={customColor?"loader__figure border-red-color":"loader__figure"}>

                    </div>
                    <p className={customColor ? `loader__label ${customColor.color}` : "loader__label"}>{text ? text : "加载中..."}</p>
                </div>
            </div>)
        }
    }
    render() {
        return (
            <div>
                {this.doLoading()}
            </div>
        );
    }
}