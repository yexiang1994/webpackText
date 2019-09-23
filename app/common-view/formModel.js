import React, {Component} from 'react'
import {modleToggle} from './../common-actions'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

export default class FormModal extends Component {
    doCloseClick() {
        let {dispatch} = this.props;
        let data = {
            // 弹窗开关
            toggle: false,
            // 弹窗里面的信息
            dataRows: {},
            // 弹窗标题
            title: '详情',
            // 哪一个弹窗  details详情  edit编辑
            view: 'details'
        };
        dispatch(modleToggle(data))
    }
    btnGrop(moduleToggle) {
        switch (moduleToggle.view) {
            case 'details':
                return (<button className='btn btn-primary' onClick={this.doCloseClick.bind(this)}>
                    关闭
                </button>);
            default:
        }
    }
    render() {
        let {moduleToggle} = this.props;
        return (<Modal isOpen={moduleToggle.toggle} size="modal-lg">
            <ModalHeader>
                <ModalTitle>{moduleToggle.title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div style={{maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden'}}>
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                {this.btnGrop(moduleToggle)}
            </ModalFooter>
        </Modal>);
    }
}
