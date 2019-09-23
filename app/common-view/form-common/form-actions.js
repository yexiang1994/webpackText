export const SITELIST = "SITELIST"
export const STATEID = "STATEID"
export const STATEDETAIL = "STATEDETAIL"
export const PAGE_LIST = 'PAGE_LIST';
export const PAGE_PAGER = 'PAGE_PAGER';
export const PAGE_TITLE = 'PAGE_TITLE';
export const USERLIST = 'USERLIST';
export const USERID = 'USERID';

export const doStateId = (data) => {
	return {
		type: STATEID,
		data
	}
};
export const doUserId = (data) => {
	return {
		type: USERID,
		data
	}
};