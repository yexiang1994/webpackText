import { uploadFileUrl, serverLocation, placeholderUrl } from "./common-values"
import {toggleAlert} from "./common-actions";
// import { clearTimeout } from "timers";
var debounceTimer;
const CommonUtils = {
    nextUrl: "",
    setNextUrl: function (nextUrlIn) {
        nextUrl = nextUrlIn;
    },
    adjustLoginForm: function () {
        var height = window.innerHeight;
        var formheight = $("#login").height();
        var newheight = (height - formheight) / 2;
        $('#login').css('margin-top', +newheight + 'px');

        if ($('#login #user_login').length) {
            var d = document.getElementById('user_login');
            d.focus();
        }
    },
    doJsonPost: function (url, data) {
        
        return new Promise(function (resolve, reject) {
            $.ajax({
                headers: {
                    'Authorization': CommonUtils.getCookie("authenJWT")
                },
                url: url,
                type: 'post',
                data: JSON.stringify(data),
                contentType: 'application/json;charset=UTF-8;',
                mimeType: 'application/json',
                async: true,
                success: function (msg) {
                    resolve(msg);
                },
                error: function (msg) {
                    reject(msg);
                }
            });
        });
    },
	doJsonPostWithTempToken: function (url, data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                headers: {
                    'Authorization': CommonUtils.getCookie("authenJWT"),
	                'tempToken':"de455752b4652f7fa5e4c0d36bcb25c6"
                },
                url: url,
                type: 'post',
                data: JSON.stringify(data),
                contentType: 'application/json;charset=UTF-8;',
                mimeType: 'application/json',
                async: true,
                success: function (msg) {
                    resolve(msg);
                },
                error: function (msg) {
                    reject(msg);
                }
            });
        });
    },
    setCookie: function (name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
	deleteCookie:function (name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=this.getCookie(name);
		if(cval!=null){
			document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		}
	},
    initLayout: function () {
        var width = window.innerWidth;

        if ($("body").hasClass("chat-open") || $("body").hasClass("sidebar-collapse")) {

            CommonUtils.mainmenuCollapsed();

        } else if (width < 1025) {
            // small window
            $(".page-topbar").addClass("sidebar_shift").removeClass("chat_shift");
            $(".page-sidebar").addClass("collapseit").removeClass("expandit");
            $("#main-content").addClass("sidebar_shift").removeClass("chat_shift");
            $(".page-chatapi").removeClass("showit").addClass("hideit");
            $(".chatapi-windows").removeClass("showit").addClass("hideit");
            CommonUtils.mainmenuCollapsed();
        } else {
            // large window
            $(".page-topbar").removeClass("sidebar_shift chat_shift");
            $(".page-sidebar").removeClass("collapseit chat_shift");
            $("#main-content").removeClass("sidebar_shift chat_shift");
            CommonUtils.mainmenuScroll();
        }
    },
    mainmenuCollapsed: function () {
        if ($(".page-sidebar.chat_shift #main-menu-wrapper").length > 0 || $(".page-sidebar.collapseit #main-menu-wrapper").length > 0) {
            var topbar = $(".page-topbar").height();
            var windowheight = window.innerHeight;
            var minheight = windowheight - topbar;
            var fullheight = $(".page-container #main-content .wrapper").height();

            var height = fullheight;

            if (fullheight < minheight) {
                height = minheight;
            }

            $('#main-menu-wrapper').perfectScrollbar('destroy');

            $('.page-sidebar.chat_shift #main-menu-wrapper .wraplist, .page-sidebar.collapseit #main-menu-wrapper .wraplist').height(height);

            /*hide sub menu of open menu item*/
            $("li.open .sub-menu").attr("style", "");

        }
    },
    mainmenuScroll: function () {

        var topbar = $(".page-topbar").height();
        var projectinfo = $(".project-info").innerHeight();

        var height = window.innerHeight - projectinfo;

        $('#main-menu-wrapper').height(height);
        $("#main-menu-wrapper .wraplist").height('auto');


        /*show first sub menu of open menu item only - opened after closed*/
        // > in the selector is used to select only immediate elements and not the inner nested elements.
        $("li.open > .sub-menu").attr("style", "display:block;");
    },
    buildUploadParam: function (dispatch, callback) {
        var options = {
            baseUrl: uploadFileUrl,
            chooseAndUpload: true,
            multiple: false,
            fileFieldName: "file",
            uploadSuccess: function (resp) {
                dispatch(callback(resp));
            },
            uploadError: function (err) {
            },
            uploadFail: function (resp) {
            },
            beforeChoose: function () {
            }
        }
        return options;
    },
    buildModalUploadParam: function (url, callback, inProgress) {
        var options = {
            baseUrl: url,
            chooseAndUpload: true,
            multiple: false,
            fileFieldName: "file",
            uploadSuccess: function (resp) {
                callback(resp);
            },
            uploadError: function (err) {
            },
            uploadFail: function (resp) {
            },
            beforeChoose: function () {
            },
            uploading(progress) {
                if (inProgress != null) {
                    inProgress(progress);
                }
            }
        }
        return options;
    },
    resloveUrl(url) {
        if (url == null || url == "") {
            return placeholderUrl;
        } else {
            return serverLocation + url;
        }

    },
    resolveOrderParam: function (commonData, orderBy) {
        if (orderBy == null || orderBy == "") {
            return {
                orderBy: commonData.orderBy,
                orderDirection: commonData.orderDirection
            }
        } else if (commonData.orderBy == null
            || commonData.orderBy == ""
            || commonData.orderBy != orderBy) {
            return {
                orderBy,
                orderDirection: "desc"
            }
        } else {
            if (commonData.orderDirection == "desc") {
                return {
                    orderBy: orderBy,
                    orderDirection: "asc"
                }
            } else {
                return {
                    orderBy: orderBy,
                    orderDirection: "desc"
                }
            }
        }
    },
    resolveFormData(formData, scope, name, defaultValue) {
        if (
            formData[scope] != null
            && formData[scope][name] != null
            && formData[scope][name] != "") {
            return formData[scope][name];
        } else {
            return defaultValue;
        }
    },
    replaceRecord(list, record) {
        if (list == null) {
            return list;
        } else {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id == record.id) {
                    list[i] = record;
                    return list;
                }
            }
        }
    },
    replaceDataRecord(listData, record) {
        if (listData == null || listData.results == null) {
            return listData;
        } else {
            let list = listData.results;
            for (let i = 0; i < list.length; i++) {
                if (list[i].id == record.id) {
                    list[i] = record;
                }
            }
            listData.results = list;
            return listData;
        }
    },
    genHref(path) {
        return "/SurveillanceProject/admin/#/" + path;
    },
    checkEmail(str) {
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (reg.test(str)) {
            return true;
        }
        return false;
    },
    timestampToTime(timestamp, type = 'YY-MM-DD hh:mm:ss') {
        let date;
        !timestamp ? date = new Date(timestamp) : date = new Date(timestamp);
        let reg = /([a-zA-Z])+/g
        let arr = type.match(reg)
        let char = /([^a-zA-Z0-9])/g
        let charDate = type.match(char)
        let times = {}
        times.Y = date.getFullYear()
        times.M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
        times.D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
        times.h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
        times.m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
        times.s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
        let reback = ''
        arr.map((val, index) => {
            let str = val.substring(0, 1)
            reback += `${times[str]}${charDate && charDate[index] ? charDate[index] : ''}`
        })
        return reback;
    },
    timesToString(time) {
        let times = new Date(time);
        return times.getTime()
    },
    debounce(fn, time) {
        return function () {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => {
                fn()
            }, time)
        }
    },
	initDropifyPlugin(componentThis){
		const _this=componentThis;
		let select = $('#input-file');
		select.on("change", function () {
			var obj = document.getElementById("input-file");
			let dataArray = Array.from(obj.files);
			_this.setState({img:dataArray});
			//预览
			let objImg=[],count=0;
			for (let i = 0;i<dataArray.length;i++){
				if (window.FileReader) {
					let reader = new FileReader();
					reader.readAsDataURL(dataArray[i]);
					reader.onloadend = function (e) {
						let URL = window.URL || window.webkitURL;
						let imgs = URL.createObjectURL(dataArray[i]);
						objImg.push(imgs);  //to src
						count++;
						if(count===dataArray.length){
							_this.setState({preImg:objImg})
						}
					}
				}
			}
		});
	},
	uploadImage(url, fileUri){
    	let _this = this;
		let data = new FormData();
		data.append('file', fileUri);
		return new Promise(function (resolve, reject) {
			$.ajax({
				headers: {'Authorization': _this.getCookie("authenJWT")},
				url: url,type: 'post', data, dataType: 'JSON',
				cache: false, processData: false, contentType: false,async:false,
				success: function (msg) {resolve(msg);},
				error: function (msg) {reject(msg);}
			});
		});
	},
	handleCheckRequireField(componentProps,formDataScope,types){
		const {dispatch, formData} = componentProps;
		let submitData = formData[formDataScope];
		for (let i = 0; i < types.length; i++) {
			let field = types[i];
			if(field.require){
				if (!submitData[field.name]) {
					dispatch(toggleAlert(`${field.value}不能为空`, 'warning'));
					return false;
				}
			}
			//类型检查 number 不能未负数
			if (submitData[field.name]) {
				if("number"===field.type && submitData[field.name] < 0){
					dispatch(toggleAlert(`${field.value}不能小于0`, 'warning'));
					return false;
				}
			}
		}
		return true;
    },
	getUUID(){
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";
		var uuid = s.join("");
		return uuid;
	},
	activeSideBar(sidebarItemName){
		$("#sidebarnav li a").each(function (idx,item) {
			if($(item).text().indexOf(sidebarItemName)!==-1){
				$(item).siblings().removeClass("active");
				$(item).addClass("active");
			}
		});
	}
};
export default CommonUtils;
