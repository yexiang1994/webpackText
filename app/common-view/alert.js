import React, {Component} from 'react';
import {toggleAlert} from '../common-actions'
class Alert extends Component {
    componentDidUpdate() {
        let {alertDate, dispatch} = this.props
        if (alertDate.show) {
            setTimeout(() => {
                dispatch(toggleAlert('','', false))
            }, alertDate.time?alertDate.time: 2000)
        }
    }
    render() {
        let {alertDate, dispatch} = this.props
        if (alertDate.show) {
            switch (alertDate.type) {
                case 'info':
                    return (<div className='alert alert-info'>{alertDate.title}</div>)
                case 'warning':
                    return (<div className='alert alert-warning'>{alertDate.title}</div>)
                case 'danger':
                    return (<div className='alert alert-danger'>{alertDate.title}</div>)
                case 'success':
                    return (<div className='alert alert-success'>{alertDate.title}</div>)
                default:
                    return (<div className='alert alert-info'>{alertDate.title}</div>)
            }
        } else {
            return (<div></div>)
        }
    }
}

export default Alert
