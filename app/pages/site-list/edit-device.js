import React, { Component } from 'react';
import PageContainer from '../../pages/page-container/page-container'
import PageTitle from '../../common-view/page-title'
import { fetchJson, toggleAlert, formChange } from '../../common-actions'
import { getCreateDeviceUrl } from '../../common-values'
import BSInput from '../../common-view/bs-input'
// 提示框
import Alert from '../../common-view/alert'
import { push } from 'react-router-redux'
// import './edit-device.css';
import BsSelect from './../../common-view/bs-select'
import { doEditDefaulValue} from './actions'
class EditDevice extends Component {
    componentDidMount() {
        let { editDataRow, dispatch} = this.props
        $(".preloader").fadeOut();
        let datas = editDataRow.deviceDataRow
        dispatch(formChange('editSite', 'name', datas.name))
    }
    clearInputs() {
        let { doReback} = this.props
        doReback()
    }
    handleUpdate() {
        const { dispatch, editDefaultValue, editDataRow, updateDeviceList} = this.props;
        let deviceID = editDataRow.deviceDataRow.id;
        let _this = this
        const { name, stationNum } = this.props.formData.editSite;
        if (!editDefaultValue || !stationNum) {
            return dispatch(toggleAlert('请填写完整的信息', 'warning'))
        }
        dispatch(fetchJson(
            getCreateDeviceUrl,
            {
                id: Number(deviceID),
                stationNum: Number(stationNum),
                deviceType: editDefaultValue,
                name: name
            },
            "UpdateSite",
            function (rs) {
                if (rs.code === 0) {
                    _this.clearInputs()
                    updateDeviceList()
                    dispatch(toggleAlert('更新成功', 'success'))
                } else {
                    return dispatch(toggleAlert(rs.message, 'warning'))
                }
                return {
                    type: 'null'
                }
            }
        ));
    }
    doSelectChange(val) {
        let { dispatch } = this.props
        dispatch(doEditDefaulValue(val))
    }
    render() {
        const { dispatch, formData, editDefaultValue } = this.props;
        let deviceType = [{name: 'BallCamera', value: '球机'}, {name: 'GunCamera', value: '枪机'}, {name: 'PLC', value: 'PLC'}, {name: 'Controller', value: '核心控制器'}]
        return (
            <div>
                <div className="row">
                    <div className="col-lg-offset-3 col-sm-6 simpleform">
                        <div className="card card-body">
	                        <h3 className="common-title fs-20 m-b-10">编辑设备</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    <form>
                                        <BSInput title={"设备名称"} scope="editSite" name="name" placeholder="" dispatch={dispatch} formData={formData} type="text" isRequire={true}/>
                                        <div className='row' style={{ marginBottom: '15px' }}>
                                            <div className="col-xl-3" style={{ textAlign: 'right', lineHeight: '35px', color: '#000' }}>设备类型</div>
                                            <div className="col-xl-9">
                                                <BsSelect optionsList={deviceType}
                                                    valueType='name'
                                                    selectType='value'
                                                    defaultValue={editDefaultValue}
                                                    onChange={this.doSelectChange.bind(this)}>
                                                </BsSelect>
                                            </div>
                                        </div>
	                                    <div className="form-group m-b-0">
		                                    <div className="offset-sm-3 col-sm-9 text-left">
			                                    <button onClick={this.handleUpdate.bind(this)} className="btn full-btn waves-effect waves-light m-r-10">更新</button>
			                                    <button onClick={this.clearInputs.bind(this)} className="btn empty-btn waves-effect waves-light">取消</button>
		                                    </div>
	                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditDevice;
