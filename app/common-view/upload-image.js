import React from 'react'
import CommonUtils from '../common-utils'
import {formChange} from "../common-actions";
export default class UploadImage extends React.Component{
	componentDidMount(){
		const { parent } = this.props;
		CommonUtils.initDropifyPlugin(parent);
	}
	handleUpload(){
		$("#input-file").click();
	}
	generateImg(arr){
		let {addWidth} = this.props;
		let imgs=[];
		arr.forEach((item,idx)=>{
			imgs.push(
				<div key={idx} className={"img-wrapper"} style={{display:"flex",alignItems:"center",width:"33%",padding:10}}>
					<img className="model-images" src={item} alt="" style={{width:"100%"}} />
				</div>
			);
		});
		imgs.push(<div key={-1} onClick={()=>{this.handleUpload()}} className={"img-wrapper addWrapper"}>
			<img className="model-images" src="./assets/images/add-new.png" title="添加图片"
			     alt="添加图片" style={{maxWidth:"100%"}}
			/>
		</div>);
		return imgs;
	}
	render(){
		const { arr } = this.props;

		return (
			<div className="form-group row" style={{justifyContent:"center"}}>
				<label className="col-sm-3 text-right control-label col-form-label">
					上传图片
				</label>
				<input style={{display:"none"}} type="file" multiple="multiple" name="file" id="input-file"
				       className="dropify"/>
				<div className="col-sm-9">
					<div className="imgWrapper">
					{
						this.generateImg(arr)
					}
					</div>
				</div>
			</div>
		)
	}
}