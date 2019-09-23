import React, { Component } from 'react'
import { push } from 'react-router-redux';

export default class CardGroup extends Component{
    genCardsArray(){
        let cardsArray = [];
        cardsData.map((record)=>{
            cardsArray.push(
                <SingleCard
                    key={record.title}
                    title={record.title}
                    value={record.value}
                />
            );
        });
        return cardsArray;
    }
    handleClick(state){
    	let {dispatch} = this.props;
    	dispatch(push(`/site-list/${state}`));
    }
    render(){
        const {statistics} = this.props;
	    return (
            <div className="card-group">
                <SingleCard
                    title={"总站点数"}
                    value={statistics.result?statistics.result.totalSites:""}
                />
                <SingleCard
                    title={"在线站点数"}
                    value={statistics.result?statistics.result.siteOnlines:""}
                />
                <SingleCard
                    title={"正常站点数"}
                    value={statistics.result?statistics.result.normalSites:""}
                    clickFn={this.handleClick.bind(this,'normal')}
                    pointer={true}
                />
                <SingleCard
                    title={"异常站点数"}
                    value={statistics.result?statistics.result.warningSites:""}
                    clickFn={this.handleClick.bind(this,'abnormal')}
                    pointer={true}
                />
            </div>
        );
    }
}


/*
    params : 
        title : 
        value : 
*/
class SingleCard extends Component{
    render(){
        const {title, value,clickFn,pointer} = this.props;
        return (
            <div className={pointer ? 'dashboard card' : 'card'} onClick={clickFn ? clickFn : ()=>{}} style={pointer ? {cursor:'pointer'} : {}}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex no-block align-items-center">
                                <div>
                                    <h3><i className="icon-screen-desktop"></i></h3>
                                    <p className="text-muted">{title}</p>
                                </div>
                                <div className="ml-auto">
                                    <h2 className="counter text-primary">{value}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}