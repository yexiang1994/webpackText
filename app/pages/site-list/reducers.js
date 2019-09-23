import { combineReducers } from 'redux'
import {
	RECEIVE_SITE_LIST, CHOOSE_SITE, CHOOSE_DEVICE, RECEIVE_CONTROLLER_CONFIG, MODEL_TOGGLE, DEVICE_DATA,
	RECEIVE_CREATE_SITE, DEFAULT_VALUE,
	SHOW_DELETE_DEVICE_MODAL, SHOW_CREATE_DEVICE_FORM,
	EDIT_DEFAULT_VALUE, SHOW_SET_MODEL,
	SHOW_EDITS,BEFORE_LINK,
	SEARCH_LIST
} from './actions'
import { mToggleData, alertDate, formData,defaultValue } from './../../common-reducers'
import {selectList,stateId} from "../../common-view/form-common/form-reducers";

function initState() {
	return {
		siteList: {
			code: -1,
			results: [],
			pager: {}
		},
		selectedSite: {

		},
		selectedDevice: {

		},
		contollerConfig: {
			code: -1
		},
		deviceData: {
			code: -1,
			results: [],
			pager: {}
		},
		showCreateDeviceForm: false,
		showDeleteDeviceModal: false
	};
}
function siteListData(state = initState(), action) {
	if (action.type == RECEIVE_SITE_LIST) {
		return Object.assign({}, state, { siteList: action.data });
	}
	if (action.type == CHOOSE_SITE) {
		return Object.assign({}, state, { selectedSite: action.data })
	}
	if (action.type == CHOOSE_DEVICE) {
		return Object.assign({}, state, { selectedDevice: action.data })
	}
	if (action.type == RECEIVE_CONTROLLER_CONFIG) {
		return Object.assign({}, state, { contollerConfig: action.data })
	}
	if (action.type == DEVICE_DATA) {
		return Object.assign({}, state, { deviceData: action.data })
	}
	if (action.type == SHOW_CREATE_DEVICE_FORM) {
		return Object.assign({}, state, { showCreateDeviceForm: action.data })
	}
	if (action.type == SHOW_DELETE_DEVICE_MODAL) {
		return Object.assign({}, state, { showDeleteDeviceModal: action.data })
	}
	return state;
}
function modelToggle(state = { view: 'delete' }, action) {
	if (action.type == MODEL_TOGGLE) {
		return action.data
	}
	return state
}

function createSiteData(state = {
	createResult: {
		code: -1,
	}
}, action) {
	if (action.type == RECEIVE_CREATE_SITE) {
		return Object.assign({}, state, { createResult: action.data });
	}
	return state;
}

function showCreateModel(state = false, action) {
	if (action.type == SHOW_SET_MODEL) {
		return action.data
	} else {
		return state
	}
}
function editDefaultValue(state = 'BallCamera', action) {
	if (action.type == EDIT_DEFAULT_VALUE) {
		return action.data
	}
	return state;
}
function showEditValue(state = false, action) {
	if (action.type == SHOW_EDITS) {
		return action.data
	}
	return state;
}
function beforeLink(state={

},action) {
	if (action.type === BEFORE_LINK) {
		return action.data
	}
	return state;
}
function searchList (state = {capacity: [],technology: [],town:[], vendor: [] }, action){
	if(action.type == SEARCH_LIST) {
		return action.data
	}	
	return state
}
const siteListReducer = combineReducers({
	siteListData,
	mToggleData,
	modelToggle,
	createSiteData,
	formData,
	alertDate,
	defaultValue,
	showCreateModel,
	editDefaultValue,
	showEditValue,
	beforeLink,
	selectList,stateId,
	searchList
});


export default siteListReducer;