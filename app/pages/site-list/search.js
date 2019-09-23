import React, { Component } from 'react'
import Utils from './../../common-utils'
import SelfInput from './../../common-view/self-input'
import BsSelect from './../../common-view/bs-select'
import SiteSelect from "../../common-view/SiteSelect";
import CommonUtils from './../../common-utils';
import {siteGetSiteMeta, getSiteVillage} from './../../common-values'
const pickSiteState = [{name: '全部', value: '',}, {name: '在线', value: 'Online',}, {name: '离线', value: 'Offline',}];
const pickState = [{name: '全部', value: '',}, {name: '创建', value: 'Created',}, {name: '正常', value: 'Normal',}, {name: '删除', value: 'Deleted',}];
const warningState = [{name: '全部', value: '',}, {name: '正常', value: false,}, {name: '异常', value: true,}];
export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            params: {
                keyword: '',
                siteState: '',
                state: '',
	            warning:null,
                currentPage:0,
                town: "",
                vendorName: "",
                technology: "",
                capacity: "",
                village: ""
            },
            townArr: [],
            vendorArr: [],
            technologyArr: [],
            capacityArr: [],
            villageArr: []
        }
    }
    onChange(val) {
	    var fn = Utils.debounce(() => this.commits(val), 500);
        fn()
    }
    async commits(val) {
        let { commitParams } = this.props;
        let params = Object.assign({}, this.state.params);
        params.keyword = val;
	    params.currentPage = 0;
        await this.setState({
            params: params
        });
        // commitParams(this.state.params);
    }
    async doSelectChange(val, type) {
        let { commitParams } = this.props
        let params = Object.assign({}, this.state.params)
	    params[type] = val;
	    params.currentPage = 0;
        await this.setState({
            params: params
        });

	    let finalParam = Object.assign({}, params);
	    if(finalParam.warning !== ''){
	    	if(finalParam.warning === 'abnormal'){
			    finalParam.warning = true;
		    }else if(finalParam.warning === 'normal'){
			    finalParam.warning = false;
		    }
	    }else{
		    finalParam.warning = null;
	    }
        // commitParams(finalParam);
    }
    async doChange(val, type) {
        let { commitParams } = this.props
        let params = Object.assign({}, this.state.params)
        params[type] = val
        if(val =="全部") {
            params[type] = ""
        }
        params.currentPage = 0;
        if(type === "town") {
            params.village = ""
            await this.setState({
                params: params
            })
            this.queryVillage(val)
        }
        await this.setState({
            params: params
        });
    }
    async queryVillage(val) {
        let str = getSiteVillage + "/" + encodeURIComponent(val) + ".htm"
        await CommonUtils.doJsonPost(str, null).then(async rs=>{
            if(rs.code === 0) {
                await this.compareArr(rs.results, "village")
                this.setState({
                    village: rs.results[0]
                })
            }
        })
    }
    handleSearch(){
        let { commitParams, stateId } = this.props;
        let params = Object.assign({}, this.state.params)
        
        params.keyword = stateId.name
        params.showInvisible = 1
	    commitParams(params);
    }
	async handleClear(){
		let { commitParams } = this.props;
    	let params = {
		    keywords: '',
		    siteState: '',
		    state: '',
		    warning:null,
		    village: ""
	    };
    	await this.setState({
		    params,
		    villageArr:[]
	    });
		commitParams(this.state.params);
    }
    async componentDidMount() {
        await CommonUtils.doJsonPost(siteGetSiteMeta, {}).then(rs=>{
            if(rs.code === 0) {
                let result = rs.result
                if(result.town.length > 0) {
                    this.compareArr(result.town, "town")
                }
                if(result.vendor.length > 0) {
                    this.compareArr(result.vendor, "vendor")
                }
                if(result.technology.length > 0) {
                    this.compareArr(result.technology, "technology")
                }
                if(result.capacity.length > 0) {
                    this.compareArr(result.capacity, "capacity")
                }
            }
        })
        let {parentParams} = this.props
        let {params} = this.state
        let keys = Object.keys(parentParams);
        
        keys.forEach(async val=> {
            params[val] = parentParams[val] 
            if(val === "town") {
                console.log(1111111);
                
                await this.queryVillage(params["town"])
                
                this.setState({
                    village: parentParams[val] 
                })
            }
        })
        this.setState({
            params: params
        })
    }
    async compareArr(data, type) { 
        let arr = []
        
        if(type === "village") {
            data = ["", ...data]
        }
        data.forEach(val => {
            let obj = {
                name: val,
                value: val
            }
            if(!val) {
                obj.name = "全部"
            }
            arr.push(obj)
        })
        await this.setState({
            [`${type}Arr`]: arr
        })
    }
    render() {
        let { params, townArr,vendorArr,technologyArr,capacityArr, villageArr} = this.state;
        let {selectList, defaultValue, siteListData} = this.props;
        let auto = {width:'auto'};
        console.log(siteListData,"siteList");
        
	    return (
            <div className="site-search-box" >
                <div className="left sm-grow">
                    <div className="left search-name">
                        镇名：
                    </div>
                    <div className="site-input-box" style={auto}>
                        <BsSelect
                            optionsList={townArr}
                            valueType='value'
                            selectType='name'
                            defaultValue={params.town}
                            onChange={(val) => this.doChange(val, 'town')}>
                        </BsSelect>
                    </div>
                </div>
                <div className="left sm-grow">
                    <div className="left search-name">
                        村名：
                    </div>
                    <div className="site-input-box" style={auto}>
                        <BsSelect
                            optionsList={villageArr.length<=0?[{name:"全部"}]:villageArr}
                            valueType='value'
                            selectType='name'
                            defaultValue={params.village}
                            onChange={(val) => this.doChange(val, 'village')}>
                        </BsSelect>
                    </div>
                </div>
                <div className="left sm-grow">
                    <div className="left search-name">
                        厂家：
                    </div>
                    <div className="site-input-box" style={auto}>
                        <BsSelect
                            optionsList={vendorArr}
                            valueType='value'
                            selectType='name'
                            defaultValue={params.vendorName}
                            onChange={(val) => this.doChange(val, 'vendorName')}>
                        </BsSelect>
                    </div>
                </div>
                <div className="left sm-grow">
                    <div className="left search-name">
                        工艺：
                    </div>
                    <div className="site-input-box" style={auto}>
                        <BsSelect
                            optionsList={technologyArr}
                            valueType='value'
                            selectType='name'
                            defaultValue={params.technology}
                            onChange={(val) => this.doChange(val, 'technology')}>
                        </BsSelect>
                    </div>
                </div>
                <div className="left sm-grow">
                    <div className="left search-name">
                        吨位：
                    </div>
                    <div className="site-input-box" style={auto}>
                        <BsSelect
                            optionsList={capacityArr}
                            valueType='value'
                            selectType='name'
                            defaultValue={params.capacity}
                            onChange={(val) => this.doChange(val, 'capacity')}>
                        </BsSelect>
                    </div>
                </div>
	            <SiteSelect {...this.props} title="站名" refScope="filter" selectList={selectList} defaultValue={defaultValue} />

                <div className="left sm-grow">
                    <div className="left search-name">
                        在线状态：
                    </div>
                    <div className="site-input-box" style={auto}>
                        <BsSelect
                            optionsList={pickSiteState}
                            valueType='value'
                            selectType='name'
                            defaultValue={params.siteState}
                            onChange={(val) => this.doSelectChange(val, 'siteState')}>
                        </BsSelect>
                    </div>
                </div>
	            <div className="left sm-grow">
		            <div className="left search-name">
			            报警状态：
		            </div>
		            <div className="site-input-box" style={auto}>
			            <BsSelect
				            optionsList={warningState}
				            valueType='value'
				            selectType='name'
				            defaultValue={params.warning}
				            onChange={(val) => this.doSelectChange(val, 'warning')}>
			            </BsSelect>
		            </div>
	            </div>
                <div className="left sm-grow">
                    <div className="left search-name">
                        显示状态：
                    </div>
                    <div className="site-input-box" style={auto}>
                        <BsSelect
                            optionsList={pickState}
                            valueType='value'
                            selectType='name'
                            defaultValue={params.state}
                            onChange={(val) => this.doSelectChange(val, 'state')}>
                        </BsSelect>
                    </div>
                </div>
                <div className="left sm-grow">
	                <button type="button" className="btn btn-gray d-lg-block m-l-15" onClick={this.handleSearch.bind(this)}>
		                搜索
	                </button>
	                <button type="button" className="btn btn-info d-lg-block m-l-15" onClick={this.handleClear.bind(this)}>
		                清空
	                </button>
                    
                </div>
                {
                    siteListData.siteList && siteListData.siteList.code===0 &&
                    <div className="left sm-grow" style={{marginLeft: '20px'}}>共<span style={{color: "#f95c2e"}}>{siteListData.siteList.pager.totalCount}</span>条数据</div>
                }
            </div>
        );
    }
}
