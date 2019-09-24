import React from 'react'

export default class BSTable extends React.Component{
	render(){
		const {className, titles, body, minHeight} = this.props;
		var headers = [];
		titles.map((title) =>{
			let styleObj = {
				width : title.width
			};
			title.textAlign ? styleObj.textAlign = title.textAlign : "";
			headers.push(<th key={title.title} style={styleObj}>{title.title}</th>);
		});
		let classStr = className;
		if(classStr == null){
			classStr = "table";
		}
		return (
			<div className="table-responsive" style={minHeight?{minHeight}:{}}>
				<table className={classStr} style={this.props.style ? this.props.style : {}}>
					<thead>
						<tr>
							{headers}
						</tr>
					</thead>
					<tbody>
						{body.length > 0 ? body : <tr><td><div className="no-list-data">暂无数据</div></td></tr>}
					</tbody>
				</table>
			</div>
		)
	}
}

