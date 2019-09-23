import React, { Component } from 'react'
import { Provider } from 'react-redux'
import CameraListApp from './camera-list-app'
import GlModal from './../../common-view/modal'
import {toggleModal} from './actions'
import ModalImg from './modal-img'
import ModalSet from './modal-set'
export default class Modal extends Component{
    modalTitle() {
        return (<div>确认</div>);
    }
    modalBody() {
        let {toggleModel} = this.props
        switch (toggleModel.tab) {
            case 'details':
                return <ModalImg {...this.props} />
                break;
            case 'set':
                return <ModalSet {...this.props} />
                break;
            default:
                break;
        }
    }
    modalFooter() {
        let {toggleModel} = this.props
        switch (toggleModel.tab) {
            case 'details':
                return (<div>
				    <button
					    style={{ marginRight: 15 + 'px' }}
					    type="button"
					    className="btn waves-effect waves-light btn-xs btn-danger table-success"
					    onClick={this.handleSure.bind(this)}>
					    确认
				    </button>
				    <button
					    type="button"
					    className="btn waves-effect waves-light btn-xs btn-secondary"
					    onClick={this.handleCancel.bind(this)}>
					    取消
				    </button>
			    </div>);
                break;
            case 'set':
                return (<div>
				    <button
					    style={{ marginRight: 15 + 'px' }}
					    type="button"
					    className="btn waves-effect waves-light btn-xs btn-danger table-success"
					    onClick={this.handleSetSure.bind(this)}>
					    确认
				    </button>
				    <button
					    type="button"
					    className="btn waves-effect waves-light btn-xs btn-secondary"
					    onClick={this.handleCancel.bind(this)}>
					    取消
				    </button>
			    </div>);
                break;
            default:
                break;
        }
    }
    handleSure() {

    }
    // 设置灵敏度
    handleSetSure() {

    }
    handleCancel() {
        let {dispatch} = this.props
        dispatch(toggleModal({
            visible: false,
            tab: ''
        }))
    }
	render() {
        let {toggleModel} = this.props
	    return (
            <div>
                <GlModal
                    isOpen={toggleModel.visible}
                    modalTitle={this.modalTitle()}
                    modalBody={this.modalBody()}
                    modalFooter={this.modalFooter()}>
	            </GlModal>
            </div>
	    )
	}
}