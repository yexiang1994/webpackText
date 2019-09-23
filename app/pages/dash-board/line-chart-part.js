import React, { Component } from 'react'
import Chart, {ChartColor} from 'chart.js'
import SurveillancePart from './surveillance-part'

export default class LineChartPart extends Component{
    componentWillReceiveProps(nextProp){
        const {siteData} = nextProp;
        if(siteData.results != null){
            let data = siteData.results;
            this.buildFirstChart(data);
        }
    }
    buildFirstChart(data){
        let electricityCosume = [],accumulateVolume=[];
        let labels = [];
        for(var i = data.length - 1 ; i >= 0 ; i--){
            if(data[i] != null){
	            data[i].electricityCosume && data[i].electricityCosume > 0 ? electricityCosume.push(data[i].electricityCosume.toFixed(2)) : electricityCosume.push((0).toFixed(2));
	            data[i].accumulateVolume && data[i].accumulateVolume > 0 ? accumulateVolume.push(data[i].accumulateVolume.toFixed(2)) : accumulateVolume.push((0).toFixed(2));
	            labels.push(new Date(data[i].timestamp).Format("dd-hh:mm"));
            }
        }
        // var ctx = document.getElementById('mount_node_1').getContext('2d');
	    var barChartData = {
		    labels: labels,
		    datasets: [{
			    label: '用电量',
			    backgroundColor: 'rgb(251,175,192)',
			    borderColor: 'rgb(251,175,192)',
			    borderWidth: 1,
			    data: electricityCosume
		    },{
			    label: '流量',
			    backgroundColor: 'rgb(165,208,245)',
			    borderColor: 'rgb(165,208,245)',
			    borderWidth: 1,
			    data: accumulateVolume
		    }]

	    };
	    var ctx = this.clearCanvas();
	    window.myBar = new Chart(ctx, {
		    type: 'bar',
		    data: barChartData,
		    options: {
			    responsive: true,
			    legend: {
				    position: 'top',
			    }, scales: {
				    yAxes: [{
					    display: true,
					    ticks: {
						    beginAtZero: true
					    }
				    }]
			    }
		    }
	    });
    }
	clearCanvas(){
		$('#mount_node_1').remove();
		$('#chart_place').append('<canvas id="mount_node_1"></canvas>');
		return document.getElementById('mount_node_1').getContext('2d');
	}
    render(){
        let {singleSite,deviceList} = this.props,site=null
        if(singleSite.result != null){
            site = singleSite.result
        }
	    return (
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex">
                            <div>
                                <h5 className="card-title">站点名称 ：{site == null ? "暂无数据" : site.name}</h5>
                                <h6 className="card-subtitle">站点编号 ：{site == null  ? "暂无数据" : site.id}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <SurveillancePart deviceList={deviceList} />
                    </div>
                    <div className="card-body">
                        <div className="d-flex">
                            <div>
                                <h5 className="card-title">站点数值监控</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" id="chart_place">
                        <canvas id="mount_node_1" className="mount-node"></canvas>
                    </div>
                </div>
            </div>
        );
    }
}