import {combineReducers} from 'redux';
import { PAGELIST, SITELIST, STATEID, CHOOSE_SITE,CHOOSE_WARNING_SITE,GET_FIRST_IMG,GET_STATION_NUMBER } from './actions';
import {defaultValue, mToggleData, alertDate} from './../../common-reducers';
import {MODEL_TOGGLE} from "../site-list/actions";
function defaultList() {
    return { code: -1, results: [], pager: {}}
}
function alarmList(state = defaultList(), action) {
    switch (action.type) {
        case PAGELIST:
            return action.data
        default:
            return state
    }
}
function selectList(state = defaultList(), action) {
    switch (action.type) {
        case SITELIST:
            return action.data
        default:
            return state
    }
}

function stateId(state = {id: ''}, action){
    switch (action.type) {
        case STATEID:
            return action.data
        default:
            return state
    }
}
function siteState(state={}, action) {
    switch (action.type) {
        case CHOOSE_SITE:
            return action.data
        default:
            return state
    }
}
function modelToggle(state = { view: 'close' }, action) {
	if (action.type === MODEL_TOGGLE) {
		return action.data
	}
	return state
}
function warningSite(state = {}, action) {
	if (action.type === CHOOSE_WARNING_SITE) {
		return action.data
	}
	return state
}
function currentImg(state = null, action) {
	if (action.type === GET_FIRST_IMG) {
		return action.data
	}
	return state
}
function stationNumber(state = -1, action) {
	if (action.type === GET_STATION_NUMBER) {
		return action.data
	}
	return state
}
const dataReducer = combineReducers({
    alarmList,
    selectList,
    defaultValue,
    stateId,
    mToggleData,
	modelToggle,
    alertDate,
    siteState,
	warningSite,
	currentImg,
	stationNumber
})

export default dataReducer
