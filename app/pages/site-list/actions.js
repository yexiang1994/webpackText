export const RECEIVE_SITE_LIST = "RECEIVE_SITE_LIST"
export const CHOOSE_SITE = "CHOOSE_SITE"
export const RECEIVE_CONTROLLER_CONFIG = "RECEIVE_CONTROLLER_CONFIG"
export const MODEL_TOGGLE = 'MODEL_TOGGLE'
export const DEVICE_DATA = 'DEVICE_DATA'
export const CHOOSE_DEVICE = 'CHOOSE_DEVICE'
export const SHOW_SET_MODEL = 'SHOW_SET_MODEL'
export const EDIT_DEFAULT_VALUE ='EDIT_DEFAULT_VALUE'
export const SHOW_EDITS = 'SHOW_EDITS'
export const BEFORE_LINK = 'BEFORE_LINK'
export const SEARCH_LIST = "SEARCH_LIST"
// 创建设备是否展示
export const showModel = (data) => {
    return {
        type: SHOW_SET_MODEL,
        data: data
    }
}
export const beforeLink = (data) =>{
    return {
        type:BEFORE_LINK,
        data
    }
}
export const chooseSite = (data) => ({
    type: CHOOSE_SITE,
    data: data
})

export const chooseDevice = (data) => ({
    type: CHOOSE_DEVICE,
    data: data
})

export const doToggle = (data) => {
    return {
        type: MODEL_TOGGLE,
        data: data
    }
}
export const toggleEdits = (data)=>{
    return {
        type: SHOW_EDITS,
        data: data
    }
} 
export const RECEIVE_CREATE_SITE = "RECEIVE_CREATE_SITE"
export const DEFAULT_VALUE = 'DEFAULT_VALUE'
export const SHOW_CREATE_DEVICE_FORM = 'SHOW_CREATE_DEVICE_FORM'
export const SHOW_DELETE_DEVICE_MODAL = 'SHOW_DELETE_DEVICE_MODAL'

export const doDefaulValue = (data) => {
    return {
        type: DEFAULT_VALUE,
        data: data
    }
}
export const doEditDefaulValue = (data) => {
    return {
        type: EDIT_DEFAULT_VALUE,
        data: data
    }
}
export const searchData=(data)=>{
    return {
        type: SEARCH_LIST,
        data: data
    }
}