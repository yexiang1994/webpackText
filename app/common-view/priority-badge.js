import React, {Component} from 'react';

/*
    props : 
        priority : 
*/

export default class PriorityBadge extends Component{
    render(){
        const {priority} = this.props;
        if(priority == "High"){
            return <span className="badge badge-danger badge-pill">高</span>;
        }else if(priority == "Normal"){
            return <span className="badge badge-warning badge-pill">中</span>;
        }else{
            return <span className="badge badge-success badge-pill">低</span>;
        }
    }
}