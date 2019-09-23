import React, { Component } from 'react'
import CommonUtils from "../common-utils";
import {toggleAlert} from "../common-actions";
import {getFormImages, imgAccessUrl} from './../common-values'

export default class FormDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	dataCorrect:true,
	        imgs:[]
        }
    }
    async componentDidMount(){
    	let {moduleToggle,dispatch} = this.props;
	    let id = moduleToggle.dataRows.id;
	    await CommonUtils.doJsonPost(getFormImages,{id}).then(rs => {
		    if(rs.code === 0) {
			    this.setState({imgs:rs.result});
		    } else {
			    dispatch(toggleAlert(rs.message, 'failed'))
		    }
	    });
    }
	generateContent(){
		let { moduleToggle,types,extentField,extendObj,dispatch } = this.props;
		let data = moduleToggle.dataRows;
		let contents = [];
		let comment = {},runningState={};   //old seven forms
		let dataDevice=[]; //new two forms
		let devices = null;
		if(data.devices) {
			try {
				devices = JSON.parse(data.devices);
				//old form
				if (devices.comment) {
					devices.comment.forEach(ele => {
						Object.keys(ele).forEach(key => {
							comment[key] = ele[key];
						})
					});
				}
				if (devices.runningState) {
					devices.runningState.forEach(ele => {
						Object.keys(ele).forEach(key => {
							runningState[`${key}State`] = ele[key];
						})
					});
				}
			} catch (e) {
				if (this.state.dataCorrect) {
					dispatch(toggleAlert('json format failed', 'warning'));
					this.setState({dataCorrect: false});
				}
			}
		}
		//普通字段处理
		types.concat(extentField).forEach((item,idx)=>{
			if(item.groupField){
				if(comment && runningState){    //json格式错误不输出
					if(item.groupField==="state"){
						contents.push(
							<div className={"col-sm-12"} key={idx}>
								<div className="form-group row m-b-0" style={{fontSize:16}}>
									<label className="col-sm-4 text-right control-label col-form-label fw-bold"
									       dangerouslySetInnerHTML={{__html:item.value}}
									>
									</label>
									<div className="col-sm-8 text-left control-label col-form-label">
										{
											runningState[item.name] === "normal" && "正常"
										}
										{
											runningState[item.name] === "abnormal"&& "故障"
										}
									</div>
								</div>
								<div className="form-group row m-b-0">
									<label className="col-sm-4 text-right control-label col-form-label fw-bold">
										备注
									</label>
									<div className="col-sm-8 text-left control-label col-form-label">
										<p className="m-b-0" style={{wordBreak: "break-all"}}>
											{comment[item.name.replace(/State/,"")]}
										</p>
									</div>
								</div>
							</div>
						)
					}
				}
			}else{
				if(item.type&&item.type.indexOf("title")!==-1){
					contents.push(
						<div className={"col-sm-12"} key={idx}>
							<div className="form-group row m-b-0" style={{fontSize:16}}>
								<h4 className="common-title fs-20 m-b-0 padding-20" style={{marginLeft:"1em"}} dangerouslySetInnerHTML={{__html: item.name}}/>
							</div>
						</div>
					)
				}else{
					contents.push(
						<div className={"col-sm-6"} key={idx}>
							<div className="form-group row m-b-0" style={{fontSize:16}}>
								<label className="col-sm-6 text-right control-label col-form-label fw-bold"
								       dangerouslySetInnerHTML={{__html:item.value}}>
								</label>
								<div className="col-sm-6 text-left control-label col-form-label">
									{
										(item.name.indexOf("Time") > 0 || item.name.indexOf("Date") > 0 || item.name==="date" || item.name==="timestamp") ? CommonUtils.timestampToTime(data[item.name]) : data[item.name]
									}
								</div>
							</div>
						</div>
					)
				}
			}
		});
		//parseJSON string
		if(devices && data.homeFacility && data.netFacility){
			try {
					let hf = JSON.parse(data.homeFacility);
					let nf = JSON.parse(data.netFacility);
					//new form      homePipe: "破损"
					let extendNameToText = {};
					extendObj.deviceType.concat(extendObj.netFacility,extendObj.homeFacility).map(item=>{
						extendNameToText[item.value] = item.name;
					});
					let allData = Object.assign({},
						{deviceTitle:"终端设施"},devices,
						{netFacilityTitle:"管网设施"},nf,
						{homeFacilityTitle:"接户设施"},hf);
					Object.keys(allData).forEach(key=>{
						dataDevice.push({
							name:key,
							value:allData[key]
						})
					});
					if(extendObj){
						dataDevice.forEach((item,idx)=>{
							if(item.name.indexOf("Title")!==-1){
								contents.push(
									<div className={"col-sm-12"} key={item.name+idx}>
										<div className="form-group row m-b-0" style={{fontSize:20}}>
											<h4 className="common-title fs-20 m-b-0 padding-20" style={{marginLeft:"1em"}}>{item.value}</h4>
										</div>
									</div>
								)
							}else{
								contents.push(
									<div className={"col-sm-6"} key={item.name+idx}>
										<div className="form-group row m-b-0" style={{fontSize:16}}>
											<label className="col-sm-6 text-right control-label col-form-label fw-bold"
											       dangerouslySetInnerHTML={{__html:extendNameToText[item.name]}}
											>
											</label>
											<div className="col-sm-6 text-left control-label col-form-label">
												{item.value?item.value:"暂无"}
											</div>
										</div>
									</div>
								)
							}
						})
					}
			}catch (e) {
				if(this.state.dataCorrect){
					dispatch(toggleAlert('json format failed', 'warning'));
					this.setState({dataCorrect:false});
				}
			}
		}
		return contents;
	}
	generateImg(scope){
    	let {imgs} = this.state;
		let imgArray=[];
		if(imgs.length){
			imgs.forEach((item,idx)=>{
				imgArray.push(
					<a key={idx} className="display-block col-lg-4"
					   href={imgAccessUrl+item.path} style={{margin:"10px 0"}}
					   data-lightbox={"images-"+scope}>
						<img style={{maxWidth:"100%"}} src={imgAccessUrl+item.path} alt=""/>
					</a>
				);
			})
		}else{
			imgArray.push(<div key={-1} className="col-lg-4" style={{padding:10}}>
				<img className="model-images" src="./assets/images/no-picture.gif" alt="无图片" style={{maxWidth:"100%"}} />
			</div>)
		}
		return imgArray;
	}
    render() {
	    let {moduleToggle,scope} = this.props;
	    return (
            <div style={{ width: '100%',padding:10,margin:"0 5px" }}>
	            <div className="form-group row m-b-0" style={{fontSize:16}}>
		            {this.generateContent()}
	            </div>
	            {
	            	!scope && <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexWrap:"wrap"}}>
			            {
				            this.generateImg(moduleToggle.dataRows.id)
			            }
		            </div>
	            }
            </div>
        )
    }
}
