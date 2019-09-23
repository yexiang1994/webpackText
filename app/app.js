import React from 'react'
import {render} from 'react-dom'
import {Link} from 'react-router'
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import PageContainer from "./pages/dash-board/dash-board"
import SiteList from './pages/site-list/site-list'
import LoginPage from './pages/login-page/login-page'
import './style/style.scss';
import Alarm from './pages/alarm/index'

Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1, (RegExp.$1.length == 1)
                ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

render((<Router history={hashHistory}>
	<Route path="/" component={LoginPage}/>
	<Route path="/login" component={LoginPage}/>
	<Route path="/dashboard" component={PageContainer}></Route>
	<Route path="/site-list" component={SiteList}></Route>
	<Route path="/alarm" component={Alarm}></Route>
</Router>), document.getElementById('app'))
