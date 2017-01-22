(function(win) {
    /***********************************************************************
     *                           加载工具类                                *
     *                     注：调用方式，loadUtil.方法名                   *
     * ********************************************************************/
    if (!win.loadUtil) {
        win.loadUtil = {};
    }
    win.loadUtil = {
        /*
         * 方法说明：【动态加载js文件css文件】
         * 使用方法：loadUtil.loadjscssfile("http://libs.baidu.com/jquery/1.9.1/jquery.js","js")
         * @param {string} fileurl 文件路径，
         * @param {string} filetype 文件类型，支持传入类型，js、css
         */
        loadjscssfile: function(fileurl, filetype) {
            var fileref;
            if (filetype === "js") {
                fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", fileurl);
            } else if (filetype === "css") {
                fileref = document.createElement('link');
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", fileurl);
            }
            if (typeof fileref != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            } else {
                win.console.error("loadjscssfile method error!");
            }
        }
    };
})(window);