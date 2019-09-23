import React,{Component} from "react"
import EChart from 'echarts-for-react';

export default class EChartCluster extends Component{

	constructor(props){
		super(props);
		this.state = {
			option:null
		};
	}
	async componentWillMount(){
		await this.init();
	}
	init(data) {
		//数据格式
		// var data = [[3.275154, 2.957587]];
		let Color = {
			 PINK : "#F759AB",
			 LIGHTGREEN : "#D3F261",
			 DARKGREEN:"08979C",
			 LIGHTBLUE:"#69C0FF",
			 YELLOW:"#FADB14"
		};
		let option = {
			timeline: {show:false, data: []},
			baseOption: {
				title: {
					show:false, text: '用电量/产水量', left: 'center', top: 20
				},
				xAxis: {type: 'value',name:"用电量"}, yAxis: {type: 'value',name:"产水量"},
				// legend: {
				// 	data:['test legend']
				// },
				series: [{  //图表数据:每隔对象对应一种图表类型
					name:"test legend",    // 一一对应 legend
					type: 'scatter',
					data,
					//pre-release "echarts": "4.3.0-rc.1",
					symbol:(value, params) => {
						// console.log(value,params);
						// if(value[0]>2)
							return "circle";
						// return "rect";
					},
					itemStyle:{
						color:params=>{
							if(params.data[0]>2) return '#c23531';
							return '#2f4554';
						}
					}
				}],
				//hover 弹出框
				tooltip:{
					trigger: 'axis', axisPointer: {type: 'cross'},
					formatter: function (params) {
						return `
							编号:${params[0].data[2]} <br />
							名称:${params[0].data[3]} <br />
							工艺:${params[0].data[4]} <br />
							用电量:${params[0].data[0]} <br />
							产水量:${params[0].data[1]}
						`
					}
				}
			}
		};
		return option;
	}
	renderEcharts() {
		let {dataList} = this.props;
		let data = [];
		dataList.forEach((val)=>{
			let arr = [];
			arr.push(val.electricityCosume < 0 ? (0).toFixed(2) : val.electricityCosume.toFixed(2));
			arr.push(val.accumulateVolume < 0 ? (0).toFixed(2) : val.accumulateVolume.toFixed(2));
			arr.push(val.id);
			arr.push(val.name);
			arr.push(val.technology);
			data.push(arr)
		});
		let options = this.init(data);
		return <EChart option={options} className='bg-white react_for_echarts'
						style={{width: "100%",height: '100%'}}/>
	}
	render(){
		return (
			<div style={{width: "100%",height: '100%'}}>
				{this.renderEcharts()}
			</div>	
				
		);
	}
}
