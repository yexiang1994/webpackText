import { FORM_CHANGE } from "./common-actions"
import { PAGER_CLICKED } from "./common-actions"
import { LOADING_DATA } from "./common-actions"
import { FINISH_LOADING } from "./common-actions"
import {
	RECEIVE_SESSION_RESULT,
	RESET_SESSION_STATE,
	RECEIVE_LOGOUT,
	MODAL_VISIBLE,
	INIT_STATE,
	RECEIVE_QOUTE_SOURCE_LIST,
	SELECT_QUOTE_SOURCE,
	SHOW_ADD_QOUTE_SOURCE,
	SET_QUOTE_PRODUCT,
	RECEIVE_QUOTE_LIST,
	RECEIVE_UPDATE_QUOTE,
	RECEIVE_PRODUCT_SPEC_LIST,
	SET_QUOTE_SPEC,
	TOGGLEALERTS,
	VALUESTATES,
	VALUESTATES2,
	VALUESTATES3,
	MODULETOGGLE,
	MODULES_TOGGLES,STATEID
} from './common-actions'
import CommonUtils from './common-utils'

const initQuoteData = () => ({
	sourceList: {
		currentPage: 0,
		results: []
	},
	source: {},
	showAdd: false,
	product: {},
	specList: [],
	quoteList: {
		code: -1,
		results: []
	},
	spec: 0
});

// 提示框默认值
function defaultAlert() {
	return {
		// 提示框内容
		title: '',
		// 提示框显示与否
		show: false,
		// 弹框展示的时间默认1000ms
		time: 1000,
		// 弹框默认样式info,success,danger,warninng
		type: 'info'
	}
}

export const quoteData = (state = initQuoteData(), action) => {
	if (action.type == RECEIVE_QOUTE_SOURCE_LIST) {
		return Object.assign({}, state, { sourceList: action.data });
	}
	if (action.type == SELECT_QUOTE_SOURCE) {
		return Object.assign({}, state, { source: action.data });
	}
	if (action.type == SHOW_ADD_QOUTE_SOURCE) {
		return Object.assign({}, state, { showAdd: action.data });
	}
	if (action.type == SET_QUOTE_PRODUCT) {
		return Object.assign({}, state, { product: action.data });
	}
	if (action.type == RECEIVE_QUOTE_LIST) {
		return Object.assign({}, state, { quoteList: action.data });
	}
	if (action.type == RECEIVE_UPDATE_QUOTE) {
		let quoteListData = state.quoteList;
		quoteListData = CommonUtils.replaceDataRecord(quoteListData, action.data.result);
		return Object.assign({}, state, { quoteList: quoteListData });
	}
	if (action.type == RECEIVE_PRODUCT_SPEC_LIST) {
		let specList = action.data.results;
		return Object.assign({}, state, { specList: specList });
	}
	if (action.type == SET_QUOTE_SPEC) {
		return Object.assign({}, state, { spec: action.data });
	}
	return state;
}

const initModalData = () => ({});

export const modalData = (state = initModalData(), action) => {
	if (action.type == MODAL_VISIBLE) {
		let data = {};
		data[action.scope] = {};
		data[action.scope].visible = action.visible;
		return Object.assign({}, state, data);
	}
	return state;
}

export const loading = function (state = {}, action) {
	switch (action.type) {
		case LOADING_DATA:
			var data = {};
			data[action.scope] = true;
			return Object.assign({}, state, data);
		case FINISH_LOADING:
			var data = {};
			data[action.scope] = false;
			return Object.assign({}, state, data);
		default:
			return state;
	}
}

export const sessionData = function (state = {
	session: {}
}, action) {
	if (action.type == RECEIVE_SESSION_RESULT) {
		return Object.assign({}, state, { session: action.data });
	}
	return state;
}

export const formData = (state = {}, action) => {
	if (action.type == INIT_STATE) {
		return {};
	}
	if (action.type == FORM_CHANGE) {
		var column = {};
		column[action.name] = action.value;
		var data = Object.assign({}, state[action.scope], column);
		var newState = {};
		newState[action.scope] = data;
		return Object.assign({}, state, newState)
	} else {
		return state;
	}
}

export const pagerData = function (state = {}, action) {
	if (action.type == PAGER_CLICKED) {
		var column = {
			currentPage: page
		};
		var data = Object.assign({}, state[action.scope], column);
		var newState = {};
		newState[action.scope] = data;
		return Object.assign({}, state, newState);
	} else {
		return state;
	}
}

// 提示框
export const alertDate = function (state = defaultAlert(), action) {
	switch (action.type) {
		case TOGGLEALERTS:
			return action.data
		default:
			return state
	}
}
// 筛选框默认值
export const defaultValue = function (state = {}, action) {
	switch (action.type) {
		case VALUESTATES:
			return action.data
		default:
			return state
	}
}
export const defaultValueUser = function (state = {}, action) {
	switch (action.type) {
		case VALUESTATES2:
			return action.data
		default:
			return state
	}
}
export const defaultValueAssignUser = function (state = {}, action) {
	switch (action.type) {
		case VALUESTATES3:
			return action.data
		default:
			return state
	}
}
// modal框
export const mToggleData = function(state = { toggle: false }, action) {
	switch (action.type) {
		case MODULETOGGLE:
			return action.data
		default:
			return state
	}
}

function defaultDetails() {
	return {
		// 弹窗开关
		toggle: false,
		// 弹窗里面的信息
		dataRows: {},
		// 弹窗标题
		title: '',
		// 哪一个弹窗  details详情  edit编辑
		view: 'details'
	}
}
export const moduleToggle = function(state = defaultDetails(), action) {
	switch (action.type) {
		case MODULES_TOGGLES:
			return action.data
		default:
			return state
	}
}
export const stateId = function (state = {id: ''}, action){
	switch (action.type) {
		case STATEID:
			return action.data
		default:
			return state
	}
}