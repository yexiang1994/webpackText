import React, { PureComponent } from 'react';
import Chart, {ChartColor} from 'chart.js';
import Loading from './../../common-view/loading';
import { push } from 'react-router-redux';
export default class PieChartGroup extends PureComponent{
    // componentWillReceiveProps
    shouldComponentUpdate(nextProps) {
        if (this.props.statistics.code !== nextProps.statistics.code){
            this.drawEarch(nextProps)
            return true
        }
        return false
    }
    drawEarch(nextProps){
        const { statistics,dispatch } = nextProps;
        if (statistics.result != null) {
            let data = statistics.result;
            let config1 = this.genPieConfig({
                datasets: [{
                    data: [
                        data.totalSites - data.siteOnlines,
                        data.siteOnlines
                    ],
                    backgroundColor: [
                        "#F66081",
	                    "#4BA1EA"
                    ],
                    label: "在线站点"
                }],
                labels: [
                    "离线",
                    "在线"
                ]
            });
            Chart.defaults.global.defaultFontSize = 12;
            let canvas1 = document.getElementById('pie_chart_1');
            var ctx = canvas1.getContext('2d');
            let myPie1 = new Chart(ctx, config1);
			//获取被点击的区域信息
	        canvas1.onclick = function(evt) {
		        var activePoints = myPie1.getElementsAtEvent(evt);
		        if (activePoints[0]) {
			        var chartData = activePoints[0]['_chart'].config.data;
			        var idx = activePoints[0]['_index'];
			        var label = chartData.labels[idx];
			        label === "离线" ? dispatch(push(`/site-list/Offline`)) : "";
		        }
	        };

            let config2 = this.genPieConfig({
                datasets: [{
                    data: [
                        data.normalSites,
                        data.warningSites
                    ],
                    backgroundColor: [
                        "#4BA1EA",
                        "#F66081"
                    ],
                    label: "正常站点"
                }],
                labels: [
                    "正常",
                    "异常"
                ]
            });
            let canvas2 = document.getElementById('pie_chart_2');
            var ctx = canvas2.getContext('2d');
            let myPie2 = new Chart(ctx, config2);
	        canvas2.onclick = function(evt) {
		        var activePoints = myPie2.getElementsAtEvent(evt);
		        if (activePoints[0]) {
			        var chartData = activePoints[0]['_chart'].config.data;
			        var idx = activePoints[0]['_index'];
			        var label = chartData.labels[idx];
			        label === "异常" ? dispatch(push(`/site-list/abnormal`)) : "";
		        }
	        };

        }
    }
    genPieConfig(data){
        return {
			type: 'pie',
			data: data,
			options: {
				responsive: true,
				legend: {
					onHover: function(e) {
						e.target.style.cursor = 'pointer';
					}
				},
				hover: {
					onHover: function(e) {
						var point = this.getElementAtEvent(e);
						if(point.length){
							var chartData = point[0]['_chart'].config.data;
							var idx = point[0]['_index'];
							var label = chartData.labels[idx];
							(label === "异常" || label === "离线") ? e.target.style.cursor = 'pointer' : e.target.style.cursor = 'default';
						}else{
							e.target.style.cursor = 'default';
						}
					}
				}
			}
        };
    }
    render() {
        let { loading} = this.props
        let pieStyle = {position: "relative",width:"75%",top:"50%",left:"50%",transform:"translate(-50%,-50%)"};
        return (
            <div className="card-group positres">
                <Loading show={loading}></Loading>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="chart-container" style={pieStyle}>
                                    <canvas id="pie_chart_1"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="chart-container" style={pieStyle}>
                                    <canvas id="pie_chart_2"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}