import {MODEL_TOGGLE} from "../site-list/actions";

export const PAGELIST = 'PAGELIST';
export const STATION = 'STATION';
export const SITELIST = 'SITELIST';
export const STATEID = 'STATEID';
export const CHOOSE_SITE = "CHOOSE_SITE"
export const CHOOSE_WARNING_SITE = "CHOOSE_WARNING_SITE"
export const GET_FIRST_IMG = "GET_FIRST_IMG"
export const GET_STATION_NUMBER = "GET_STATION_NUMBER"
// export const VALUESTATES = 'VALUESTATES';

// 站点
export const setSelectList = (data)=> {
    return {
        type: SITELIST,
        data
    }
}
export const doStateId = (data) => {
    return {
        type: STATEID,
        data
    }
}

export const chooseSite = (data) => {
    return {
        type: CHOOSE_SITE,
        data
    }
}
export const chooseWarningSite = (data) => {
	return {
		type: CHOOSE_WARNING_SITE,
		data
	}
}
export const setFirstImg = (data) => {
	return {
		type: GET_FIRST_IMG,
		data
	}
}
export const setStationNumber = (data) => {
	return {
		type: GET_STATION_NUMBER,
		data
	}
}
export const doToggle = (data) => {
	return {
		type: MODEL_TOGGLE,
		data: data
	}
}
