import { combineReducers } from 'redux'
import {
	RECEIVE_DASHBOARD_STATISTICS,
	RECEIVE_RANDOM_SITE_DATA,
	RECIEVE_RANDOM_SITE_LIST,
	RECIEVE_RANDOM_SITE_SINGLE,
	RECEIVE_SITE_DEVICE_LIST,
	STATIC_STATE_DATA
} from './actions'
import { alertDate } from './../../common-reducers';
function initState() {
	return {
		statistics: {
			code: -1,
			result: {}
		},
		randomSiteData: {
			code: -1,
			results: []
		},
		randomSiteList: {
			code: -1,
			results: []
		},
		randomSiteSingle: {
			code: 0,
			message: "",
			result: {}
		},
		deviceList: {
			code: -1,
			results: []
		}
	};
}
function dashboardData(state = initState(), action) {
	if (action.type == RECEIVE_DASHBOARD_STATISTICS) {
		return Object.assign({}, state, { statistics: action.data });
	}
	if (action.type == RECEIVE_RANDOM_SITE_DATA) {
		return Object.assign({}, state, { randomSiteData: action.data });
	}
	if (action.type == RECIEVE_RANDOM_SITE_LIST) {
		return Object.assign({}, state, { randomSiteList: action.data });
	}
	if (action.type == RECIEVE_RANDOM_SITE_SINGLE) {
		return Object.assign({}, state, { randomSiteSingle: action.data });
	}
	if (action.type == RECEIVE_SITE_DEVICE_LIST) {
		return Object.assign({}, state, { deviceList: action.data });
	}
	return state;
}
function staticPieData(state = {
	code: -1,
	result: {}
}, action) {
	if (action.type == STATIC_STATE_DATA) {
		return Object.assign({}, state, action.data );
	}
	return state
}
const dashboardReducer = combineReducers({
	dashboardData,
	alertDate,
	staticPieData
});

export default dashboardReducer;