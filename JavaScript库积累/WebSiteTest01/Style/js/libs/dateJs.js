/*!
 * Created by sevennight on 2016-11-14.
 * dateJs v1.0.0
 * http://www.cnblogs.com/cnsevennight/p/4264384.html , http://www.cnblogs.com/cnsevennight/p/5945092.html
 */
(function (win) {
    /**
     * 方法作用：【格式化时间】
     * 使用方法
     * 示例：
     *      使用方式一：
     *      var now = new Date();
     *      var nowStr = now.dateFormat("yyyy-MM-dd hh:mm:ss");
     *      使用方式二：
     *      new Date().dateFormat("yyyy年MM月dd日");
     *      new Date().dateFormat("MM/dd/yyyy");
     *      new Date().dateFormat("yyyyMMdd");
     *      new Date().dateFormat("yyyy-MM-dd hh:mm:ss");
     * @param {date} format 传入要格式化的日期类型
     * @returns {2015-01-31 16:30:00}
     */
    win.Date.prototype.dateFormat = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    /**
     * 方法作用：【格式化时间】
     * 使用方法：new Date().addDays(-1);
     * 示例：
     * @param {int} days 增加的天数，默认增加1天
     * @returns {2015-01-31}
     */
    win.Date.prototype.addDays = function (days) {
        if (days == undefined || days === '') {
            days = 1;
        }
        var date = new Date(this);
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        //日期月份/天的显示，如果是1位数，则在前面加上'0'
        var getFormatDate=function(arg){
            if (arg == undefined || arg === '') {
                return '';
            }
            var re = arg + '';
            if (re.length < 2) {
                re = '0' + re;
            }
            return re;
        }
        return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
    }

    /***********************************************************************
     *                           日期时间工具类                            *
     *                     注：调用方式，deteUtil.方法名                   *
     * ********************************************************************/
    if (!win.dateUtil) {
        win.dateUtil = {};
    }
    win.dateUtil = {
        /*
         * 方法作用：【取传入日期是星期几】
         * 使用方法：dateUtil.nowFewWeeks(new Date());
         * @param {Date} date 传入日期类型
         * @returns {星期四}
         */
        nowFewWeeks: function (date) {
            if (date instanceof Date) {
                var dayNames = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
                return dayNames[date.getDay()];
            } else {
                return "Param error,date type!";
            }
        },
        /*
         * 方法作用：【字符串转换成日期】
         * 使用方法：dateUtil.strTurnDate("2010-01-01");
         * @param {String} str 字符串格式的日期，传入格式：yyyy-mm-dd(2015-01-31)
         * @return {Date} 由字符串转换成的日期
         */
        strTurnDate: function (str) {
            var re = /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;
            var dt;
            if (re.test(str)) {
                dt = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
            }
            return dt;
        },
        /*
         * 方法作用：【计算2个日期之间的天数】
         * 使用方法：dateUtil.dayMinus(startDate,endDate);
         * @param {Date} startDate 起始日期yyyy-mm-dd(2015-01-31)
         * @param {Date} endDate 结束日期yyyy-mm-dd(2015-01-31)
         * @return {} endDate - startDate的天数差
         */
        dayMinus: function (startDate, endDate) {
            if (startDate instanceof Date && endDate instanceof Date) {
                var days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
                return days;
            } else {
                return "Param error,date type!";
            }
        },
        /**
         * 判断是否为闰年 
         * @param {Date} date 时间
         * @returns {Boolean} 能被4整除并且不能被100整除或者能被400整除的年份是闰年
         */
        isLeapYear: function(date) {
            var flag = false;
            if ((date.getYear() % 4 === 0 && date.getYear() % 100 !== 0)
                    || (date.getYear() % 400 === 0)) {
                flag = true;
            }
            return flag;
        }
    };
})(window)