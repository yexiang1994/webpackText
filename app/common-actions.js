import CommonUtils from './common-utils'

export const FORM_CHANGE = "FORM_CHANGE";
export const PAGER_CHANGED = "PAGER_CHANGED"
export const RECEIVE_DATA = "RECEIVE_DATA";
export const START_FETCHING = "START_FETCHING";
export const LOADING_DATA = "LOADING_DATA";
export const FINISH_LOADING = "FINISH_LOADING";
export const RECEIVE_SESSION_RESULT = "RECEIVE_SESSION_RESULT";
export const RESET_SESSION_STATE = "RESET_SESSION_STATE";
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT";
export const MODAL_VISIBLE = "MODAL_VISIBLE";
export const INIT_STATE = "INIT_STATE"
export const RECEIVE_QOUTE_SOURCE_LIST = "RECEIVE_QOUTE_SOURCE_LIST"
export const SELECT_QUOTE_SOURCE = "SELECT_QUOTE_SOURCE"
export const SHOW_ADD_QOUTE_SOURCE = "SHOW_ADD_QOUTE_SOURCE"
export const SET_QUOTE_PRODUCT = "SET_QUOTE_PRODUCT"
export const RECEIVE_CREATE_QUOTE = "RECEIVE_CREATE_QUOTE"
export const RECEIVE_QUOTE_LIST = "RECEIVE_QUOTE_LIST"
export const RECEIVE_UPDATE_QUOTE = "RECEIVE_UPDATE_QUOTE"
export const RECEIVE_PRODUCT_SPEC_LIST = "RECEIVE_PRODUCT_SPEC_LIST"
export const SET_QUOTE_SPEC = "SET_QUOTE_SPEC"
export const MODULES_TOGGLES = "MODULES_TOGGLES"

export const STATEID = "STATEID"
export const SITELIST = "SITELIST"
// 提示框
export const TOGGLEALERTS = 'TOGGLEALERTS'
// select
export const VALUESTATES = 'VALUESTATES'
export const VALUESTATES2 = 'VALUESTATES2'
export const VALUESTATES3 = 'VALUESTATES3'
//
export const MODULETOGGLE = 'MODULETOGGLE'

export const commonWarning = (msg) => (dispatch) => {
	alert(msg);
}

export const setQuoteSpec = (data) => ({
	type : SET_QUOTE_SPEC,
	data : data
})

export const selectQuoteSource = (data) => ({
	type : SELECT_QUOTE_SOURCE,
	data : data
})

export const setQuoteProduct = (data) => ({
	type : SET_QUOTE_PRODUCT,
	data : data
})

export const showAddQuoteSource = (data) => ({
	type : SHOW_ADD_QOUTE_SOURCE,
	data : data
})

export const initState = () => ({
	type : INIT_STATE
})

export const modalVisible = (scope, visible) => ({
	type : MODAL_VISIBLE,
	scope : scope,
	visible : visible
})

export const generalFetchAction = (actionType, successMethod) => (json) => (dispatch) => {
	if(json.code == 0){
		if(successMethod == null){
			dispatch({
				type : actionType,
				data : json
			});
		}else{
			successMethod(json);
		}
	}else{
		dispatch({
			type : actionType,
			data : json
		});
	}
}

export const generalModalFetchAction = (actionType, scope, moreAction) => (json) => (dispatch) => {
	if(json.code == 0){
		dispatch({
			type : actionType,
			data : json
		});
		dispatch(modalVisible(scope, false));
		if(moreAction != null){
			moreAction();
		}
	}else{
		alert("Error : " + json.message);
	}
}

export const receiveLogout = (json) => ({
	type : RECEIVE_LOGOUT,
	data : json
});

export const checkUserSession = function(dispatch, sessionUrl){
	dispatch(fetchJson(
		sessionUrl,
		{},
		"login",
		receiveSessionResult
	));
}

export const receiveSessionResult = function(json){
	return {
		type : RECEIVE_SESSION_RESULT,
		data : json
	}
}

export const resetSessionState = function(){
	return {
		type: RESET_SESSION_STATE
	}
}

export const formChange = function(scope, name, value){
	return {
		type : FORM_CHANGE,
		scope : scope,
		name : name,
		value : value
	}
};

export const pagerClicked = (scope, page, relatedAction)=> dispatch =>{
	dispatch(relatedAction(scope, page));
	dispatch(pagerChanged(scope, page));
}

export const loadingData = function(scope){
	return {
		type : LOADING_DATA,
		scope : scope
	}
}

export const finishLoading = function(scope){
	return{
		type : FINISH_LOADING,
		scope : scope
	}
}

export const fetchJson = (url, data, loadingScope, callbackAction) => dispatch => {
	dispatch(loadingData(loadingScope));
	CommonUtils.doJsonPost(url, data).then(response => {
		dispatch(finishLoading(loadingScope));
		dispatch(callbackAction(response));
	})
	.catch(res=> {
		let data = new Date()
		let time = CommonUtils.timestampToTime(data, 'YY-MM-DD')
		dispatch(toggleAlert(`${time}: 错误500，请联系管理员`, 'success'))
		dispatch(callbackAction(null));
	})
}

export const fetchGet = (url, data, loadingScope, callbackAction) => dispatch => {
	dispatch(loadingData(loadingScope));
	CommonUtils.doGet(url, data).then(response => {
		dispatch(finishLoading(loadingScope));
		dispatch(callbackAction(response));
	});
}

export const pagerChanged = function(scope, page){
	return {
		type : PAGER_CHANGED,
		scope : scope,
		page : page
	}
}

// 切换提示框
export const toggleAlert = (title, type, check, time) => {
	let data = {
		title: title ? title:'',
		show: true,
		type: type ? type:'success',
		time: time ? time:null
	}
	if (check !== undefined) {
		data.show = check
	}
	return { type: TOGGLEALERTS, data: data}
}

// 默认选中的值
export const valueState = function(data) {
  return {
    type : VALUESTATES,
    data
  }
}
// 默认选中的值
export const valueStateUser = function(data) {
	return {
		type : VALUESTATES2,
		data
	}
}
export const valueStateAssignUser = function(data) {
	return {
		type : VALUESTATES3,
		data
	}
}

// 切换modal框
export const doModleToggle = (data) => {
	return { type: MODULETOGGLE, data: data }
}
export const modleToggle = (data) => {
	return { type: MODULES_TOGGLES, data: data}
}