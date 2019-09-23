import React, {
    Component
} from 'react';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
export default class GlModal extends Component {
    render() {
        let {
            isOpen,
            dispatch,
            modalTitle,
            modalBody,
            modalFooter
        } = this.props;
        return (<Modal isOpen={isOpen}
            size="modal-lg">
            <ModalHeader>
                <ModalTitle>
                    {modalTitle}
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                {modalBody}
            </ModalBody>
            <ModalFooter> {
                modalFooter
            } </ModalFooter>
        </Modal>)
    }
}