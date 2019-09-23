import { combineReducers } from 'redux'
import { formData } from '../../common-reducers'
import { RECEIVE_LOGIN } from './actions'
import { INIT_STATE } from '../../common-actions'

function initState(){
	return {
		loginResult : {
			code : -1
		}
	};
}
function loginPageData(state = initState(),action){
	if(action.type == INIT_STATE){
		return initState();
	}
	if(action.type == RECEIVE_LOGIN){
		return Object.assign({}, state, {loginResult : action.data})
	}
	return state;
}

const loginPageReducer = combineReducers({
	loginPageData, formData
});

export default loginPageReducer;