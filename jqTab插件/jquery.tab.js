/**
 * Created by 张铭纹 on 2017/1/23.
 */
/**
 *
 * 网页样式默认
 *<div class="tab">
 *	<ul class="tab_nav">
 *		<li  class="current">1</li>
 *		<li>2</li>
 *		<li>3</li>
 *	</ul>
 *	<div class="tab_content">
 *		<div>111</div>
 *		<div>222</div>
 *		<div>333</div>
 *	</div>
 *</div>
 */
;(function($){
    $.fn.tab = function(options){

        var defaults = {
            //参数，属性
            currentCls:'current',//选中样式
            tabNav:'.tab_nav>li',//导航
            tabContent:'.tab_content>div',//内容
            eventType:'click'//绑定事件，例如：mouseover,click
        };


        var options = $.extend(defaults,options);

        this.each(function(){
            var _this = $(this);
            //功能代码
            _this.find(options.tabNav).on(options.eventType,function(){
                $(this).addClass(options.currentCls).siblings().removeClass(options.currentCls);
                var index = $(this).index();
                _this.find(options.tabContent).eq(index).show().siblings().hide();
            });
        });
        return this;
    };

// //调用
//     $(function(){
//         $('.tab').tab({
//             eventType:'mouseover'
//         });
//         $('.tab2').tab();
//     });

})(jQuery);
