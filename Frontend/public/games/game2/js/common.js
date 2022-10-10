/* eslint-disable */
$(function () {

    window.Util = {

        format: function (date) {
            var d = new Date(date),
                r = '';
            var f = function (p) {
                return p < 10 ? "0" + p : p;
            }
            r += d.getFullYear() + '-';
            r += f(d.getMonth() + 1) + '-';
            r += f(d.getDate()) + ' ';
            r += f(d.getHours()) + ':';
            r += f(d.getMinutes());
            return r;
        },

        event: {
            tap: ('ontouchstart' in window) ? 'tap' : ((window.DocumentTouch && document instanceof DocumentTouch) ? 'tap' : 'click')
        }

    }

    // 向父vue页面发送信息
    function throwBottle(content){
        console.log("向父页面发送信息")
        window.parent.postMessage({
            cmd: 'throwBottle',
            params: {
                content: content
            }
        }, '*');
    }
    function getBottle(){
        console.log("向父页面发送信息")
        window.parent.postMessage({
            cmd: 'getBottle'
        }, '*');
    }
    function getMyBottle(){
        console.log("向父页面发送信息")
        window.parent.postMessage({
            cmd: 'getMyBottle'
        }, '*');
    }
    // function transforBottleResult(){
    //     // 接受父页面发来的信息
    // window.addEventListener("message", function(event){
    //     var data = event.data;
    //     console.log("接受父页面发来的信息")
    //     if(data.cmd==='transforBottleContent'){
    //         console.log(data.params)
    //         return data.params
    //     }
    // });
    // }



    var app = function () {
        this.name = 'bottles';  // 应用名称

        // 定位一些元素
        this.el = {
            'page': $("#page"),
            'btnThrow': $("#btnThrow"),
            'btnGet': $("#btnGet"),
            'btnBottle': $("#btnBottle"),
            'btnLogin': $("#btnLogin"),
            'loginPanel': $("#loginPanel"),
            'salvageAnim': $("#salvageAnim"),
            'result': $("#result"),
            'btnSubmitLogin': $("#btnSubmitLogin"),
            'writeBottle': $("#writeBottle"),
            'btnSubBottleMsg': $("#btnSubBottleMsg"),
            'bottleMsg': $("#bottleMsg"),
            'myBottle': $("#myBottle"),
            'bottleList': $("#bottleList")
        }
        this.tpls = {
            'bottle': $("#tpl_bottle").html(),
            'msg': $("#tpl_msg").html(),
        }

        var href = window.location.href;

        this.url = {
            'requestInfo': href + '/api.php',
            'getBottle': href + '/api.php',
            'sendMsg': href + '/api.php',
            'throwBottle': href + '/api.php'
        }

        this.config = {
            showResult: 2500 // 捕捞动作显示时长
        }

        this.user = {};

        this.init();
    }

    app.prototype = {

        init: function () {
            this.initEvent();
        },

        initEvent: function () {
            var me = this,
                tap = Util.event.tap;

            // 丢瓶子
            this.el.btnThrow.on(tap, function () {
                me.el.writeBottle.show();
            });

            // 丢瓶子btn
            this.el.btnSubBottleMsg.on(tap, function () {
                var msg = $.trim($("#bottleMsg").val());
                if (msg) {  
                    if (msg.length > 256) {  // 最多256个字符
                        layer.msg("漂流瓶内容超过了256个字符 >_<");
                    } else {
                        me.el.writeBottle.find('.notice').hide();
                        me.el.writeBottle.hide();
                        layer.msg('您的瓶子已经丢到海中了 ^_^');
                        throwBottle(msg);
                    }
                } else {
                    me.el.writeBottle.find('.notice').show();  // 瓶子不能为空
                }
            });

            // 关闭panel
            this.el.page.on(tap, '.btnClose', function() {
                $(this).parent('.panel').hide();
            });
            
            // 捞瓶子
            this.el.btnGet.on(tap, function() {
                getBottle();
                me.el.salvageAnim.addClass('animate').show();
                var resultClass = 's';
                var result = 'null1';
                window.addEventListener("message", function(event){
                    var data = event.data;
                    console.log("接受父页面发来的信息")
                    if(data.cmd==='transforBottleContent'){
                        console.log(data.params)
                        result=data.params
                        if(result !== 'null') {
                            me.newBottle = result.content ? result.content : result;
                            resultClass = 'b'
                        }
                        me.el.result.attr('class', resultClass).show();
                        me.el.salvageAnim.removeClass('animate').hide();
                    }
                });
                // if(result !== 'null') {
                //     me.newBottle = result;
                //     resultClass = 'b'
                // }
                // me.el.result.attr('class', resultClass).show();
                // me.el.salvageAnim.removeClass('animate').hide();

            });
            
            // 关闭result
            this.el.result.on(tap, '.btnClose', function() {
                me.el.result.hide();
            });

            // 打开看看
            this.el.result.on(tap, '#btnOpen', function() {
                me.el.result.hide();
                me.showBottle.call(me,me.newBottle);
            });

            // 继续捡
            this.el.result.on(tap, '#btnTry', function() {
                me.el.btnGet.trigger(tap);
                me.el.result.hide();
            });


            // 我的瓶子
            this.el.btnBottle.on(tap, function(){
                getMyBottle();
                me.el.bottleList.html("");

                me.el.bottleList.append(
                    "<tr>\n" +
                    "<th>编号</th>\n" +
                    "<th>内容</th>\n" +
                    "<th>时间</th>\n" +
                    "<th>操作</th>\n" +
                    "</tr> "
                )
                window.addEventListener("message", function(event){
                    var data = event.data;
                    console.log("接受父页面发来的信息")
                    if(data.cmd==='transforMyBottleData'){
                        console.log(data.params)
                        var count = 0;
                        console.log(bottles);
                        var bottles = data.params.data
                        for (var i in data.params.data){
                            count++;
                            console.log(bottles[i]);
                            // console.log(bottles[i].operate[0]);
                            // var operate = "<p><a href="+ bottles[i].operate[0] +">查看</a>&nbsp<a href="+ bottles[i].operate[1] +">扔回海里</a></p>";
                            me.el.bottleList.append(
                                "<tr>\n" +
                                "<td>"+count.toString()+"</td>\n" +
                                "<td>"+bottles[i][0].toString()+"</td>\n" +
                                "<td>"+bottles[i][1].toString()+"</td>\n" +
                                // "<td>"+operate+"</td>\n" +
                                "</tr> "
                            )
                        }
                        me.el.myBottle.show();
                    }
                })

                // var bottles = [{"b_content": "nihao",
                //                 "b_time": "2022-07-21",
                //                 "operate": ["http://baidu.com", "http://baidu.com"]},
                //                 {"b_content": "nihao",
                //                 "b_time": "2022-07-21",
                //                 "operate": ["http://baidu.com", "http://baidu.com"]}];
                // var count = 0;
                // console.log(bottles);
                // for (var i in bottles){
                //     count++;
                //     console.log(bottles[i]);
                //     console.log(bottles[i].operate[0]);
                //     var operate = "<p><a href="+ bottles[i].operate[0] +">查看</a>&nbsp<a href="+ bottles[i].operate[1] +">扔回海里</a></p>";
                //     me.el.bottleList.append(
                //         "<tr>\n" +
                //         "<td>"+count.toString()+"</td>\n" +
                //         "<td>"+bottles[i].b_content.toString()+"</td>\n" +
                //         "<td>"+bottles[i].b_time.toString()+"</td>\n" +
                //         "<td>"+operate+"</td>\n" +
                //         "</tr> "
                //     )
                // }



                // me.el.myBottle.show();
            });



        },

        showBottle:function(bottleData) {
            $("#bottle").remove();
            $(".panel").hide();
            var time =Util.format(bottleData.timestamp);
            layer.open({
            	  type: 1,
            	  skin: 'layui-layer-rim', //加上边框
            	  area: ['420px', '240px'], //宽高
            	  content: '<div class="msg"style="text-align: center;"><p>'+bottleData+'</p></div>'  // 这里修改内容
            	});
        },


    }

    var bottleAPP = new app();

});