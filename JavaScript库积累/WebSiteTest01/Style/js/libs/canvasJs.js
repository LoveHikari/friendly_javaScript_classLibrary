/*!
 * Created by sevennight on 2016-11-14.
 * canvasJs v1.0.0
 * http://code.ciaoca.com/javascript/exif-js/
 */
(function (win) {

    /***********************************************************************
     *                        加载工具类,需要引入exif.js                     *
     *                     注：调用方式，canvasUtil.方法名                   *
     * ********************************************************************/
    if (!win.canvasUtil) {
        win.canvasUtil = {};
    }
    win.canvasUtil = {

        /**
        * 旋转图片
        * 示例：
        * var canvas = document.getElementById('canvas');
        * var img = document.getElementById('img1');
        * window.canvasUtil.rotateImg(img, canvas,a,[img, canvas]);

        * function a(ab) {
        *     console.log(ab.toDataURL('image/jpeg'));
        * }
        * @param img {} img的document对象或Image对象
        * @param canvas {} canvas元素的document对象
        * @param callback {} 旋转完成后的回调函数
        * @param args {} 回调函数的实参列表，用数组表示，如[$img, canvas]
        */
        rotateImg: function (img, callback, args) {
            var canvas = document.createElement("canvas");
            var fun = "callback(canvas,";
            if (args != undefined) {
                for (var i = 0; i < args.length; i++) {
                    fun += "args[" + i + "],";
                }
            }
            fun = trimEnd(fun, ",") + ")";

            var image = new Image();
            image.src = img.src;
            image.onload = function () {
                var orientation = null;
                EXIF.getData(img, function () {
                    orientation = EXIF.getTag(img, 'Orientation');
                    if (orientation != "" && orientation != 1) {
                        console.log('旋转处理');
                        switch (orientation) {
                            case 6: //需要顺时针（向左）90度旋转 
                                console.log('需要顺时针（向左）90度旋转');
                                rotateImg(image, 'left', canvas);
                                break;
                            case 8: //需要逆时针（向右）90度旋转 
                                console.log('需要顺时针（向右）90度旋转');
                                rotateImg(image, 'right', canvas);
                                break;
                            case 3: //需要180度旋转 
                                console.log('需要180度旋转');
                                rotateImg(image, 'right', canvas); //转两次 
                                rotateImg(image, 'right', canvas);
                                break;
                        }
                    }
                    eval(fun);
                });
            }

            /**
             * (私有)对图片旋转处理
             * @param image {Image} Image对象
             * @param direction {String} left或right
             * @param canvas {} canvas元素的document对象，如document.getElementById('canvas');
             */
            function rotateImg(image, direction, canvas) {
                if (image == null) return;
                //img的宽度和高度不能在img元素隐藏后获取，否则会出错
                var width = img.width;
                var height = img.height;
                //最小与最大旋转方向，图片旋转4次后回到原方向
                var min_step = 0;
                var max_step = 3;
                var step = 2;
                if (step == null) {
                    step = min_step;
                }
                if (direction == 'right') {
                    step++;
                    //旋转到原位置，即超过最大值   
                    step > max_step && (step = min_step);
                } else {
                    step--;
                    step < min_step && (step = max_step);
                }
                //旋转角度以弧度值为参数   
                var degree = step * 90 * Math.PI / 180;
                var ctx = canvas.getContext('2d');
                switch (step) {
                    case 0:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(image, 0, 0, width, height);
                        break;
                    case 1:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(image, 0, 0, width, -height);
                        break;
                    case 2:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.rotate(degree);
                        ctx.drawImage(image, -width, -height);
                        break;
                    case 3:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(image, -width, 0);
                        break;
                }
                return canvas;

            }
            /**
             * (私有)去掉字符串结尾的指定字符,默去空格
             * @param {} str 
             * @param {} tag 
             * @returns {} 
             */
            function trimEnd(str, tag) {
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
                return str.replace(reg, '');
            }
        }

    };





})(window)