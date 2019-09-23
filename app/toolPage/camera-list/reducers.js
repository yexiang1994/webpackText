import { combineReducers } from 'redux'
import {RECEIVE_CAMERA_LIST} from './actions'
import { alertDate } from './../../common-reducers';
function initState(){
	return {
		cameraList : {
			code : -1,
			pager: {},
			results : []
		}
	};
}
function cameraListData(state = initState(),action){
	if(action.type == RECEIVE_CAMERA_LIST){
		return Object.assign({}, state, {cameraList : action.data});
	}
	return state;
}

const cameraListReducer = combineReducers({
	cameraListData,
	alertDate
});

export default cameraListReducer;