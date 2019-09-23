import { combineReducers } from 'redux'
import {PAGE_LIST, PAGE_PAGER, PAGE_TITLE, SITELIST, STATEDETAIL, STATEID, USERID, USERLIST} from "./form-actions";
import {alertDate, defaultValue, formData} from "../../common-reducers";

function defaultState() {
	return { code: -1, results: [], pager: {}}
}
function defaultStateWithResult() {
	return { code: -1, result: [], pager: {}}
}

export const stateId = function(state = {id: ''}, action){
	switch (action.type) {
		case STATEID:
			return action.data;
		default:
			return state
	}
};

export const selectList = function (state = defaultState(), action) {
	switch (action.type) {
		case SITELIST:
			return action.data;
		default:
			return state
	}
};

export const siteDetail = function(state = defaultStateWithResult(), action){
	switch (action.type) {
		case STATEDETAIL:
			return action.data;
		default:
			return state
	}
};

export const userList = function (state = defaultState(), action) {
	switch (action.type) {
		case USERLIST:
			return action.data
		default:
			return state
	}
};
export const userId = function (state = {id: ''}, action){
	switch (action.type) {
		case USERID:
			return action.data
		default:
			return state
	}
};

export const siltData = function (state = defaultState(), action) {
	switch (action.type) {
		case PAGE_LIST:
			return Object.assign({}, state, action.data)
		case PAGE_PAGER:
			return Object.assign({}, state, action.data)
		case PAGE_TITLE:
			return Object.assign({}, state, action.data)
		default:
			return state
	}
};

const Reducer = combineReducers({
	formData, alertDate,
	selectList,
	defaultValue,stateId,siteDetail
});

export default Reducer;