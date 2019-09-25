import React from 'react'
import ReactDom from 'react-dom'
// import {Link} from 'react-router'
import {Router, Route, hashHistory } from 'react-router';
// import LoginPage from './pages/loginPage'
// import DashboardPage from './pages/container'
// import './pages/style/style.scss'
// import "core-js/modules/es.promise";
// import "core-js/modules/es.array.iterator";
// import Loadable from 'react-loadable';
import Loading from './pages/loading'
// import pa from './test/a'
// import pb from './test/b'
import {pa,pb} from './inx'

console.log(pa);

// const DashboardPageLoad = loadable(()=> import('./pages/container'))
// console.log(DashboardPageLoad, "DashboardPageLoad");

// async function getComponent() {
// 	return await import("./pages/container/index.js")
// }
// new Promise.all(getComponent)


// ReactDom.render((<Router history={hashHistory}>
// 	<Route path="/" component={LoginPage}/>
// 	<Route path="/login" component={LoginPage}/>
// 	<Route path="/dashboard" component={pa}></Route>
// </Router>), document.getElementById('app'))

// const pa = Loadable({
// 	loader: ()=> import('./test/a.js'),
// 	loading: Loading
// })
// const pb = Loadable({
// 	loader: ()=> import('./test/b.js'),
// 	loading: Loading
// })

ReactDom.render((<Router history={hashHistory}>
	<Route path="/" component={pa}/>
	<Route path="/login" component={pa}/>
	<Route path="/dashboard" component={pb}></Route>
	<Route path="/Loading" component={Loading}></Route>
	
</Router>), document.getElementById('app'))

// export default class App extends Component{
	
// 	render() {
// 	    return (
//             <div>
//                 <pa/>
// 				<pb/>
//             </div>
// 	    )
// 	}
// }

// ReactDom.render((<div>
// 	<pa></pa>
// <hr/>
// </div>), document.getElementById('app'))
