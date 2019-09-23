// 线上地址
const serverLocation = "http://surveillance.huile.me:8083/SurveillanceProject/";


//Staging URL
// const serverLocation = "http://www.huile.me:8170/SurveillanceProject/"

// const serverLocation = "http://10.168.3.218:8080/SurveillanceProject/"

//Local URL
// const serverLocation = "http://localhost:8080/SurveillanceProject/"


// export const webSocketServer = "ws://www.huile.me:6030";
export const webSocketServer = "ws://www.huile.me:6030"

//Production URL
export const formsUrlPrefix = "http://surveillance.huile.me:59975/";
export const workCaseUrlPrefix = 'http://surveillance.huile.me:59973/';
export const adminRegisterPrefix = 'http://surveillance.huile.me:59977/';
export const surveillanceAssistPrefix = "http://surveillance.huile.me:59963/";
export const capturePrefix = "http://surveillance.huile.me:8083/SurveillanceProject/capture/"
export const uploadPrefix = "http://surveillance.huile.me:8083/SurveillanceProject/capture/"  // 上传的

//Staging URL
// export const formsUrlPrefix = "http://www.huile.me:60036/";
// export const workCaseUrlPrefix = 'http://www.huile.me:60034/';
// export const adminRegisterPrefix = 'http://www.huile.me:60032/';
// export const surveillanceAssistPrefix = "http://www.huile.me:59036/";
// export const capturePrefix = "http://surveillance.huile.me:8083/SurveillanceProject/capture/"
// export const uploadPrefix = "http://www.huile.me:8170/SurveillanceProject/capture/"  // 上传的

export const uploadImg = serverLocation + "data/upload.htm"
export const imgAccessUrl = serverLocation + "capture/"

// 散点图接口测试
export const assertGetTopVpr = surveillanceAssistPrefix + "site/get-top-vpr";
// warning 的转成工单
export const createWarningCase=  surveillanceAssistPrefix + "warning/create-warning-case"
export const pushWarningCase= surveillanceAssistPrefix + "warning/push-upper-level"

export const getWarningDetail = serverLocation + "warning/getWarningDetail.htm"
//Local URL
// export const formsUrlPrefix = 'http://localhost:60036/';
// export const workCaseUrlPrefix = 'http://localhost:59973/';
// export const adminRegisterPrefix = 'http://localhost:60032/';


export const downloadReportLocation = "http://surveillance.huile.me:8083";
export const geoTotalStatistic = surveillanceAssistPrefix + "total-statistic";
export const getSiteReport = surveillanceAssistPrefix + "site-report";
export const getWarningStatistic = surveillanceAssistPrefix + "warning/get-warning-statistic";
export const getCaseStatistic = workCaseUrlPrefix + "statistic/get-case-statistic";
export const geoStationDetail = serverLocation+"bim/get-station-detail.htm";
export const geoStaffPostion = serverLocation+"gps/get-geographic-staff-position.htm";

export const geoTotalCaseStatistic = workCaseUrlPrefix + "statistic/get-total-case-statistic";
export const geoTotalWarningStatistic = surveillanceAssistPrefix + "warning/get-total-warning-statistic";


// export const capturePrefix = "/SurveillanceProject/capture/"
// export const capturePrefix = "http://www.huile.me:8170/SurveillanceProject/capture/"



export const unreachableImageUrl = "/SurveillanceProject/admin/assets/images/unreachable.jpg"

//User related
export const loginUrl = serverLocation + "user/login.htm"
export const registerUrl = serverLocation + "user/register.htm"
export const registerAdminUrl = adminRegisterPrefix + "user/admin-register"
export const getUserSessionUrl = serverLocation + "user/getUserSession.htm"

//Site related
export const getSiteListUrl = serverLocation + "site/getSiteList.htm"
export const getSiteDetailUrl = serverLocation + "site/getSiteDetail.htm"
export const updateSiteDetailUrl = serverLocation + "site/updateSiteInfo.htm"
export const getSiteDataUrl = serverLocation + "site-data/getSiteData.htm"
export const getRandmonSiteDataUrl = serverLocation + "site-data/getRandomSiteData.htm"
export const getRandomSiteUrl = serverLocation + "site/getRandomSite.htm"
export const getRandomSiteListUrl = serverLocation + "site/getRandomSiteList.htm"
export const getSiteLatestDataUrl = serverLocation + "site-data/getSiteLatestData.htm"
export const createSiteUrl = serverLocation + "site/createSite.htm"

//Device related
export const getDeviceConfigUrl = serverLocation + "device/getControllerConfig.htm"
// 获取站点的设备列表
export const getSiteDeviceListUrl = serverLocation + "device/getSiteDeviceList.htm"
export const listDeviceUrl = serverLocation + "device/listDevices.htm"
export const captureImageUrl = serverLocation + "device/captureImage.htm"

export const deviceStartStreamUrl = "http://surveillance.huile.me:8081/SurveillanceProject/" + "device/startStreaming.htm"

//Capture image related
export const getDeviceCaptureImageListUrl = serverLocation + "captureImage/getCameraImageList.htm"

//Statistic Related
export const getDashboardStatisticUrl = serverLocation + "statistic/getDashboardStatistic.htm"

// user
export const getUserListUrl = serverLocation + "user/getUserList.htm"
export const getStaffGPSTIMESTRUrl = workCaseUrlPrefix + "gps/get-time-str"
export const getStaffGPSUrl = workCaseUrlPrefix + "gps/admin-get-staff-gps"
// 更改用户角色
export const getChangeUserRoleUrl = serverLocation + 'user/changeUserRole.htm'
// 更新用户信息
export const getUpdateUserInfoUrl = serverLocation + 'user/updateUserInfo.htm'
// 报警用户列表
export const getGetWarningListUrl = serverLocation + 'warning/getWarningList.htm'
// 获取用户信息
// export const getUserSessionUrl = serverLocation + 'user/getUserSession.htm'
// 更改站点状态
export const getChangeSiteStateUrl = serverLocation + 'site/changeSiteState.htm'
// 更改报警状态
export const getChangeWarningStateUrl = serverLocation + 'warning/changeWarningState.htm'
// 获取所有站点
export const getGeoSiteList = serverLocation + 'site/getGeoSiteList.htm'
// 获取在线摄像头列表
export const getOnlineCameraListUrl = serverLocation + 'device/getOnlineCameraList.htm'
// 创建设备
export const getCreateDeviceUrl = serverLocation + 'device/createDevice.htm'
// 更新站点状态
export const getUpdateDeviceStateUrl = serverLocation + 'device/updateDeviceState.htm'
export const getOperateRecordUrl = serverLocation + "actionRecord/getActionRecordList.htm"

//站点调试列表
export const siteDebuggerListUrl = serverLocation + "site/getDebuggerSiteList.htm"
//截图
export const screenshotUrl = "http://surveillance.huile.me:[port]/static/";
//控制台
export const consoleUrl = "http://118.31.43.15:[port]";

//获取报表管理列表
export const getReportList = serverLocation + 'report/getReportList.htm';

//获取可选日期
export const getDateReportList = serverLocation + 'report/getStrList.htm';

export const getLast24HourUrl = serverLocation + 'report/getLast24Hour.htm';
export const getLast30DayUrl = serverLocation + 'report/getLast30Day.htm';
export const getLast12MonthUrl = serverLocation + 'report/getLast12Month.htm';

export const getSiteData = serverLocation + 'site-data/getSiteData.htm';

export const listDashboardCamerasUrl = 'http://surveillance.huile.me:8083/SurveillanceProject/device/listDashboardCameras.htm';

export const getGeographicFullscreenTop = serverLocation + "statistic/getGeographicFullscreenTop.htm"
export const getGeographicSiteData = serverLocation + "statistic/getGeographicSiteData.htm"
export const getGeographicFullscreenStat = serverLocation + "statistic/getGeographicFullscreenStat.htm"
export const getListMaintainRecord = serverLocation + "maintain/listMaintainRecord.htm"

//下载report
export const downloadReportUrl = serverLocation + "report/exportReport.htm"

//forms
export const addInspectionUrl = formsUrlPrefix + "add-inspection";
export const addMaintainUrl = formsUrlPrefix + "add-maintain";
export const addDeviceMaintainUrl = formsUrlPrefix + "add-device-maintain";
export const addFacilityMaintainUrl = formsUrlPrefix + "add-facility-maintain";
export const addStatisticalUrl = formsUrlPrefix + "add-statistical";
export const addInspectionMaintainRecord = formsUrlPrefix + "add-inspection-maintain-record";
export const addFactoryMaintainUrl = formsUrlPrefix + "add-factory-maintain-record";
export const addWaterQualityUrl = formsUrlPrefix + "add-water-quality";
export const addAssayUrl = formsUrlPrefix + "forms/add-assayDay";
export const addFacilityInspectionUrl = formsUrlPrefix + "forms/add-facility-inspection";
//forms lists
export const getInspectionList = formsUrlPrefix + "forms/get-inspection-list";
export const getMaintainList = formsUrlPrefix + "forms/get-maintain-list";
export const getDeviceMaintainList = formsUrlPrefix + "forms/get-device-maintain-list";
export const getFacilityMaintainList = formsUrlPrefix + "forms/get-facility-maintain-list";
export const getStatisticalList = formsUrlPrefix + "forms/get-statistical-list";
export const getInspectionMaintainList = formsUrlPrefix + "forms/get-inspection-maintain-list";
export const getFactoryMaintainList = formsUrlPrefix + "forms/get-factory-maintain-list";
export const getWaterQualityList = formsUrlPrefix + "forms/get-water-quality-list";
export const getAssayList = formsUrlPrefix + "forms/get-assayDay-list";
export const getFacilityInspectionList = formsUrlPrefix + "forms/get-facility-inspection-list";

export const getFormImages = formsUrlPrefix + "image/getImageList";
//forms users
export const getUserList = formsUrlPrefix + "users/inspection";
export const getMaintainUserList = formsUrlPrefix + "users/maintain";
export const getStatisticalUserList = formsUrlPrefix + "users/statistical";
export const getDeviceUserList = formsUrlPrefix + "users/device-maintain";
export const getFacilityUserList = formsUrlPrefix + "users/facility-maintain";
export const getInspecMaintainUserList = formsUrlPrefix + "users/inspection-maintain";
export const getFactoryMaintainUserList = formsUrlPrefix + "users/factory-maintain";

// 审核
export const getVerifyForm = formsUrlPrefix  + "forms/verify-form"
//forms get detail and update
export const getInspecDetail = formsUrlPrefix + "detail/inspection";
export const updateInspec = formsUrlPrefix + "update/inspection";

export const getMaintainDetail = formsUrlPrefix + "detail/maintain";
export const updateMaintain = formsUrlPrefix + "update/maintain";

export const getDeviceDetail = formsUrlPrefix + "detail/device-maintain";
export const updateDevice = formsUrlPrefix + "update/device-maintain";

export const getFacilityDetail = formsUrlPrefix + "detail/facility-maintain";
export const updateFacility = formsUrlPrefix + "update/facility-maintain";

export const getStatisticalDetail = formsUrlPrefix + "detail/statistical";
export const updateStatistical = formsUrlPrefix + "update/statistical";

export const getInspecMaintainDetail = formsUrlPrefix + "detail/inspection-maintain";
export const updateInspecMaintain = formsUrlPrefix + "update/inspection-maintain";

export const getFactoryDetail = formsUrlPrefix + "detail/factory-maintain";
export const updateFactory = formsUrlPrefix + "update/factory-maintain";

export const getWaterQualityDetail = formsUrlPrefix + "detail/water-quality";
export const updateWaterQuality = formsUrlPrefix + "update/water-quality";

export const updateAssay = formsUrlPrefix + "forms/update/assayDay";
export const getAssayDetail = formsUrlPrefix + "forms/detail/assayDay";

export const updateFacilityInspection = formsUrlPrefix + "forms/update/facility-inspection";
export const getFacilityInspectionDetail = formsUrlPrefix + "forms/detail/facility-inspection";

//workCase
export const getAllUserListUrl = workCaseUrlPrefix+"user/get-all-user";
export const DepartmentUrl = workCaseUrlPrefix+"user/get-department-user";
export const VillageUrl = workCaseUrlPrefix+"user/get-village-user";
export const userDetailUrl = workCaseUrlPrefix+"user/get-user-detail";
export const getCaseListUrl = workCaseUrlPrefix+"case/get-case-list";
export const createCaseUrl = workCaseUrlPrefix+"case/create";
export const getCaseDetailUrl = workCaseUrlPrefix+"case/case-detail";
export const confirmCaseUrl = workCaseUrlPrefix+"case/confirm-case";
export const checkSupplierUrl = workCaseUrlPrefix+"case/check-supplier";    //接单人
export const finishCaseUrl = workCaseUrlPrefix+"case/finish-case";
export const cancelCaseUrl = workCaseUrlPrefix+"case/cancel-case";
export const checkUserUrl = workCaseUrlPrefix+"case/check-user";    //发单人
export const assignCaseUrl = workCaseUrlPrefix+"case/assign";



export const siteGetSiteMeta = serverLocation + "site/getSiteMeta.htm"
export const getSiteVillage = serverLocation + "site/getSiteVillage/"

//exports forms
// http://localhost:60036/getStatisticalXLS
export const getInspectionListXLS = formsUrlPrefix + 'getInspectionListXLS';
export const getMaintainXLSById = formsUrlPrefix + 'getMaintainXLSById';
export const getDeviceMaintainXLSById = formsUrlPrefix + 'getDeviceMaintainXLSById';
export const getFacilityMaintainXLSById = formsUrlPrefix + 'getFacilityMaintainXLSById';
export const getStatisticalListXLS = formsUrlPrefix + 'getStatisticalListXLS';
export const getInspectionMaintainXLSById = formsUrlPrefix + 'getInspectionMaintainXLSById';
export const getFactoryMaintainXLSById = formsUrlPrefix + 'getFactoryMaintainXLSById';

export const getAssayDayXLSById = formsUrlPrefix + 'getAssayDayXLS';
export const getFacilityInspectionXLSById = formsUrlPrefix + 'getFacilityInspectionXLSById';

// reset pwd
export const resetUserPwdUrl = serverLocation + "user/reset-password.htm";
export const resetAdminPwdUrl = serverLocation + "user/admin-reset-password.htm";


//FRP 截图
export const getFRPListUrl =  surveillanceAssistPrefix + "FRPList";
export const FRPScreenshotUrl = "http://118.31.43.15:[port]/static/";
export const downloadFRPImageUrl =  surveillanceAssistPrefix + "downloadFRPImage/";

const selfUrl = "http://10.168.3.133:60034/"
// //车辆管理 
// export const createCarUrl = selfUrl + "useCar/create";
// export const getCarListUrl = selfUrl +"useCar/recordList";

 //车辆管理 
export const createCarUrl = workCaseUrlPrefix + "useCar/create";
export const getCarListUrl = workCaseUrlPrefix +"useCar/recordList";

//打卡管理
export const getStaffRecordListUrl = workCaseUrlPrefix +"staffRecord/recordList";
export const createStaffRecordUrl = workCaseUrlPrefix +"staffRecord/create";
export const staffTimeListUrl = workCaseUrlPrefix +"staffRecord/timeList";

//打卡时间
export const getWorkTimeUrl = workCaseUrlPrefix +"wokringTime/getTime";
export const setWorkTimeUrl = workCaseUrlPrefix +"wokringTime/setTime";

//  workCaseUrlPrefix 替换
export const downloadRecordUrl = workCaseUrlPrefix+"staffRecord/download";

// 一体化设备开启关闭接口
export const siteDeviceBooting  = serverLocation + "site/deviceBooting.htm";