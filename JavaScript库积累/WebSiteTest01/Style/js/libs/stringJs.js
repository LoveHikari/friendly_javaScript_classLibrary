/*!
 * Created by sevennight on 2016-10-31.
 * stringJs v1.0.0
 */
(function (win) {
    /**
    * 方法作用：获取字符串长度 区分中英文, 中文两个字节
    * 使用方法
    * 示例：
    *      使用方式一：
    *      var str = "我爱北京天安门";
    *      var len = str.getBytes();
    *      使用方式二：
    *      "我爱北京天安门".getBytes();
    * @returns {int} 字符串长度
    */
    win.String.prototype.getBytes = function () {
        var cArr = this.match(/[^\x00-\xff]/ig);
        return this.length + (cArr == null ? 0 : cArr.length);
    }
    /**
     * 方法作用：截取字符串长度 区分中英文, 中文两个字节. 超出部分中指定字符串代替
     * 使用方法
     * 示例：
     *      使用方式一：
     *      var s = "我爱北京天安门";
     *      var str = s.cutBytes(2,"...");
     *      使用方式二：
     *      "我爱北京天安门".cutBytes(2,"...");
     * @param {int} strLen 字符串长度
     * @param {string} replaceStr 替代字符串
     * @returns {String} 我爱...
     */
    win.String.prototype.cutBytes = function (strLen, replaceStr) {
        if (this.getBytes(this) <= strLen)
            return this;
        var returnStr = "";
        var tempLen = 0;
        for (var i = 0; i < this.length; i++) {
            var tempChar = this[i].match(/[^\x00-\xff]/ig);
            returnStr += this[i];
            tempLen += tempChar == null ? 1 : 2;
            if (tempLen >= strLen) {
                return i + 1 < this.length ? returnStr + replaceStr : returnStr;
            }
        }
        return "";
    }
    /**
     * 去掉字符串两边的指定字符,默去空格
     * @param {} tag 
     * @returns {} 
     */
    win.String.prototype.trim1 = function (tag) {
        if (!tag) {
            tag = '\\s';
        } else {
            if (tag === '\\') {
                tag = '\\\\';
            } else if (tag === ',' || tag === '|' || tag === ';') {
                tag = '\\' + tag;
            }
        }
        eval('var reg=/(^' + tag + '+)|(' + tag + '+$)/g;');
        return this.replace(reg, '');
    }
    /**
     * 去掉字符串结尾的指定字符,默去空格
     * @param {} tag 
     * @returns {} 
     */
    win.String.prototype.trimEnd = function (tag) {
        if (!tag) {
            tag = '\\s';
        } else {
            if (tag === '\\') {
                tag = '\\\\';
            } else if (tag === ',' || tag === '|' || tag === ';') {
                tag = '\\' + tag;
            }
        }
        eval('var reg=/(' + tag + '+$)/g;');
        return this.replace(reg, '');
    }
    /**
     * 只留下数字(0123456789)
     * @returns {String} 
     */
    win.String.prototype.toNumber = function () {
        return this.replace(/\D/g, "");
    }
    /**
     * 保留中文
     * @returns {String} 
     */
    win.String.prototype.toCN = function () {
        var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
        return this.replace(regEx, "");
    }
    /**
     * 只留下数字并转成int
     * @returns {int} 
     */
    win.String.prototype.toInt = function () {
        var temp = this.replace(/\D/g, "");
        return isNaN(parseInt(temp)) ? this.toString() : parseInt(temp);
    }


    /***********************************************************************
     *                           字符串操作工具类                          *
     *                     注：调用方式，strUtil.方法名                   *
     * ********************************************************************/
    if (!win.strUtil) {
        win.strUtil = {};
    }
    win.strUtil = {
        /*
         * 判断字符串是否为空
         * @param {String} str 传入的字符串
         * @returns {Boolean} 空为true，非空为false
         */
        isEmpty: function (str) {
            if (str != null && str.length > 0) {
                return false;
            } else {
                return true;
            }
        },
        /*
         * 判断两个字符串子否相同
         * @param {String} str1 字符串1
         * @param {String} str2 字符串2
         * @returns {Boolean} 相同为true，不同为false
         */
        isEquals: function (str1, str2) {
            if (str1 === str2) {
                return true;
            } else {
                return false;
            }
        },
        /*
         * 忽略大小写判断字符串是否相同
         * @param {String} str1 字符串1
         * @param {String} str2 字符串2
         * @returns {Boolean} 相同为true，不同为false
         */
        isEqualsIgnorecase: function (str1, str2) {
            if (str1.toUpperCase() === str2.toUpperCase()) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 判断是否是数字
         * @param {String} value
         * @returns {Boolean} 是数字为true，不是为false
         */
        isNum: function (value) {
            if (value != null && value.length > 0 && isNaN(value) === false) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 判断是否是中文
         * @param {String} str
         * @returns {Boolean} 是中文为true，不是为false
         */
        isChine: function (str) {
            var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
            if (reg.test(str)) {
                return false;
            }
            return true;
        }
    };
})(window);

