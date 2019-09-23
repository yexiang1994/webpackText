import { combineReducers } from 'redux'

function initState(){
	return {
	};
}
function pageContainerData(state = initState(),action){
	return state;
}

const pageContainerReducer = combineReducers({
	pageContainerData
});

export default pageContainerReducer;