import React, { Component } from 'react'
import { push } from 'react-router-redux'
import {capturePrefix, getDeviceCaptureImageListUrl,consoleUrl} from "../../common-values";
import CommonUtils from "./../../common-utils"
import {chooseSite, chooseWarningSite, setFirstImg} from "./actions";
import {fetchJson, generalFetchAction, toggleAlert} from "../../common-actions";
import {RECEIVE_SITE_LIST} from "../site-list/actions";
import Pager from "../../common-view/pager";
import Loading from "../../common-view/loading";

export default class WarningModel extends Component {
	constructor(props){
		super(props);
		this.state = {
			activeImg:0,
			loading:true
		}
	}
	async componentDidMount(){
		let {dispatch} = this.props;
		await this.handlePageChange(dispatch)("siteImgs", 0)();
	}
	componentWillUnmount(){
		let {dispatch} = this.props;
		dispatch(chooseWarningSite({}));
		dispatch(setFirstImg(null));
	}
	handlePageChange(dispatch) {
		const {siteState} = this.props;
		return (scope, page) => () => {
			dispatch(fetchJson(getDeviceCaptureImageListUrl, {
					siteId:siteState.siteId,
					deviceType:"GunCamera",
					customizedPageSize:7,
					currentPage:page,
					start:siteState.timestamp - 15*60*1000,
					end:siteState.timestamp + 15*60*1000
				}, "GetSiteImgList",
				generalFetchAction(RECEIVE_SITE_LIST, (res) => {
					if (res.code === 0) {
						if(res.results.length > 0){
							dispatch(setFirstImg(res.results[0].path));
							this.setState({activeImg: 0})
						}
						dispatch(chooseWarningSite(res));
						this.setState({loading: false})
					} else {
						dispatch(toggleAlert(res.message, 'error'))
					}
			})));
		}
	}
	selectImg(imgUrl,index){
		let {dispatch} = this.props;
		this.setState({activeImg:index});
		dispatch(setFirstImg(imgUrl));
	}
	generateImgs(){
		const {warningSite} = this.props;
		let imgs = [];
		let smallImg={width:"12%",cursor:"pointer"},bigImg={width:"16%",cursor:"pointer",boxShadow: "lightslategrey 0px 0px 10px 2px"};
		let icon = {fontSize:20,color:"#fb9678",cursor:"pointer"},
			icon2 = {fontSize:20,color:"gray",cursor:"pointer"};
		let pager = warningSite.pager;

		if(warningSite.results && warningSite.results.length > 0){
			if(pager && pager.totalPage > 1){
				imgs.push(<i className="fas fa-arrow-circle-left own-arrow" key={-1} onClick={this.customPre.bind(this)}
				             style={
					             pager && pager.currentPage === 0 ? icon2 : icon
				             }/>);
			}
			warningSite.results.forEach((item,index)=>{
				imgs.push(<img src={capturePrefix+item.thumbnailPath} key={index}
				               style={index === this.state.activeImg ? bigImg : smallImg}
				               onClick={this.selectImg.bind(this,item.path,index)}/>
				);
			});
			if(pager && pager.totalPage > 1){
				imgs.push(<i className="fas fa-arrow-circle-right own-arrow" key={-2} onClick={this.customNext.bind(this)}
				             style={
					             pager && pager.currentPage === (pager.totalPage - 1) ? icon2 : icon
				             }/>)
			}
		}
		return imgs;
	}
	//点击跳转 NVR
	linkToConsole(){
		let {dispatch,stationNumber} = this.props;
		if(stationNumber !== -1){
			window.open(consoleUrl.replace(/\[port\]/g,stationNumber * 40 + 1 + 20000));
		}else{
			dispatch(toggleAlert('站号有误', 'warning'))
		}
	}
	customPre(){
		let {dispatch,warningSite} = this.props;
		let pager = warningSite.pager;
		var prevPage = 0;
		if (pager.currentPage !== 0) {
			prevPage = pager.currentPage - 1;
			this.handlePageChange(dispatch)("siteImgs", prevPage)();
		}
	}
	customNext(){
		let {dispatch,warningSite} = this.props;
		let pager = warningSite.pager;
		var nextPage = 0;
		if (pager.currentPage !== (pager.totalPage - 1)) {
			nextPage = pager.currentPage + 1;
			this.handlePageChange(dispatch)("siteImgs", nextPage)();
		} else {
			nextPage = pager.totalPage - 1;
		}
	}
	handleDetailLink(siteId,e){
		let {dispatch} = this.props;
		e.preventDefault();
		dispatch(push(`/site-detail/${siteId}`));
	}
	render() {
		const {dispatch,warningSite,siteState,currentImg, warningData} = this.props;
		let imgStyle = {
			display: "flex", justifyContent: "space-around", alignItems: "center"
		},bigImg = {maxWidth:"90%"};
		
		return (
			<div className="col-lg-12">
				<div className="row">
					<label className="col-sm-3 text-right control-label col-form-label">站点名称：</label>
					<div className="col-sm-9 text-left control-label col-form-label">
						<a href="" onClick={this.handleDetailLink.bind(this,siteState.siteId)}>{siteState.siteName && siteState.siteName}</a>
					</div>
				</div>
				{
					warningData &&
					<div>
						<div className="row">
							<label className="col-sm-3 text-right control-label col-form-label">报警内容：</label>
							<div className="col-sm-9 text-left control-label col-form-label">
								{warningData && warningData.description}
							</div>
						</div>
						<div className="row">
							<label className="col-sm-3 text-right control-label col-form-label">报警类型：</label>
							<div className="col-sm-9 text-left control-label col-form-label">
								{warningData && warningData.displayWarningType}
							</div>
						</div>
					</div>
				}
				
				<div className="row">
					<label className="col-sm-3 text-right control-label col-form-label">回放视频入口：</label>
					<div className="col-sm-9 text-left control-label col-form-label">
						<button type="button"
						        onClick={this.linkToConsole.bind(this)}
						        className="btn waves-effect waves-light btn-xs btn-success table-success">点击跳转</button>
					</div>
				</div>

				<div className="row">
					<label className="col-sm-3 text-right control-label col-form-label">报警时间：</label>
					<div className="col-sm-9 text-left control-label col-form-label">
						{siteState.timestamp && CommonUtils.timestampToTime(siteState.timestamp,"YY-MM-DD")}
					</div>
				</div>

				<div className="row">
					<label className="col-sm-3 text-right control-label col-form-label">现场截图：</label>
					<div className="col-sm-12 text-left control-label col-form-label" style={imgStyle}>
						{this.generateImgs()}
					</div>
					<div className="col-sm-12 text-center control-label col-form-label">
						{
							currentImg == null ?
								<img src="./assets/images/no-picture.gif" style={bigImg} />
								:
								<img src={capturePrefix+currentImg} style={bigImg} />
						}
					</div>
					<Loading show={this.state.loading} />
				</div>

			</div>
		);
	}
}
